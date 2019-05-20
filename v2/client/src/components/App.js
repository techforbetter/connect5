import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';

// PAGES
import Login from './pages/auth/login';
import TrainerResutls from './pages/TrainerResults';
import CreateSession from './pages/CreateSession';
import Dashboard from './pages/Dashboard';
import Home from './pages/LandingPage';
import UserResults from './pages/UserResults';

// ROUTES
import { HOME_URL, DASHBOARD_URL } from '../constants/navigationRoutes';
import history from '../history';

const Wrapper = styled.div`
  min-height: 100vh;
`;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Wrapper>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users/:id/results" component={UserResults} />
            <Route exact path={HOME_URL} component={Home} />
            <Route exact path={DASHBOARD_URL} component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/trainer-results" component={TrainerResutls} />
            <Route exact path="/create-session" component={CreateSession} />
            <Route
              exact
              path="/404err"
              render={() => (
                <h1>
                  404 go home<Link to="/">home</Link>
                </h1>
              )}
            />
          </Switch>
        </Router>
      </Wrapper>
    );
  }
}

export default App;
