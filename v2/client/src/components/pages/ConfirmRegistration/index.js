/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { message as AntdMessage, Modal, Alert } from 'antd';
import * as Yup from 'yup';

import { getSessionDetails } from '../../../actions/sessionAction';
import {
  confirmRegistration,
  sendSpecialRequirements,
} from '../../../actions/confirmRegistration';

import Header from '../../common/Header';
import CommonButton from '../../common/Button';

import { DASHBOARD_URL } from '../../../constants/navigationRoutes';
import {
  Wrapper,
  ContentWrapper,
  Title,
  WhiteDiv,
  Details,
  BoldSpan,
  Input,
  CapitalizedSpan,
} from './ConfirmRegistration.style';

const { TextArea } = Input;

const emailSchema = Yup.string()
  .email()
  .required();

class ConfirmRegistration extends Component {
  state = {
    email: '',
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const { shortId } = params;
    this.props.getSessionDetails(shortId);
  }

  componentDidUpdate() {
    const { isAuthenticated, role, history } = this.props;
    if (isAuthenticated && role !== 'participant') {
      AntdMessage.warning(`You logged in as ${role}`);
      history.push(DASHBOARD_URL);
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const { email, message } = this.state;
    const { sessionId, confimSuccess, confirmedEmail } = this.props;

    if (confimSuccess) {
      if (confirmedEmail && sessionId && message)
        this.props.sendSpecialRequirements({
          email: confirmedEmail,
          sessionId,
          message,
        });
    } else {
      try {
        const isEmailValid = emailSchema.validateSync(email);

        if (isEmailValid) {
          this.props.confirmRegistration({ email, sessionId });
        }
      } catch (err) {
        Modal.error({
          title: 'Invalid Email Format!',
          content: err.errors[0],
        });
      }
    }
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      trainers,
      address,
      date,
      confirmLoading,
      confimSuccess,
      requirementsLoading,
    } = this.props;
    const { email, message } = this.state;

    const trainersNames = trainers.map(trainer => trainer.name).join(' & ');
    return (
      <Wrapper>
        <ContentWrapper>
          <Header label="" type="view" />
          <Title>Connect 5 Invitation</Title>
          <form onSubmit={this.handleSubmit}>
            <WhiteDiv>
              {!confimSuccess ? (
                <div>
                  <Details>
                    <BoldSpan>Date of Session:</BoldSpan>{' '}
                    {date ? moment(date).format('DD-MM-YYYY') : 'N/A'}
                  </Details>
                  <Details>
                    <BoldSpan>Trainers:</BoldSpan>{' '}
                    <CapitalizedSpan>{trainersNames || 'N/A'}</CapitalizedSpan>
                  </Details>
                  <Details>
                    <BoldSpan>Location:</BoldSpan>{' '}
                    {(address && address.location) || 'N/A'}
                  </Details>
                  <Details>
                    <BoldSpan>Address Line 1:</BoldSpan>{' '}
                    {(address && address.addressLine1) || 'N/A'}
                  </Details>
                  <Details>
                    <BoldSpan>Address Line 2:</BoldSpan>{' '}
                    {(address && address.Addressline2) || 'N/A'}
                  </Details>
                  <Details center>
                    <BoldSpan>
                      Please enter your email below to confirm your attendance
                    </BoldSpan>
                  </Details>
                  <Input
                    placeholder="Enter Your Email"
                    size="large"
                    onChange={this.handleChange}
                    value={email}
                    type="email"
                    name="email"
                    required
                  />
                </div>
              ) : (
                <div>
                  <Details>
                    <Alert
                      message="Congratulations!"
                      description={
                        <>
                          You have successfully registered for the event on{' '}
                          <BoldSpan>
                            {date ? moment(date).format('DD-MM-YYYY') : 'N/A'}
                          </BoldSpan>
                          .
                        </>
                      }
                      type="success"
                      // showIcon
                    />
                  </Details>
                  <Details>
                    <BoldSpan>
                      Do you have any special requirements (e.g. dietary,
                      access) or anything else we need to know ahead of the
                      workshop?
                    </BoldSpan>
                  </Details>{' '}
                  <Details>
                    If so please let us know by entering them below.
                  </Details>{' '}
                  <TextArea
                    rows="4"
                    onChange={this.handleChange}
                    value={message}
                    name="message"
                    placeholder="Requirements / Message:"
                    required
                  />
                </div>
              )}
            </WhiteDiv>

            <CommonButton
              size="large"
              style={{ marginTop: '2rem' }}
              type="primary"
              loading={confimSuccess ? requirementsLoading : confirmLoading}
              label={confimSuccess ? 'Submit' : 'Register'}
            >
              Register
            </CommonButton>
          </form>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  session: _session,
  auth: _auth,
  loading: _loading,
  confirmRegistration: _confirmRegistration,
}) => {
  return {
    trainers: _session.trainers,
    sessionId: _session._id,
    address: _session.address,
    date: _session.date,
    isAuthenticated: _auth.isAuthenticated,
    role: _auth.role,
    confirmLoading: _loading.confirmRegistrationLoading,
    requirementsLoading: _loading.sendSpecialRequirements,
    confimSuccess: _confirmRegistration.confimSuccess,
    confirmedEmail: _confirmRegistration.confirmedEmail,
  };
};

export default connect(
  mapStateToProps,
  {
    getSessionDetails,
    confirmRegistration,
    sendSpecialRequirements,
  }
)(ConfirmRegistration);
