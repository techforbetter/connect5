import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
// PLEASE DO NOT PUT ANTD STYLING SHEET HERE AS OVERRIDES EXISTING STYLES
// import 'antd/dist/antd.css';
import styled from 'styled-components';

import { checkAuth } from '../actions/authAction';
import { updateViewLevel } from '../actions/viewLevelAction';

import { colors } from '../theme';

// PAGES
// import Login from './pages/auth/login';
import CreateSession from './pages/CreateSession';
import Login from './pages/Login/Login';
import ParticipantLogin from './pages/Login/LoginParticipant';
import UserDashboard from './pages/userDashboard';
import Dashboard from './pages/Dashboard';
import Home from './pages/LandingPage';
import SignUp from './pages/SignUp';
import UserResults from './pages/UserResults';
import AddTrainer from './pages/AddTrainer';
import Survey from './pages/survey/Survey';
import TrainerListPage from './pages/TrainerListPage';
import ViewSessions from './pages/ViewSessions';
import ParticipantBehavioral from './pages/ParticipantBehavioral';
import SessionDetails from './pages/SessionDetails';
import EditSession from './pages/SessionDetails/SessionActions/SessionEdit';
import SurveyResults from './pages/SurveyResults';
import TrainerFeedBack from './pages/TrainerFeedback';
import DecideView from './pages/DecideView';

// COMPONENTS
import PrivateRoute from './common/PrivateRoute';
import Spin from './common/Spin';

// ROUTES
import {
  HOME_URL,
  DASHBOARD_URL,
  SURVEY_URL,
  LOGIN_URL,
  SIGN_UP_URL,
  TRAINERS_URL,
  TRAINER_RESULTS_URL,
  GROUP_RESULTS_URL,
  TRAINER_SESSIONS_URL,
  GROUP_SESSIONS_URL,
  TRAINER_FEEDBACK_URL,
  DECIDE_VIEW_URL,
  SESSION_DETAILS_URL,
} from '../constants/navigationRoutes';

import history from '../history';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.offWhite};
`;

class App extends Component {
  componentDidMount() {
    const { checkAuth: checkAuthActionCreator } = this.props;
    checkAuthActionCreator();
  }

  componentDidUpdate() {
    const {
      updateViewLevel: updateViewLevelActionCreator,
      role,
      viewLevel,
    } = this.props;

    if (role && !viewLevel) updateViewLevelActionCreator(role);
  }

  render() {
    const { isAuthenticated, loaded, role } = this.props;
    return (
      <Wrapper>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/survey/:sessionId/:surveyType/results"
              component={SurveyResults}
            />
            <Route exact path="/" component={Home} />
            <PrivateRoute
              exact
              path={TRAINER_RESULTS_URL}
              Component={UserResults}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['trainer', 'admin', 'localLead']}
              role={role}
              navbar
            />

            <PrivateRoute
              exact
              path={GROUP_RESULTS_URL}
              Component={UserResults}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['trainer', 'admin', 'localLead']}
              role={role}
              groupView
              navbar
            />

            <Route exact path={HOME_URL} component={Home} />

            <PrivateRoute
              exact
              path="/add-trainer"
              Component={AddTrainer}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
            />

            <PrivateRoute
              exact
              path={TRAINER_FEEDBACK_URL}
              Component={TrainerFeedBack}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
            />

            <PrivateRoute
              exact
              path={DASHBOARD_URL}
              Component={Dashboard}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
              navbar
            />

            <PrivateRoute
              exact
              path={TRAINERS_URL}
              Component={TrainerListPage}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead']}
              role={role}
              navbar
            />

            <PrivateRoute
              exact
              path={SESSION_DETAILS_URL}
              component={SessionDetails}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
              navbar
            />

            <PrivateRoute
              exact
              path={DECIDE_VIEW_URL}
              Component={DecideView}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead']}
              role={role}
              navbar
            />

            <Route exact path="/create-session" component={CreateSession} />
            <Route exact path={SURVEY_URL} component={Survey} />

            <Route exact path="/session-edit/:id" component={EditSession} />

            <Route
              exact
              path={LOGIN_URL}
              render={() => {
                if (loaded) {
                  return isAuthenticated ? (
                    <Redirect
                      to={role === 'trainer' ? DASHBOARD_URL : DECIDE_VIEW_URL}
                    />
                  ) : (
                    <Login />
                  );
                }
                return <Spin />;
              }}
            />
            <Route
              exact
              path={SIGN_UP_URL}
              render={() => {
                if (loaded) {
                  return isAuthenticated ? (
                    <Redirect to={DASHBOARD_URL} />
                  ) : (
                    <SignUp />
                  );
                }
                return <Spin />;
              }}
            />

            <Route
              exact
              path="/participant-login"
              render={() => {
                if (loaded) {
                  return isAuthenticated ||
                    (loaded && role === 'participant') ? (
                    <Redirect to="/participant-dashboard" />
                  ) : (
                    <ParticipantLogin />
                  );
                }
                return <Spin />;
              }}
            />

            <PrivateRoute
              exact
              path="/participant-dashboard"
              Component={UserDashboard}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['participant']}
              role={role}
            />

            <PrivateRoute
              exact
              path="/participant/behavioral-insight"
              Component={ParticipantBehavioral}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['participant']}
              role={role}
              navbar
            />

            <PrivateRoute
              exact
              path={TRAINER_SESSIONS_URL}
              Component={ViewSessions}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['trainer', 'localLead', 'admin']}
              role={role}
              navbar
            />

            <PrivateRoute
              exact
              path={GROUP_SESSIONS_URL}
              Component={ViewSessions}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['localLead', 'admin']}
              role={role}
              navbar
            />
            <Route
              path="/404err"
              render={() => (
                <h1>
                  404 go home<Link to={HOME_URL}>home</Link>
                </h1>
              )}
            />
          </Switch>
        </Router>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
  loaded: state.auth.loaded,
  viewLevel: state.viewLevel.viewLevel,
});

export default connect(
  mapStateToProps,
  { checkAuth, updateViewLevel }
)(App);
