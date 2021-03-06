// gets feedback of all participants of one trainer
// -> gets all responses for 1 trainer
// -> gets all answers and questions for those responses
// -> groups answers by question
// -> counts duplicate answers related to survey type

const mongoose = require('mongoose');
const Response = require('../../models/Response');
const User = require('../../models/User');

module.exports.feedback = async ({
  trainerId,
  sessionId,
  surveyType,
  role,
}) => {
  // role == admin => all sessions
  // role == trainer => trainer sessions  ... user id
  // role == local lead => group sessions
  // role == null  && sessionId && survey type => one session by id

  // eslint-disable-next-line consistent-return
  const match = async () => {
    // get all responses
    if (role === 'admin') {
      return {
        _id: { $exists: true },
      };
    }

    if (role === 'trainer') {
      return {
        trainers: mongoose.Types.ObjectId(trainerId),
      };
    }
    if (role === 'localLead') {
      // get the groups feedback
      const localLead = await User.findOne(
        { _id: trainerId },
        { trainersGroup: 1 }
      );
      const { trainersGroup } = localLead;
      return {
        trainers: { $in: trainersGroup },
      };
    }
    if (!role && sessionId && surveyType) {
      // feedback for individ. survey
      return {
        $and: [{ session: mongoose.Types.ObjectId(sessionId) }, { surveyType }],
      };
    }
    if (!role && sessionId) {
      // feedback for indiv. session
      return {
        session: mongoose.Types.ObjectId(sessionId),
      };
    }
  };

  const feedbackArray = await Response.aggregate([
    {
      $match: await match(),
    },

    // get all answers for responses
    {
      $lookup: {
        from: 'answers',
        localField: '_id',
        foreignField: 'response',
        as: 'answers',
      },
    },
    {
      $project: {
        _id: 0,
        answers: 1,
        surveyType: 1,
      },
    },
    { $unwind: '$answers' },
    // get all questions for response answers
    {
      $lookup: {
        from: 'questions',
        localField: 'answers.question',
        foreignField: '_id',
        as: 'questions',
      },
    },
    { $unwind: '$questions' },
    {
      $match: {
        $and: [
          {
            $or: [
              { 'questions.group.text': 'about your trainer' },
              { 'questions.group.text': 'about your usual way of teaching' },
            ],
          },
        ],
      },
    },
    {
      $project: {
        surveyType: 1,
        questionText: '$questions.text',
        answer: '$answers.answer',
      },
    },
  ]);

  // group array by question text
  // {questionTxt: [{surveyType, questionTxt, answer}, ...], ...}

  let groupedByQuestion = feedbackArray.reduce((acc, cur) => {
    acc[cur.questionText] = acc[cur.questionText] || [];
    acc[cur.questionText].push(cur);
    return acc;
  }, {});

  // create question-grouped-array without keys
  // [{surveyType, question, answer}...]
  groupedByQuestion = Object.entries(groupedByQuestion).map(e => e[1]);
  // group array by answer
  // [{answer1: [surveyType/question...]}, {answer2: [surveyType/question...]}..]
  const listAnswers = groupedByQuestion.map(answers => {
    // answers - array of answers related to 1 question
    return answers.reduce((acc, cur) => {
      acc[cur.answer] = acc[cur.answer] || [];
      acc[cur.answer].push(`${cur.surveyType}/${cur.questionText}`);
      return acc;
    }, {});
  });

  // count occurence of answers per survey type related to 1 question
  const countAnswers = listAnswers.map(answersGroup => {
    // answersGroup is a group of answersGroup related to same question
    // get value
    // answersGroup: key(answer) : value(surveyType/questionText)
    const value = answersGroup[Object.keys(answersGroup)[0]];
    // get questionText out of value
    const questionText = value.map(stringVal => stringVal.split('/')[1]);
    // get all answers
    const answersArr = [Object.entries(answersGroup)][0].map(answer => answer);

    // count each answer related to survey type

    const counter = answersArr.map(answer => {
      const surveyAnswerCounter = answer[1].reduce((acc, cur) => {
        const surveyTypeArray = cur.split('/')[0];

        acc[surveyTypeArray] = (acc[surveyTypeArray] || 0) + 1;

        return acc;
      }, {});

      // create Obj { answerText: { surveyType: answerCount}}
      const counterOutput = {
        answerText: answer[0],
        surveyTypes: Object.entries(surveyAnswerCounter),
      };

      return counterOutput;
    });

    // create final output
    const finalObj = { questionText: questionText[0], counter };
    return finalObj;
  });
  return countAnswers;
};
