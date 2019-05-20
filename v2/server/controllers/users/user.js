/* eslint-disable no-param-reassign */
const boom = require('boom');
const mongoose = require('mongoose');

const User = require('../../database/models/User');

const {
  getLocalLeadsSessions,
  getTeamLeadSuerveys,
} = require('../../database/queries/users/loaclLead');

const {
  getAdminSessions,
  getAdminSuerveys,
} = require('../../database/queries/users/admin');

const {
  getTrianerSessions,
  getTrainerSuerveys,
} = require('../../database/queries/users/trainerResults');

const getResponseRate = require('../../helpers/getResponseRate');

// get the logged in user results
const getUserResults = async (req, res, next) => {
  const { id } = req.params;

  const isValidId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidId) {
    return next(boom.badData('your data is bad and you should feel bad'));
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return next(boom.notFound('User not found'));
    }
    const { role } = user;

    let sessions;
    let surveys;

    switch (role) {
      case 'localLead':
        sessions = await getLocalLeadsSessions(id);
        surveys = await getTeamLeadSuerveys(id);
        break;
      case 'admin':
        sessions = await getAdminSessions(id);
        surveys = await getAdminSuerveys(id);
        break;

      default:
        sessions = await getTrianerSessions(id);
        surveys = await getTrainerSuerveys(id);
        break;
    }

    // calc the responseRate and add it to the surveys object
    const newSurveys = getResponseRate(sessions, surveys);

    const results = { sessions, newSurveys };
    return res.json(results);
  } catch (err) {
    return next(boom.badImplementation('Internal server error'));
  }
};

module.exports = { getUserResults };