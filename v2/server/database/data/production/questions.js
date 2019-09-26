const Question = require('./../../models/Question');

const { questionConstants } = require('./../../DBConstants');

// 1- Pre-course day 1
const demographics = surveyType => [
  // demographics
  {
    text: 'What is your age?',
    options: questionConstants.ages,
    questionType: questionConstants.questionTypes.radio,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
    participantField: 'age',
  },
  {
    text: 'Gender',
    helperText: ['To which gender do you most identify?'],
    options: ['Male', 'Female'],
    questionType: questionConstants.questionTypes.radio,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
    participantField: 'gender',
  },
  {
    text:
      'What is your ethnic group? (please choose the best option that describes your ethnic group or background)',
    helperText: [
      'Choose one option that best describes your ethnic group or background',
    ],
    options: questionConstants.ethnics,
    questionType: questionConstants.questionTypes.dropdown,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
    participantField: 'ethnic',
  },
  {
    text: 'Please select your region:',
    options: questionConstants.regions,
    questionType: questionConstants.questionTypes.dropdown,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
    participantField: 'region',
  },
  {
    text: 'Please enter the first date of your Connect 5 training session 1',
    questionType: questionConstants.questionTypes.date,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
    participantField: 'Session1Date',
  },
  {
    text: 'Please enter your job title',
    questionType: questionConstants.questionTypes.text,
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
    participantField: 'occupation',
  },
  {
    text: 'Please select your workforce',
    questionType: questionConstants.questionTypes.dropdown,
    options: [
      'Emergency services (including fire service, police, ambulance)',
      'Public health specialists and practitioners (e.g. public health consultants, health improvement managers, smoking cessation advisors)',
      'Welfare (e.g. employment advisers, benefits case workers, advisers working on a voluntary basis)',
      'Community health promotion workers/volunteers (e.g. health trainers, health champions, health and wellbeing advisors, breastfeeding volunteers)',
      'Health Professionals (e.g. GPs, nurses, Allied Health Professionals)',
      'Social care and housing professionals (housing officers, social workers, youth workers and other social care professions)',
      'Teaching and educational professionals (e.g. headteachers, teachers, teaching assistants, admin staff working in education settings)',
      'Childcare related professions (e.g. nursery staff, childminders)',
      'Sports and fitness occupations (e.g. sports coaches, fitness instructors and leisure centre employees)',
      'Other (please specify)',
    ],
    group: questionConstants.groups.DEMOGRAPHIC,
    surveyType,
    participantField: 'workforce',
  },
];

const behavioural1 = surveyType => [
  {
    code: 'People',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_1,
      name: questionConstants.subGroupID.BEHAVIOURAL_1,
      order: 1,
    },
    surveyType,
    text:
      'How many people have you seen in the last week who could have benefited from some improvement in their mental health and wellbeing?',
    questionType: questionConstants.questionTypes.positiveNumber,
  },
  {
    code: 'B1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_1,
      name: questionConstants.subGroupID.BEHAVIOURAL_1,
    },
    surveyType,
    text:
      'In how many of those people did you: Suggest ways they could take action on their own mental health or wellbeing?',
    questionType: questionConstants.questionTypes.positiveNumber,
  },
  {
    code: 'B2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_1,
      name: questionConstants.subGroupID.BEHAVIOURAL_1,
    },
    surveyType,
    text:
      'In how many of those people did you: have a conversation in which you developed a shared understanding of their mental health and wellbeing needs?',
    questionType: questionConstants.questionTypes.positiveNumber,
  },
  {
    code: 'B3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_1,
      name: questionConstants.subGroupID.BEHAVIOURAL_1,
    },
    surveyType,
    questionType: questionConstants.questionTypes.positiveNumber,
    text:
      'In how many of those people did you: use appropriate conversational methods to empower them to make a change that addresses their mental health and wellbeing needs?',
  },
];

const behavioural2 = surveyType => [
  {
    code: 'BE1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_2,
      name: questionConstants.subGroupID.BEHAVIOURAL_2,
      order: 1,
    },
    surveyType,
    text:
      'For 10 patients you saw who could benefit from some improvement in their mental health and wellbeing in how many would you expect to: Suggest ways they could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'BE2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_2,
      name: questionConstants.subGroupID.BEHAVIOURAL_2,
    },
    surveyType,
    text:
      'For 10 patients you saw who could benefit from some improvement in their mental health and wellbeing in how many would you expect to: Have a conversation in which you develop a shared understanding of their mental health and wellbeing needs?',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'BE3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_2,
      name: questionConstants.subGroupID.BEHAVIOURAL_2,
    },
    surveyType,
    text:
      'For 10 patients you saw who could benefit from some improvement in their mental health and wellbeing in how many would you expect to: use appropriate conversational methods to empower them to make a change that addresses their mental health and wellbeing?',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
];

const behavioural3 = surveyType => [
  {
    code: 'KnowB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      text: questionConstants.subGroupText.BEHAVIOURAL_3,
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
      name: questionConstants.subGroupID.BEHAVIOURAL_3,
      order: 1,
    },
    surveyType,
    text:
      'I have the knowledge to suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SkillB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
      name: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'I have the skills to suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'HabitB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
      name: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'I am in the habit of suggesting ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'OutEB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
      name: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'If I suggest ways that people could take action on their own mental health or wellbeing they are likely to have better mental health in the future',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'ConfB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
      name: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'I am confident that I can suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE1B1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
      name: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'People I work WITH think that I should suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE2B1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
      name: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'People I work FOR think that I should suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'TimeB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
      name: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'I have the time to spend suggesting ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'RoleB1',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_3,
      name: questionConstants.subGroupID.BEHAVIOURAL_3,
    },
    surveyType,
    text:
      'It is part of my role to suggest ways that people could take action on their own mental health or wellbeing',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
];

const behavioural4 = surveyType => [
  {
    code: 'KnowB2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      text: questionConstants.subGroupText.BEHAVIOURAL_4,
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
      name: questionConstants.subGroupID.BEHAVIOURAL_4,
      order: 2,
    },
    surveyType,
    text:
      'I have the knowledge to have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SkillB2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
      name: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'I have the skills to have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'HabitB2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'I am in the habit of having a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'OutEB2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
      name: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'If I have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs they are likely to have better mental health in the future',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'ConfB2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
      name: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'I am confident that I can have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE1B2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
      name: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'People I work WITH think that I should have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE2B2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
      name: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'People I work FOR think that I should have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'TimeB2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
      name: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'I have the time to spend having a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'RoleB2',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_4,
      name: questionConstants.subGroupID.BEHAVIOURAL_4,
    },
    surveyType,
    text:
      'It is part of my role to have a conversation with a person in which we develop a shared understanding of their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
];

const behavioural5 = surveyType => [
  {
    code: 'KnowB3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      text: questionConstants.subGroupText.BEHAVIOURAL_5,
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
      name: questionConstants.subGroupID.BEHAVIOURAL_5,
      order: 3,
    },
    surveyType,
    text:
      'I have the knowledge to use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SkillB3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
      name: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'I have the skills to use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'HabitB3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
      name: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'I am in the habit of using an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'OutEB3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
      name: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'If I use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs, they are likely to have better mental health in the future',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'ConfB3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
      name: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'I am confident that I can use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE1B3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
      name: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'People I work WITH think that I should use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'SocE2B3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
      name: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'People I work FOR think that I should use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'TimeB3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
      name: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'I have the time to spend to use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
  {
    code: 'RoleB3',
    group: questionConstants.groups.BEHAVIOURAL,
    subGroup: {
      subGroupID: questionConstants.subGroupID.BEHAVIOURAL_5,
      name: questionConstants.subGroupID.BEHAVIOURAL_5,
    },
    surveyType,
    text:
      'It is part of my role to use an appropriate conversational method to empower a person to make a change that addresses their mental health and wellbeing needs',
    questionType: questionConstants.questionTypes.fromZeroToTen,
  },
];

const yourTrainer1 = surveyType => [
  {
    code: 'Trainquest1',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      text: questionConstants.subGroupText.ABOUT_YOUR_TRAINER_1,
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_1,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_1,
      order: 1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Did your trainer ask questions in a way that included as many of the learners as possible?',
    feedbackText:
      'Your trainees said that you asked questions in a way that included as many of the learners as possible',
  },
  {
    code: 'Trainquest2',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_1,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Did your trainer ask questions about how you or other learners are learning (for example ‘how do you know that?’ Or ‘can you explain how you came to that answer?’)',
    feedbackText:
      'Your trainees said that you asked questions about how you or other learners are learning (for example ‘how do you know that?’ Or ‘can you explain how you came to that answer?’)',
  },
  {
    code: 'Trainquest3',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_1,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Did your trainer ask questions that are open ended, challenging, searching or probing?',
    feedbackText:
      'Your trainees said that you asked questions that are open ended, challenging, searching or probing',
  },
  {
    code: 'Trainquest4',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_1,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Did your trainer ask questions that required you or other learners to apply your knowledge?',
    feedbackText:
      'Your trainees said that you asked questions that required you or other learners to apply your knowledge',
  },
  {
    code: 'Trainquest5',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_1,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Did your trainer ask questions about how what you are currently learning relates to what you knew before?',
    feedbackText:
      'Your trainees said that you asked questions about how what you are currently learning relates to what you knew before',
  },
];

const yourTrainer2 = surveyType => [
  {
    code: 'TrainAtt1',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      text: questionConstants.subGroupText.ABOUT_YOUR_TRAINER_2,
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      order: 1,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Did your trainer listen to you and other learners?',
    feedbackText:
      'Your trainees said that you listen to them and other learners',
  },
  {
    code: 'TrainAtt2',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Did your trainer respond positively to being asked questions?',
    feedbackText:
      'Your trainees said that you respond positively to being asked questions',
  },
  {
    code: 'TrainAtt3',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Did your trainer celebrate learner contributions and successes?',
    feedbackText:
      'Your trainees said that you celebrate learner contributions and successes',
  },
  {
    code: 'TrainAtt4',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Did your trainer demonstrate an interest in the topic and in the activities of the learners?',
    feedbackText:
      'Your trainees said that you demonstrate an interest in the topic and in the activities of the learners',
  },
  {
    code: 'TrainAtt5',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Did your trainer use language to praise, support and show positive regard to you and other learners?',
    feedbackText:
      'Your trainees said that you use language to praise, support and show positive regard to them and other learners',
  },
  {
    code: 'TrainAtt6',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Did your trainer demonstrate their own lack of understanding either current or previous?',
    feedbackText:
      'Your trainees said that you demonstrate your own lack of understanding either current or previous',
  },
  {
    code: 'TrainAtt7',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Did your trainer use derogatory or humiliating language?',
    feedbackText:
      'Your trainees said that you use derogatory or humiliating language',
  },
  {
    code: 'TrainAtt8',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Did your trainer make eye contact with multiple learners?',
    feedbackText:
      'Your trainees said that you make eye contact with multiple learners',
  },
  {
    code: 'TrainAtt9',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Did your trainer speak with an enthusiastic tone?',
    feedbackText: 'Your trainees said that you speak with an enthusiastic tone',
  },
  {
    code: 'TrainAtt10',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Did your trainer use verbal and non-verbal communication that indicated they were listening to  you or other learners?',
    feedbackText:
      'Your trainees said that you use verbal and non-verbal communication that indicated you were listening to  them or other learners',
  },
  {
    code: 'TrainAtt11',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Did your trainer use words to encourage you or other learners?',
    feedbackText:
      'Your trainees said that you use words to encourage them or other learners',
  },
  {
    code: 'TrainAtt12',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Did your trainer use the names of the learners?',
    feedbackText: 'Your trainees said that you use the names of the learners',
  },
  {
    code: 'TrainAtt13',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'Did your trainer demonstrate their own curiosity and interest in the topic?',
    feedbackText:
      'Your trainees said that you demonstrate your own curiosity and interest in the topic',
  },
  {
    code: 'SessionOverall1',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Was the session what you expected?',
    feedbackText: 'Your trainees said that the session was what they expected',
  },
  {
    code: 'SessionOverall2',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      "Was the session at a good pace for you? did you feel you had enough time but that the time didn't drag?",
    feedbackText:
      "Your trainees said that the session was at a good pace for them (they felt they had enough time but that the time didn't drag)",
  },
  {
    code: 'SessionOverall3',
    group: questionConstants.groups.ABOUT_YOUR_TRAINER,
    subGroup: {
      subGroupID: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
      name: questionConstants.subGroupID.ABOUT_YOUR_TRAINER_2,
    },
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'Did you enjoy the session?',
    feedbackText: 'Your trainees said that the session was enjoyable',
  },
];

const yourTeachingWay = surveyType => [
  {
    code: 'TTHabitAtt1',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'When I teach, I am in the habit of listening to the learners',
  },
  {
    code: 'TTHabitAtt2',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of responding positively to being asked questions',
  },
  {
    code: 'TTHabitAtt3',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of celebrating learner contributions and successes',
  },
  {
    code: 'TTHabitAtt4',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of using language to praise, support and show positive regard to learners',
  },
  {
    code: 'TTHabitAtt5',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of deliberately demonstrating my own lack of understanding (either current or previous)',
  },
  {
    code: 'TTHabitAtt6',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of speaking with an enthusiastic tone',
  },
  {
    code: 'TTHabitAtt7',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of making eye contact with multiple learners',
  },
  {
    code: 'TTHabitAtt8',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach I am in the habit of using verbal and non-verbal communication to indicate that I am listening to the learners',
  },
  {
    code: 'TTHabitAtt9',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of using words to encourage the learners',
  },
  {
    code: 'TTHabitAtt10',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'When I teach, I am in the habit of using the names of the learners',
  },
  {
    code: 'TTHabitAtt11',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am in the habit of demonstrating my own curiosity and interest in the topic',
  },
  {
    code: 'TTCapability1',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am conscious of trying to develop what the learners know and / or know how to do (their capabilities)',
  },
  {
    code: 'TTOpportunity1',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I am conscious of trying to help the learners think about how they might put their learning into practice when they go back to work',
  },
  {
    code: 'TTMotivation1',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      "When I teach, I am conscious of trying to increase the learners' motivation for putting their learning into practice when they go back to work",
  },
  {
    code: 'TTOpportunity2',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I ask the learners about any barriers they might have when they try to put their learning into practice when they go back to work',
  },
  {
    code: 'TTOpportunity3',
    group: questionConstants.groups.ABOUT_YOUR_USUAL_WAY_OF_TEACHING,
    surveyType,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text:
      'When I teach, I ask the learners to think about how the people they work with might respond if they try to put their learning into practice when they go back to work',
  },
];

// post train trainer questions
const aboutHowYouExpectToTeach = surveyType => [
  {
    code: 'TTHabitAtt1',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text: 'When I teach next time i expect i will  listening to the learners',
  },
  {
    code: 'TTHabitAtt2',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time i expect i will respond positively to being asked question',
  },
  {
    code: 'TTHabitAtt3',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time i expect i will celebrate learner contributions and successes',
  },
  {
    code: 'TTHabitAtt4',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time  I am will  use language to praise, support and show positive regard to learners',
  },
  {
    code: 'TTHabitAtt5',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time i expect to demonstrate my own lack of understanding (either current or previous)',
  },
  {
    code: 'TTHabitAtt6',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time  I expect i will speak with an enthusiastic tone',
  },
  {
    code: 'TTHabitAtt7',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time I expect to  make eye contact with multiple learners',
  },
  {
    code: 'TTHabitAtt8',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time  I expect i will use  verbal and non-verbal communication to indicate that I am listening to the learners',
  },
  {
    code: 'TTHabitAtt9',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time i expect i will use words to encourage the learner',
  },
  {
    code: 'TTHabitAtt10',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time i expect i will use  the names of the learners',
  },
  {
    code: 'TTHabitAtt11',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach nect time i expect i will demonstrate my own curiosity and interest in the topic',
  },
  {
    code: 'TTCapability1',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time i expect i will be conscious of trying to develop what the learners know and / or know how to do (their capabilities)',
  },
  {
    code: 'TTOpportunity1',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time i expect i will be conscious of trying to help the learners think about how they might put their learning into practice when they go back to work',
  },
  {
    code: 'TTMotivation1',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      "When I teach next time  I expect i will be conscious of trying to increase the learners' motivation for putting their learning into practice when they go back to work",
  },
  {
    code: 'TTOpportunity2',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach next time i expect to ask the learners about any barriers they might have when they try to put their learning into practice when they go back to work',
  },
  {
    code: 'TTOpportunity3',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    surveyType,
    questionType: questionConstants.questionTypes.fromZeroToTen,
    text:
      'When I teach, I ask the learners to think about how the people they work with might respond if they try to put their learning into practice when they go back to work',
  },
  {
    code: 'TTSessionOverall1',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'did the course content meet your expectations',
  },
  {
    code: 'TTSessionOverall2',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'was the course delivered at the right pace for you',
  },
  {
    code: 'TTSessionOverall3',
    group: questionConstants.groups.ABOUT_HOW_YOU_EXPECT_TO_TEACH,
    options: ['not at all', 'a little', 'a lot', "I'm not sure"],
    questionType: questionConstants.questionTypes.radio,
    text: 'did you enjoy the connect 5 train the triainer course',
  },
];

module.exports = () => {
  const preCourseDay1Questions = [
    ...demographics('pre-day-1'),
    ...behavioural1('pre-day-1'),
    // ...behavioural2('pre-day-1'),
    ...behavioural3('pre-day-1'),
    ...behavioural4('pre-day-1'),
    ...behavioural5('pre-day-1'),
  ];

  const preSpecial2DaysQuestions = [
    ...demographics('pre-special'),
    ...behavioural1('pre-special'),
    // ...behavioural2('pre-special'),
    ...behavioural3('pre-special'),
    ...behavioural4('pre-special'),
    ...behavioural5('pre-special'),
  ];

  const postCourseDay1Questions = [
    ...behavioural2('post-day-1'),
    ...yourTrainer1('post-day-1'),
    ...yourTrainer2('post-day-1'),
  ];

  const postCourseDay2Questions = [
    ...behavioural2('post-day-2'),
    ...yourTrainer1('post-day-2'),
    ...yourTrainer2('post-day-2'),
  ];

  const postCourseDay3Questions = [
    ...behavioural2('post-day-3'),
    ...yourTrainer1('post-day-3'),
    ...yourTrainer2('post-day-3'),
  ];

  const postSpecial2DaysQuestions = [
    ...behavioural2('post-special'),
    ...yourTrainer1('post-special'),
    ...yourTrainer2('post-special'),
  ];

  // TTT-Session-1
  //  - pre -
  const preTrainTheTrainerS1Questions = [
    ...demographics('pre-train-trainers-s1'),
    ...yourTeachingWay('pre-train-trainers-s1'),
  ];
  // - post -
  const postTrainTheTrainerS1Questions = [
    ...aboutHowYouExpectToTeach('post-train-trainers-s1'),
  ];

  // TTT-Session-2
  // - post -
  const postTrainTheTrainerS2Questions = [
    ...aboutHowYouExpectToTeach('post-train-trainers-s2'),
  ];

  // event day -> TTT-1-Day-Event
  // - pre -
  const preTrainTheTrainerEventQuestions = [
    ...demographics('pre-train-trainers-event'),
    ...yourTeachingWay('pre-train-trainers-event'),
  ];

  // - post -
  const postTrainTheTrainerEventQuestions = [
    ...aboutHowYouExpectToTeach('post-train-trainers-event'),
  ];

  const followUp3MonthsQuestions = [
    ...behavioural1('follow-up-3-month'),
    ...behavioural2('follow-up-3-month'),
    ...behavioural3('follow-up-3-month'),
    ...behavioural4('follow-up-3-month'),
    ...behavioural5('follow-up-3-month'),
  ];

  const followUp6MonthsQuestions = [
    ...behavioural1('follow-up-6-month'),
    ...behavioural2('follow-up-6-month'),
    ...behavioural3('follow-up-6-month'),
    ...behavioural4('follow-up-6-month'),
    ...behavioural5('follow-up-6-month'),
  ];

  const followUpTrainTrainer3MonthsQuestions = [
    ...aboutHowYouExpectToTeach('follow-up-3-month-train-trainers'),
  ];

  const followUpTrainTrainer6MonthsQuestions = [
    ...aboutHowYouExpectToTeach('follow-up-6-month-train-trainers'),
  ];

  return Question.create([
    ...preCourseDay1Questions,
    ...postCourseDay1Questions,
    ...postCourseDay2Questions,
    ...postCourseDay3Questions,
    ...postSpecial2DaysQuestions,
    ...preTrainTheTrainerS1Questions,
    ...postTrainTheTrainerS1Questions,
    ...postTrainTheTrainerS2Questions,
    ...preTrainTheTrainerEventQuestions,
    ...postTrainTheTrainerEventQuestions,
    ...followUp3MonthsQuestions,
    ...followUp6MonthsQuestions,
    ...preSpecial2DaysQuestions,
    ...followUpTrainTrainer3MonthsQuestions,
    ...followUpTrainTrainer6MonthsQuestions,
  ]);
};
