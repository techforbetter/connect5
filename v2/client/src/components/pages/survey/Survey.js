import React from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import Header from '../../common/Header';

import Questions from './Questions';

import {
  SurveyQs,
  SurveyHeader,
  SessionDetails,
  Form,
  Disclaimer
} from './Survey.style';

// formState will be the object where we store survey responses
// as the participant answers the questions
export default class Survey extends React.Component {
  state = {
    formState: {},
    surveyDetails: null,
    loading: true,
    sessionId: null,
    PIN: null,
    errors: {}
  };

  componentWillMount() {
    // grab the unique url at the end which gives us survey type and session id
    // syntax of url: surveyType&sessionId
    const { location } = this.props;
    const survey = `${location.pathname}`;
    const surveyParts = survey.split('/')[2];

    axios
      .get(`/api/survey/${surveyParts}`)
      .then(res => {
        const { sessionId, surveyType } = res.data;

        this.setState({
          surveyDetails: res.data,
          loading: false,
          sessionId,
          surveyType
        });
      })
      .then(() => {
        swal.fire({
          text:
            'Many thanks for agreeing to fill in this form. Your feedback will be kept anonymous and will only take you a couple of minutes to complete. Your feedback helps us evaluate and improve the program.'
        });
      })
      .catch(err => console.error(err.stack));
  }

  // function that will check if the div for the answer has been selected and if so add that answer to the formstate
  selectCheckedItem = (value, questionId) => {
    const { formState } = this.state;
    formState[questionId] = value;
    this.setState({ formState });
  };

  // // check for any changes to the survey inputs and add them to the formstate
  handleChange = e => {
    const question = e.target.name;
    const { formState } = this.state;
    // if any other type we assign the value to answer and put it in the state
    const answer = e.target.value;
    formState[question] = answer;
    this.setState(() => ({
      formState
    }));
  };

  // handles case when user selects 'other'
  handleOther = e => {
    const question = e.target.name;
    const { formState } = this.state;
    const answer = `Other: ${e.target.value}`;
    formState[question] = answer;
    this.setState(() => ({
      formState
    }));
  };

  // handles user input for PIN field
  handlePIN = e => this.setState({ PIN: e.target.value });
  // // when participant submits form
  // // this puts the required info into an object and sends to server
  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.props;
    const { formState, sessionId, surveyType, PIN } = this.state;

    const formSubmission = { PIN, sessionId, surveyType, formState };
    // check if PIN was entered before API call
    PIN
      ? axios
          .post(`/api/survey/submit/`, formSubmission)
          .then(() =>
            swal
              .fire('Done!', 'Thanks for submitting your feedback!', 'success')
              .then(() => history.push('/'))
          )
          .catch(err => {
            this.setState({
              errors: err.response.data
            });
            swal.fire('Please answer all required questions');
          })
      : swal.fire('Please enter your PIN');
  };

  // function to create a list of names from an array...
  renderTrainerNames = array =>
    array.map((e, i) =>
      array.length > 1 && array.length - 1 === i ? `and ${e}` : `${e} `
    );

  render() {
    const { loading, surveyDetails, formState, errors } = this.state;

    if (loading) {
      return <h3>Loading...</h3>;
    }

    const {
      sessionDate,
      trainerNames,
      questionsForSurvey,
      surveyType
    } = surveyDetails;

    return (
      <SurveyQs>
        <Header type="home" />
        <SurveyHeader />

        <SessionDetails>
          <h3>Session Details:</h3>
          <p>
            <span>Session Date: </span>
            {sessionDate}
          </p>
          <p>
            <span>Trainers: </span>
            {this.renderTrainerNames(trainerNames)}
          </p>
          <p>
            <span>Session Type: </span>
            {surveyType}
          </p>
        </SessionDetails>
        <main>
          <Disclaimer>
            <h3>Privacy notice</h3>
            <p>
              Connect 5 will use your information to evaluate the outcomes of
              our mental health promotion project at national and regional
              level. The quantitative results of this survey will be presented
              in an aggregated manner and all comments will be anonymous.
            </p>
            <p>
              Our legal basis for processing your information is to fulfill our
              legitimate interests as a developer of public health projects and
              manage the programs we offer. Managing development projects
              includes administering records, providing and organising
              activities; arranging training; events; webinars; conferences;
              special interest groups; awards; CPD; education; research;
              monitoring for equal opportunity purposes; advising you of our
              services; maintaining our own accounts and records.
            </p>
            <p>
              We will retain your personal information for the duration of your
              association with RSPH. When your association with us expires we
              will continue to retain some of your information in order to be
              able to prove your association if needed. We will delete the
              information which is no longer required for six years after your
              association expires. We will send you relevant information about
              the services we provide to our members.
            </p>
            <p>
              We may share some of your personal information with our
              commissioners such as Health Education England or the organisation
              that has commissioned the Connect 5 training you received. We will
              not share your personal information with any other organisation
              without your prior consent, unless we are required to do so by
              law.
            </p>
          </Disclaimer>
          <Form onSubmit={this.handleSubmit}>
            <Questions
              questions={questionsForSurvey}
              onChange={this.handleChange}
              handleOther={this.handleOther}
              handlePIN={this.handlePIN}
              answers={formState}
              selectCheckedItem={this.selectCheckedItem}
              errors={errors}
            />
            <button type="submit">Submit Feedback</button>
          </Form>
        </main>
      </SurveyQs>
    );
  }
}
