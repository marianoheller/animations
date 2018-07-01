import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

const __Arrow = styled(ReactSVG)`
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

  & svg {
    width: 4rem;
    height: 4rem;
  }
  & svg path {
    fill: ${({ color }) => color};
  }

  &:hover {
    transform: translateY(-50%) scale(1.25);
    top: 50%;
  }
`;

const LeftArrow = __Arrow.extend`
  left: 0;
  & > #leftArrow {
    fill: "#FFFFFF";
  }
`;

const RightArrow = __Arrow.extend`
  right: 0;
`;


const ArrowScroll = ({ color, increase, decrease }) => (
  <React.Fragment>
    <LeftArrow path="./img/leftArrow.svg" onClick={decrease} color={color} />
    <RightArrow path="./img/rightArrow.svg" onClick={increase} color={color} />
    {/* <LeftArrow color={color} src={leftArrow} alt="leftArrow" onClick={decrease} />
    <RightArrow color={color} src={rightArrow} alt="rightArrow" onClick={increase} /> */}
  </React.Fragment>
);


ArrowScroll.propTypes = {
  increase: PropTypes.func,
  decrease: PropTypes.func,
  color: PropTypes.string,
};

ArrowScroll.defaultProps = {
  increase: () => {},
  decrease: () => {},
  color: '#000000',
};

export default ArrowScroll;
