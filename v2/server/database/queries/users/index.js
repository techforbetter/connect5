const moment = require('moment');

const User = require('./../../models/User');
const Session = require('./../../models/Session');

module.exports.getUserByEmail = email => User.findOne({ email });
module.exports.getUserById = id => User.findById(id);
module.exports.getAllSessionsQuery = () => Session.find({});
module.exports.update = (id, data) => User.findByIdAndUpdate(id, data);
module.exports.getRegistrationDate = async id => {
  const user = await User.findById(id);
  return moment(user.createdAt).format('Do MMM YYYY');
};
