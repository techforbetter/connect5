const moment = require('moment');

const mailer = require('./index');
const { getSurveyLink } = require('./../index');

const sendSurveyLink = ({
  recipients,
  sessionDate,
  sessionType,
  trainers,
  address,
  startTime,
  endTime,
  shortId,
  preSurveyLink,
  postSurveyLink,
  extraInformation,
  surveyType,
}) => {
  let extraParagraph = '';
  let fullAddress = '';
  if (address) {
    const { postcode, addressLine1, addressLine2 } = address;
    if (postcode || addressLine1 || addressLine2) {
      fullAddress = [addressLine1, addressLine2, postcode]
        .filter(item => !!item)
        .join(', ');
    }
  }

  if (preSurveyLink) {
    extraParagraph = `
    <div>
      <p>
        <b>Before starting the training session please follow this link and fill out the <a href="${preSurveyLink}">pre-survey</a>.</b>
      </p>
    </div>
    `;
  }

  if (surveyType && surveyType.includes('follow-up')) {
    extraParagraph = `
    <div>
      <p>
        To track your own progress and to ensure that our trainings are
        effective we rely on course participants to fill out surveys after
        each session. All the data is anonymised.
      </p>
       <p>
         To complete the session please click the following link to fill
         out the ${surveyType.includes('3') ? '3' : '6'} month follow up
         survey.
       </p>
       <p>
         <a href="${getSurveyLink(surveyType, shortId)}">Follow up survey</a>
       </p>
    </div>
    `;
  }

  const firstParagraph =
    surveyType && surveyType.includes('follow-up')
      ? `
      <p>
       We're looking forward to receiving your ${
         surveyType.includes('3') ? '3' : '6'
       }
       month follow up feedback for the following Connect 5 training session:
      </p>
      `
      : `
      <p>
        To track your own progress and to ensure that our
        trainings are effective we rely on course
        participants to fill out surveys after each session.
        All the data is anonymised. After answering surveys
        you can immediately see your own progress and access
        certificates via the app.
      </p>
      <p>
        Please make sure you submit surveys for the following Connect 5 training session:
      </p>
      `;

  const html = `
  <div style="text-align: left;">
    <div style="width: 100%; height: 60px; background-color: #2C3192;">
      <img src="cid:connect5-logo" style="height: 60px; display: block; margin: 0 auto"/>
    </div>
    <p>Dear course participants,</p>

      ${firstParagraph}

    <ul style={{listStyle: 'none'}}>
      <li> Session Date: ${(sessionDate &&
        moment(sessionDate).format('DD MMM YYYY')) ||
        'N/A'}</li>
      <li> Session Type: ${sessionType || 'N/A'}</li>
      <li> Location:  ${fullAddress || 'TBC'}</li>
      <li> Time: ${startTime || '-'} to ${endTime || '-'}</li>
      <li> Trainers: ${trainers || 'N/A'}</li>
    </ul>


    ${extraParagraph}
    </br>

    ${
      surveyType && surveyType.includes('follow-up')
        ? ''
        : `
        <div>
          <p>
            <b>After the session please click this link and fill out the <a href="${postSurveyLink}">post-survey</a>.</b>
          </p>
        </div>
        `
    }

    ${extraInformation ? `<pre>${extraInformation}</pre>` : ''}

    </br>
    <p>Sincerely,</p>

    <p>your Connect 5 team.</p>
  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = 'Session Survey Reminder';
  const from = 'Connect 5';

  const attachments = [
    {
      filename: 'logo.png',
      path: `${__dirname}/../../assets/connect-5-white.png`,
      cid: 'connect5-logo',
    },
  ];

  return mailer({
    from,
    bcc: recipients,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};

module.exports = sendSurveyLink;
