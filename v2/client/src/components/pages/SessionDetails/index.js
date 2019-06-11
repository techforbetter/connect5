import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSessionDetails } from '../../../actions/groupSessionsAction';
import SessionTopDetails from './SessionTopDetails';
import SessionActions from './SessionActions';
import SessionSurveys from './SessionSurveys';
import Spin from '../../common/Spin';
import Header from '../../common/Header';
import { SessionDetailsWrapper } from './SessionDetails.Style';

class SessionDetails extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    // call action and pass it the id of session to fetch it's details
    this.props.fetchSessionDetails(id);
  }

  render() {
    const { sessionDetails } = this.props;
    if (!sessionDetails) {
      return Spin;
    }
    return (
      <SessionDetailsWrapper>
        <Header type="section" label="Session-details" />
        <SessionTopDetails sessionDetails={sessionDetails} />
        <SessionActions sessionDetails={sessionDetails} />
        <SessionSurveys sessionDetails={sessionDetails} />
      </SessionDetailsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.sessions.sessionDetails[0],
  };
};
export default connect(
  mapStateToProps,
  { fetchSessionDetails }
)(SessionDetails);