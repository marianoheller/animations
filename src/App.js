import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import NavScroll from './components/NavScroll';
import routes from './routes';

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <AppWrapper>
          <NavScroll />
          <Switch>
            {routes.map(routeConfig => <Route {...routeConfig} />)}
            <Route render={() => {
              return <Redirect to={routes[0].path} />
            }}/>
          </Switch>
        </AppWrapper>
      </Router>
    );
  }
}

export default App;
