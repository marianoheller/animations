import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Title from './components/Title';
import ArrowScroll from './components/ArrowScroll';
import routes from './routes';

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      routeIndex: 0,
    };
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(num) {
    return () => {
      this.setState({
        routeIndex: (this.state.routeIndex + num) % routes.length,
      });
    };
  }

  render() {
    const { routeIndex } = this.state;
    return (
      <Router>
        <AppWrapper>
          <Title title={routes[routeIndex].title} />
          <ArrowScroll increase={this.changeRoute(1)} decrease={this.changeRoute(-1)} />
          <Switch>
            {routes.map(routeConfig => <Route key={routeConfig.path} {...routeConfig} />)}
            <Route render={() => <Redirect to={routes[0].path} />} />
          </Switch>
        </AppWrapper>
      </Router>
    );
  }
}

export default App;
