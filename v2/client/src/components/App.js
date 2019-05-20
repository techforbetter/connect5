import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { connect } from 'react-redux';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { checkAuth } from '../actions/authAction';

// PAGES
import Login from './pages/auth/login';
import ParticipantLogin from './pages/auth/login-participant';
import UserDashboard from './pages/userDashboard';
import Dashboard from './pages/Dashboard';
import Home from './pages/LandingPage';
import SignUp from './pages/SignUp';
import UserResults from './pages/UserResults';

// COMPONENTS
import PrivateRoute from './common/PrivateRoute';
import Spin from './common/Spin';

// ROUTES
import {
  HOME_URL,
  DASHBOARD_URL,
  LOGIN_URL,
  SIGN_UP_URL,
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
    const { isAuthenticated, loaded } = this.props;
    return (
      <Wrapper>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users/:id/results" component={UserResults} />
            <Route exact path={HOME_URL} component={Home} />

            <PrivateRoute
              exact
              path={DASHBOARD_URL}
              Component={Dashboard}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
            />

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
              component={ParticipantLogin}
            />
            <Route
              exact
              path="/participant-dashboard"
              component={UserDashboard}
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
  loaded: state.auth.loaded,
});

export default connect(
  mapStateToProps,
  { checkAuth }
)(App);
