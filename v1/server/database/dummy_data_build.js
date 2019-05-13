// load models
const Trainer = require("./models/Trainer");
const Session = require("./models/Session");
const Response = require("./models/Response");
const Answer = require("./models/Answer");
const Question = require("./models/Question");

// load queries
const registerTrainer = require("./queries/register-trainer");

// buildSurvey
const buildSurvey = require("./surveyBuild");

const dbConnection = require("./db_connection");

dbConnection();

const buildDb = async () => {
  // clear collections

  await Trainer.deleteMany({});
  await Session.deleteMany({});
  await Response.deleteMany({});
  await Answer.deleteMany({});
  await Question.deleteMany({});

  console.log("collections deleted");

  // insert questions

  await buildSurvey();

  // insert trainer

  const trainer = new Trainer({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "123456",
  });
  const email = trainer.email;
  const errors = {};

  await registerTrainer(email, errors, trainer)
    .then(trainer => trainer.save())
    .catch(err => console.log(err));
  // await trainer.save();
  console.log("trainer added");

  // insert session for that trainer

  await Session.insertMany([
    {
      trainer: trainer._id,
      type: 1,
      date: "2018-04-17",
      invitees: 15,
      attendees: 8,
      surveyURL1: "0",
      surveyURL2: "1",
    },
    {
      trainer: trainer._id,
      type: 2,
      date: "2018-08-22",
      invitees: 6,
      attendees: 20,
      surveyURL1: "2",
    },
  ]);

  console.log("sessions added");

  // insert response for the first session

  const singleSession = await Session.findOne({
    date: new Date("2018-04-17"),
  });

  await Response.insertMany([
    {
      session: singleSession._id,
      trainer: singleSession.trainer,
      participantId: "123",
      surveyType: 0,
    },
  ]);

  await Response.insertMany([
    {
      session: singleSession._id,
      trainer: singleSession.trainer,
      participantId: "123",
      surveyType: 1,
    },
  ]);

  console.log("responses added");

  // insert answers for that response

  const singleResponse = await Response.findOne({ surveyType: 0 });
  const secondResponse = await Response.findOne({ surveyType: 1 });
  const presurvey = await Question.find({ surveyType: 0 });
  const survey1 = await Question.find({ surveyType: 1 });

  // insert presurvey responses

  await Answer.insertMany([
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[0]._id,
      answer: "123",
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[1]._id,
      answer: "North East",
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[2]._id,
      answer: "E2 5TY",
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[3]._id,
      answer: "Head of Testing",
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[4]._id,
      answer: "Emergency services (including fire service, police, ambulance)",
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[5]._id,
      answer: 2,
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[6]._id,
      answer: 3,
    },
    {
      response: singleResponse._id,
      session: singleResponse.session,
      question: presurvey[7]._id,
      answer: 1,
    },
  ]);

  // insert survey 1 responses

  await Answer.insertMany([
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[0]._id,
      answer: "123",
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[1]._id,
      answer: "North East",
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[2]._id,
      answer: "E2 5TY",
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[3]._id,
      answer: "Head of Testing",
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[4]._id,
      answer: "Emergency services (including fire service, police, ambulance)",
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[5]._id,
      answer: 3,
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[6]._id,
      answer: 3,
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[7]._id,
      answer: 3,
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[8]._id,
      answer: [
        "Group discussion",
        "New learning around general mental health issues",
        "New learning around mental health approaches (e.g. 5 ways to wellbeing, 5 areas model)",
        "New skills to conduct meaningful mental health related conversations",
      ],
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[9]._id,
      answer: {
        "How to start a conversation with people about their mental health & wellbeing": "Small improvement (1)",
        "Your awareness of the qualities and attitudes needed for addressing mental health & wellbeing": "Well improved (4)",
        "Your confidence to talk to people about their mental health & wellbeing": "Improved (3)",
        "Your understanding of emotional health & wellbeing through the '5 areas' model": "Moderate improvement (2)",
        "Your understanding of local mental health & wellbeing services and how to signpost people to them": "Well improved (4)",
        "Your understanding of the importance of self- help material and its uses": "Well improved (4)",}
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[10]._id,
      answer: {
        "Overall view of training": "Good",
        "Pace of training": "Good",
        "Trainer facilitation skills": "Average",
        "Trainer knowledge about the subject": "Fair",
        "Training content": "Excellent",
        "Venue/Location": "Average",
      },
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[11]._id,
      answer: "Yes",
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[12]._id,
      answer:
        "Random text here answering the question about how my work will change due to coming to this first session.",
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[13]._id,
      answer:
        "Random text here answering the question about suggestions for how they can improve the course.",
    },
    {
      response: secondResponse._id,
      session: secondResponse.session,
      question: survey1[14]._id,
      answer:
        "Random text here answering the question about anything else I'd like to tell them about the session 1 training.",
    },
  ]);

  console.log("survey answers added");
};

buildDb().catch(err => console.error(err.stack));

module.exports = buildDb;
