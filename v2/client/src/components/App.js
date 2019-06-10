import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
// PLEASE DO NOT PUT ANTD STYLING SHEET HERE AS OVERRIDES EXISTING STYLES
// import 'antd/dist/antd.css';
import styled from 'styled-components';

import { checkAuth } from '../actions/authAction';

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
import TrainerFeedBack from './pages/TrainerFeedback';

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
  TRAINER_SESSIONS_URL,
  GROUP_SESSIONS_URL,
  TRAINER_FEEDBACK_URL,
} from '../constants/navigationRoutes';

import history from '../history';

const Wrapper = styled.div`
  min-height: 100vh;
`;

class App extends Component {
  componentDidMount() {
    const { checkAuth: checkAuthActionCreator } = this.props;
    checkAuthActionCreator();
  }

  render() {
    const { isAuthenticated, loaded, role } = this.props;
    return (
      <Wrapper>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/users/:id/results" component={UserResults} />
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
            />

            <Route exact path={TRAINERS_URL} component={TrainerListPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create-session" component={CreateSession} />
            <Route exact path={SURVEY_URL} component={Survey} />
            <Route
              exact
              path="/session-details/:id"
              component={SessionDetails}
            />
            <Route exact path="/session-edit/:id" component={EditSession} />

            <Route
              exact
              path={LOGIN_URL}
              render={() => {
                if (loaded) {
                  return isAuthenticated ? (
                    <Redirect to={DASHBOARD_URL} />
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
            />

            <PrivateRoute
              exact
              path={TRAINER_SESSIONS_URL}
              component={ViewSessions}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['trainer', 'localLead', 'admin']}
              role={role}
            />

            <PrivateRoute
              exact
              path={GROUP_SESSIONS_URL}
              component={ViewSessions}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['localLead', 'admin']}
              role={role}
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
});

export default connect(
  mapStateToProps,
  { checkAuth }
)(App);
