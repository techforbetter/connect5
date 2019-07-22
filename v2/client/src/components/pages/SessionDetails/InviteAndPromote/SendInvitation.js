import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import history from '../../../../history';
import { SendEmailInvitation } from '../../../../actions/groupSessionsAction';

// COMMON COMPONENTS
import Spin from '../../../common/Spin';
import Header from '../../../common/Header';
import Button from '../../../common/Button';

// STYLE
import {
  InviteSectionWrapper,
  BackLink,
  BackContainer,
  Form,
  InputDiv,
} from './Invite&Promote.style';

const { Option } = Select;

class SendInvitation extends Component {
  state = {
    participantsEmails: ['marwaajomaa@gmail.com'],
    sendingDate: Date.now(),
  };

  onEmailChange = value => {
    this.setState({
      participantsEmails: value,
    });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { participantsEmails, sendingDate } = this.state;
    const {
      sessionDetails,
      SendEmailInvitation: SendEmailInvitationActionCreator,
    } = this.props;
    const { date, type, trainers, region, _id } = sessionDetails;
    console.log(_id, date, type, trainers, region);

    const trainerName = trainers
      .map(trainer => {
        return trainer.name;
      })
      .join(' & ');

    // send participantsEmails + date.now +session details form props + registration link
    const InviteData = {
      _id,
      participantsEmails,
      sendingDate,
      date,
      type,
      trainerName,
      region,
    };
    console.log(InviteData);
    SendEmailInvitationActionCreator(InviteData);
  };

  render() {
    const { participantsEmails } = this.state;
    const { onEmailChange, onFormSubmit } = this;
    const { onClose } = this.props;

    return (
      <InviteSectionWrapper>
        <Header type="view" label="Invite" />
        <BackContainer>
          <BackLink onClick={onClose}>{`< Back`}</BackLink>
        </BackContainer>
        <Form>
          <InputDiv>
            <Select
              mode="tags"
              size="large"
              placeholder="emails"
              onChange={onEmailChange}
              defaultValue="example@gmail.com"
              style={{ width: '100%', height: '100%' }}
            >
              {participantsEmails.map(email => (
                <Option key={email} value={email}>
                  {email}
                </Option>
              ))}
            </Select>
          </InputDiv>
          <InputDiv>
            <Button
              onClick={onFormSubmit}
              type="primary"
              label="Send invitation"
              height="40px"
              width="100%"
            />
          </InputDiv>
        </Form>
      </InviteSectionWrapper>
    );
  }
}

const mapStateToProps = state => ({
  sessionDetails: state.sessions.sessionDetails[0],
});

export default connect(
  mapStateToProps,
  { SendEmailInvitation }
)(SendInvitation);