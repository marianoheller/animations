import React, { Component } from 'react';
import styled from 'styled-components';

import Tides from './components/Tides';

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Tides />
      </AppWrapper>
    );
  }
}

export default App;
