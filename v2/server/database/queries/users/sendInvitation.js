const Session = require('./../../models/Session');

module.exports.StoreSentEmailDataQuery = ({
  _id,
  name,
  participantsEmails,
  sendingDate,
  date,
  type,
  trainerName,
  region,
}) => {
  const data = {
    date: sendingDate,
    trainer: name,
    sessionDate: date,
    sessionType: type,
    location: region,
    trainers: trainerName,
    recipients: participantsEmails,
  };

  const emails = participantsEmails.map(email => {
    return {
      email,
      status: 'sent',
    };
  });
  console.log(emails);

  const updateDoc = Session.update(
    { _id },
    { $push: { sentEmails: data, participantsEmails: emails } }
  );
  return updateDoc;
};
