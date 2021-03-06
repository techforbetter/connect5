const mongoose = require('mongoose');
const Question = require('./../../models/Question');
const { questionConstants } = require('./../../DBConstants');

module.exports = async (filters, isTrainTrainersFeedback) => {
  const {
    // comes from filters
    gender,
    age,
    ethnic,
    region,
    workforce,
    trainer,
    localLead: manager,
    sessionType,
    surveyType,
    // for specific session
    sessionId,
    // for specific participant
    PIN,
  } = filters;

  const toLowerCaseArray = array => array.map(item => item.toLowerCase());

  const ageMatch = age
    ? { $in: [{ $toLower: '$age' }, toLowerCaseArray(age)] }
    : true;

  const genderMatch = gender
    ? { $in: [{ $toLower: '$gender' }, toLowerCaseArray(gender)] }
    : true;

  const ethnicMatch = ethnic
    ? { $in: [{ $toLower: '$ethnic' }, toLowerCaseArray(ethnic)] }
    : true;

  const regionMatch = region
    ? { $in: [{ $toLower: '$region' }, toLowerCaseArray(region)] }
    : true;

  const workforceMatch = workforce
    ? { $in: [{ $toLower: '$workforce' }, toLowerCaseArray(workforce)] }
    : true;

  let questionTypeMatch = {
    'group.text': questionConstants.groups.ABOUT_YOUR_TRAINER.text,
  };

  if (isTrainTrainersFeedback) {
    questionTypeMatch = {
      $and: [
        {
          $or: [
            {
              'group.text':
                questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH.text,
            },
            {
              'group.text':
                questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING.text,
            },
          ],
        },
      ],
    };
  }

  const sessionTypeMatch = sessionType
    ? { $in: ['$sessionType', sessionType] }
    : true;

  const surveyTypeMatch = surveyType
    ? { $in: ['$surveyType', surveyType] }
    : true;

  const sessionIdMatch = sessionId
    ? { $eq: ['$sessionId', mongoose.Types.ObjectId(sessionId)] }
    : true;

  const PINMatch = PIN ? { $eq: ['$PIN', PIN.toLowerCase()] } : true;

  const filteredResultsMatch = {
    $expr: {
      $and: [
        ageMatch,
        genderMatch,
        ethnicMatch,
        regionMatch,
        workforceMatch,
        sessionTypeMatch,
        sessionIdMatch,
        surveyTypeMatch,
        PINMatch,
      ],
    },
  };

  const allResultsMatch = {
    $expr: {
      $and: [ageMatch, genderMatch, ethnicMatch, regionMatch, workforceMatch],
    },
  };

  if (trainer) {
    filteredResultsMatch.trainers = {
      $in: trainer.map(_trainerId => mongoose.Types.ObjectId(_trainerId)),
    };
  }

  if (manager) {
    filteredResultsMatch.managers = {
      $in: manager.map(_managerId => mongoose.Types.ObjectId(_managerId)),
    };
  }

  const results = await Question.aggregate([
    {
      // join questions with answers
      $lookup: {
        from: 'answers',
        localField: '_id',
        foreignField: 'question',
        as: 'answer',
      },
    },
    // break down the answers
    {
      $unwind: {
        path: '$answer',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      // join reponses with answers
      $lookup: {
        from: 'responses',
        localField: 'answer.response',
        foreignField: '_id',
        as: 'response',
      },
    },
    {
      // flatten the reponses array
      $addFields: {
        response: {
          $arrayElemAt: ['$response', 0],
        },
      },
    },
    {
      // join reponses with sessions
      $lookup: {
        from: 'sessions',
        localField: 'response.session',
        foreignField: '_id',
        as: 'session',
      },
    },
    {
      // join reponses with participant
      $lookup: {
        from: 'participants',
        localField: 'response.participant',
        foreignField: '_id',
        as: 'participant',
      },
    },
    {
      $addFields: {
        answer: '$answer.answer',
        participant: {
          $arrayElemAt: ['$participant._id', 0],
        },
        PIN: {
          $arrayElemAt: ['$participant.PIN', 0],
        },
        age: {
          $arrayElemAt: ['$participant.age', 0],
        },
        gender: {
          $arrayElemAt: ['$participant.gender', 0],
        },
        ethnic: {
          $arrayElemAt: ['$participant.ethnic', 0],
        },
        region: {
          $arrayElemAt: ['$participant.region', 0],
        },
        workforce: {
          $arrayElemAt: ['$participant.workforce', 0],
        },
        managers: {
          $arrayElemAt: ['$session.canAccessResults', 0],
        },
        sessionType: {
          $arrayElemAt: ['$session.type', 0],
        },
        trainers: {
          $arrayElemAt: ['$session.trainers', 0],
        },
        sessionId: {
          $arrayElemAt: ['$session._id', 0],
        },
      },
    },
    {
      $facet: {
        filterdResults: [
          {
            // filter the responses, returns all responses if there are no filters
            $match: filteredResultsMatch,
          },
          {
            // re-form data shape
            $project: {
              answer: 1,
              PIN: 1,
              code: 1,
              feedbackText: 1,
              options: {
                $cond: {
                  if: { $gt: [{ $size: '$options' }, 0] },
                  then: '$options',
                  else: ['0', '1', '2', '3', '4', '5'],
                },
              },
              sessionType: 1,
              surveyType: 1,
              group: 1,
            },
          },
          {
            // get the feedback questions only
            $match: questionTypeMatch,
          },
          {
            // gruop answers with question feedback text and session type
            // then find the count for each answer
            // we need this step to get the count for each answer
            $group: {
              _id: {
                text: '$feedbackText',
                answer: '$answer',
                surveyType: '$surveyType',
              },
              options: { $first: '$options' },
              count: { $sum: 1 },
            },
          },
          {
            // make data shape shallow again
            $project: {
              text: '$_id.text',
              answer: '$_id.answer',
              // count: { $ifNull: ['$_id.answer', 0] }, // the count of answer on question in survey
              count: {
                $cond: ['$_id.answer', '$count', 0],
              },
              surveyType: '$_id.surveyType',
              options: 1,
            },
          },
          {
            // group questions with sessions
            $group: {
              _id: {
                text: '$text',
                surveyType: '$surveyType',
              },
              // append the categories and the count for each group
              categories: { $push: { category: '$answer', count: '$count' } },
              totalCount: { $sum: '$count' }, // total replies on each survey
              options: { $first: '$options' },
            },
          },
          {
            // make data shallow again
            $project: {
              _id: 0,
              text: '$_id.text',
              surveyType: '$_id.surveyType',
              categories: 1,
              totalCount: 1,
              options: 1,
            },
          },
        ],
        allResults: [
          {
            // filter all responses base on the participants filters
            $match: allResultsMatch,
          },
          {
            // re-form data shape
            $project: {
              answer: 1,
              PIN: 1,
              code: 1,
              feedbackText: 1,
              options: {
                $cond: {
                  if: { $gt: [{ $size: '$options' }, 0] },
                  then: '$options',
                  else: ['0', '1', '2', '3', '4', '5'],
                },
              },
              sessionType: 1,
              surveyType: 1,
              group: 1,
            },
          },
          {
            // get the feedback questions only
            $match: questionTypeMatch,
          },
          {
            // gruop answers with question feedback text and session type
            // then find the count for each answer
            // we need this step to get the count for each answer
            $group: {
              _id: {
                text: '$feedbackText',
                answer: '$answer',
                surveyType: '$surveyType',
              },
              options: { $first: '$options' },
              count: { $sum: 1 },
            },
          },
          {
            // make data shape shallow again
            $project: {
              text: '$_id.text',
              answer: '$_id.answer',
              surveyType: '$_id.surveyType',
              count: 1, // the count of answer on question in survey
              options: 1,
            },
          },
          {
            // group questions with sessions
            $group: {
              _id: {
                text: '$text',
                surveyType: '$surveyType',
              },
              // append the categories and the count for each group
              categories: { $push: { category: '$answer', count: '$count' } },
              totalCount: { $sum: '$count' }, // total replies on each survey
              options: { $first: '$options' },
            },
          },
          {
            // make data shallow again
            $project: {
              _id: 0,
              text: '$_id.text',
              surveyType: '$_id.surveyType',
              categories: 1,
              totalCount: 1,
              options: 1,
            },
          },
        ],
      },
    },
  ]);
  return results[0];
};
