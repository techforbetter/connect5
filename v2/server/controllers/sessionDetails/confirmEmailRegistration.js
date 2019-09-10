const boom = require('boom');
const {
  updateAttendeesList,
} = require('./../../database/queries/sessionDetails/session');

module.exports = async (req, res, next) => {
  const { sessionId } = req.params;
  const { email, status } = req.body;

  const data = {
    sessionId,
    participantsEmails: [{ email, status: 'confirmed' }],
    status,
    isPartialList: true,
  };

  updateAttendeesList(data)
    .then(result => {
      return res.json({ success: true, confirmedEmail: email });
    })
    .catch(err => {
      next(boom.badImplementation());
    });
};
