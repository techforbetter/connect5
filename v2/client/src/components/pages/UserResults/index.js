import React, { Component } from 'react';
import { connect } from 'react-redux';

//  ANTD COMPONENTS
import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

//  COMMON COMPOENTS
import Reach from '../../common/Reach';
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';
import SessionList from '../../common/List/SessionList';

// ACTIONS
import { fetchUserResults } from '../../../actions/users';
import {
  fetchTrainerSessions,
  fetchLocalLeadSessions,
  fetchALLSessions,
} from '../../../actions/groupSessionsAction';

// STYLING
import {
  TrainerResultsWrapper,
  ButtonWrapper,
  ContentWrapper,
  ToggleWrapper,
} from './UserResults.style';

const { Panel } = Collapse;

const panels = {
  reach: { text: 'Reach', render: props => <Reach data={props} /> },
  behavior: {
    text: 'Behavioural',
    render: () => null,
  },
  feedback: { text: 'Trainer feedback', render: () => null },
};

class UserResults extends Component {
  state = {
    selectedUserId: null,
    toggle: 'left',
  };

  async componentDidMount() {
    // show results based on the logged in user id and role
    const {
      match: { params },
      role,
      userId,
      history,
    } = this.props;
    const { id } = params;

    // if trainer has been selected from trainer list and the logged in user is localLead then use the trainer's id and view them as a trainer
    // else if selected from list use that trainer/local lead's role
    // i.e. this would be for an admin viewing
    // otherwise use logged in user's id and role
    const { state } = history.location;
    const { fetchUserResults } = this.props;
    if (state && state.trainer && role === 'localLead') {
      await fetchUserResults(state.trainer._id, 'trainer');
      await this.fetchSessionsData('trainer', state.trainer._id);
    } else if (state && state.trainer) {
      await fetchUserResults(state.trainer._id, state.trainer.role);
      await this.fetchSessionsData(state.trainer.role, state.trainer._id);
    } else {
      await fetchUserResults(userId, role);
    }

    // check if localLead is in trainer or lead view and assign the role accordingly

    // eslint-disable-next-line react/destructuring-assignment
  }

  fetchSessionsData = (role, id) => {
    // const {
    //   fetchTrainerSessions,
    //   fetchLocalLeadSessions,
    //   fetchALLSessions,
    // } = this.props;
    if (role === 'trainer') {
      this.props.fetchTrainerSessions(id);
    } else if (role === 'localLead') {
      this.props.fetchLocalLeadSessions(id);
    } else this.props.fetchALLSessions();
  };

  clickToggle = () => {
    const { toggle } = this.state;
    if (toggle === 'left') this.setState({ toggle: 'right' });
    else this.setState({ toggle: 'left' });
  };

  render() {
    const { results, role, history, groupView, sessions } = this.props;
    const { state } = history.location;
    const { toggle } = this.state;
    console.log(this.props);

    // if a user has been passed on then store as the user
    const user = state && state.trainer;

    const topLevelView = !groupView && ['admin', 'localLead'].includes(role);
    return (
      <TrainerResultsWrapper nudge={topLevelView}>
        {topLevelView && (
          <Header
            label={user ? `Viewing ${user.name}` : 'Individual View'}
            type="view"
          />
        )}
        <Header label="results" type="section" nudge={topLevelView} />
        {user && (
          <ToggleWrapper>
            <Toggle
              leftText="results"
              rightText="sessions"
              selected={toggle}
              onClick={this.clickToggle}
            />
          </ToggleWrapper>
        )}
        {toggle === 'left' && (
          <ContentWrapper>
            <Collapse
              accordion
              expandIconPosition="right"
              expandIcon={({ isActive }) => (
                <Icon type="down" rotate={isActive ? 90 : 0} />
              )}
            >
              {Object.keys(panels).map(panel => (
                <Panel header={panels[panel].text} key={panel}>
                  {panels[panel].render(results)}
                </Panel>
              ))}
            </Collapse>
          </ContentWrapper>
        )}
        {toggle === 'right' && (
          <ContentWrapper>
            <SessionList dataList={sessions} />
          </ContentWrapper>
        )}
        <ButtonWrapper>
          <Button icon="download" size="large">
            Export to CSV
          </Button>
        </ButtonWrapper>
      </TrainerResultsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  results: state.results,
  userId: state.auth.id,
  sessions: state.sessions.sessions,
  sessionsNum: state.sessions.sessionsCount,
});

export default connect(
  mapStateToProps,
  {
    fetchUserResults,
    fetchTrainerSessions,
    fetchLocalLeadSessions,
    fetchALLSessions,
  }
)(UserResults);
