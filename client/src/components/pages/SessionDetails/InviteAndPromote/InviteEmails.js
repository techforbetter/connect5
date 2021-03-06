import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';

// COMMON COMPONENTS
import Header from '../../../common/Header';

// STYLE
import {
  EmailInfoWrapper,
  EmailInfo,
  InfoTitle,
  SessionInfoTitle,
  List,
} from './InviteAndPromote.style';

class InviteEmails extends Component {
  render() {
    const { sessionDetails, emailInfo } = this.props;
    const { startTime, endTime, shortId } = sessionDetails;
    const {
      date: emailDate,
      sessionDate,
      trainers,
      trainer,
      sessionType,
      address,
      recipients,
      extraInformation,
    } = emailInfo;

    let fullAddress = '';

    if (address) {
      const { postcode, addressLine1, addressLine2 } = address;
      if (postcode || addressLine1 || addressLine2) {
        fullAddress = [addressLine1, addressLine2, postcode]
          .filter(item => !!item)
          .join(', ');
      }
    }

    return (
      <EmailInfoWrapper>
        <Header type="view" label="Invite Emails" />
        <EmailInfo>
          <InfoTitle>
            Date:
            <span style={{ marginLeft: '.5rem', color: '#4f4f4f' }}>
              {moment(emailDate).format('DD/MM/YYYY')}
            </span>
          </InfoTitle>

          <InfoTitle>Message:</InfoTitle>
          <p>Dear course participants,</p>

          <p>
            {trainer} has invited you to register for an upcoming Connect 5
            training session.
          </p>
          <List>
            <li>
              <SessionInfoTitle> Session Date:</SessionInfoTitle>{' '}
              {moment(sessionDate).format('DD/MM/YYYY')}
            </li>
            <li>
              <SessionInfoTitle>Session Type:</SessionInfoTitle> {sessionType}
            </li>
            <li>
              <SessionInfoTitle> Location:</SessionInfoTitle>{' '}
              {fullAddress || 'TBC'}
            </li>
            <li>
              <SessionInfoTitle>time:</SessionInfoTitle>
              {startTime || '-'} to {endTime || '-'}{' '}
            </li>
            <li>
              <SessionInfoTitle>Trainer(s):</SessionInfoTitle> {trainers}
            </li>
          </List>
          <p>To confirm your attendance please click this link: </p>
          <p>
            {window.location.host}/confirm/{shortId}
          </p>
          {extraInformation && <p>{extraInformation}</p>}

          <br />
          <p>Sincerely,</p>

          <p>your Connect 5 team.</p>

          <div>
            <InfoTitle>Sent to</InfoTitle>
            <List>
              {recipients &&
                recipients.map(email => <li key={email}>{email}</li>)}
            </List>
          </div>
        </EmailInfo>
      </EmailInfoWrapper>
    );
  }
}

export default connect(
  null,
  { fetchSessionDetails }
)(InviteEmails);
