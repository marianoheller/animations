import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';


import Showcase from './components/Showcase';
import Title from './components/Title';
import ArrowScroll from './components/ArrowScroll';
import routes from './routes';

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    /* eslint-disable-next-line react/prop-types */
    const index = routes.findIndex(r => r.path === props.location.pathname);
    this.state = {
      routeIndex: index !== -1 ? index : 0,
    };
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(num) {
    // Mod to handle negative numbers
    const mod = (a, n) => ((a % n) + n) % n;
    return () => {
      this.setState({
        routeIndex: mod(this.state.routeIndex + num, routes.length),
      }, () => {
        /* eslint-disable-next-line react/prop-types */
        const { history } = this.props;
        history.push(routes[this.state.routeIndex].path);
      });
    };
  }

  render() {
    const { routeIndex } = this.state;
    return (
      <AppWrapper>
        <Switch>
          <Route path="/" exact component={Showcase} />
          <Route render={() => (
            <React.Fragment>
              <Title color={routes[routeIndex].color} title={routes[routeIndex].title} />
              <ArrowScroll
                color={routes[routeIndex].color}
                increase={this.changeRoute(1)}
                decrease={this.changeRoute(-1)}
              />
              {routes.map(routeConfig => <Route key={routeConfig.path} {...routeConfig} />)}
            </React.Fragment>
            )}
          />
          <Route render={() => <Redirect to={routes[0].path} />} />
        </Switch>
      </AppWrapper>
    );
  }
}

export default withRouter(App);
