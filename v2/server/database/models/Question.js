const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const { surveyTypes } = require('./../DBConstants');

const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  code: String,
  // the general group
  // [ "ABOUT YOU", "ABOUT YOUR TRAINER", "ABOUT YOUR USUAL WAY OF TEACHING"]
  group: String,

  // sub groups
  // ["Did your trainer ask questions...", "Did your trainer...", ...]
  subGroup: {
    text: String,
    order: Number,
  },
  surveyType: {
    type: String,
    enum: surveyTypes,
  },

  questionType: {
    desc: {
      type: String,
    },
  },
  // question can contain multi helper text
  helperText: [String],
  options: [Schema.Types.Mixed],
});

const Questions = model('questions', questionSchema);
module.exports = Questions;
