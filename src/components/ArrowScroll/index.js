import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import leftArrow from './leftArrow.svg';
import rightArrow from './rightArrow.svg';

const __Arrow = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  user-select: none;

  &:hover {
    transform: translateY(-50%) scale(1.25);
    top: 50%;
  }
`;

const LeftArrow = __Arrow.extend`
  left: 0;
`;

const RightArrow = __Arrow.extend`
  right: 0;
`;


const ArrowScroll = ({ increase, decrease }) => (
  <React.Fragment>
    <LeftArrow src={leftArrow} alt="leftArrow" onClick={decrease} />
    <RightArrow src={rightArrow} alt="rightArrow" onClick={increase} />
  </React.Fragment>
);


ArrowScroll.propTypes = {
  increase: PropTypes.func,
  decrease: PropTypes.func,
};

ArrowScroll.defaultProps = {
  increase: () => {},
  decrease: () => {},
};

export default ArrowScroll;
