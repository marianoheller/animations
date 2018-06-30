import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import routes from '../../routes';

import leftArrow from './leftArrow.svg'
import rightArrow from './rightArrow.svg'

const NavScrollContainer = styled.div`  
  position: absolute;
  top: 0.5rem;;
  left: 0;
  width: 100%;
  z-index: 10;

  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const LeftArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
`;
const RightArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

const StyledArrow = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  user-select: none;

  &:hover {
    width: 2.1rem;
    height: 2.1rem;
  }
`;

const TitleWrapper = styled.div`
  font-family: 'Galada', cursive;
  user-select: none;
  cursor: default;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class NavScroll extends Component {
  render() {
    const { location } = this.props;
    return (
      <NavScrollContainer>
        <LeftArrowWrapper>
          <StyledArrow  src={leftArrow} alt="leftArrow"/>
        </LeftArrowWrapper>
        <TitleWrapper>
          {routes.find(r => r.path===location.pathname).title || 'Animation'}
        </TitleWrapper>
        <RightArrowWrapper>
          <StyledArrow  src={rightArrow} alt="rightArrow"/>
        </RightArrowWrapper>
      </NavScrollContainer>
    )
  }
}

export default withRouter(NavScroll);