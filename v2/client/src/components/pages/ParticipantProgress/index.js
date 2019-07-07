/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// COMMON COMPONENTS
import Header from '../../common/Header';
import SessionList from './SessionsList';

// ACTIONS
import { fetchParticipentSessions } from '../../../actions/groupSessionsAction';

// STYLING
import { ViewSessionsWrapper, Span } from '../ViewSessions/ViewSessions.Style';

class ParticipantProgress extends Component {
  componentDidMount() {
    const { pin } = this.props;
    this.props.fetchParticipentSessions(pin);
  }

  render() {
    const { sessions } = this.props;
    if (!sessions) {
      return <div>loading</div>;
    }
    return (
      <ViewSessionsWrapper>
        <Header label="My progress" type="section" />
        <Span>Completed Sessions</Span>
        <SessionList dataList={sessions} />
      </ViewSessionsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loaded: state.auth.loaded,
    pin: state.auth.pin,
    role: state.auth.role,
    sessions: state.sessions.sessions,
  };
};

export default connect(
  mapStateToProps,
  { fetchParticipentSessions }
)(ParticipantProgress);
