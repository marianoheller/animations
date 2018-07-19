/* eslint-disable no-shadow */
/* eslint-disable no-constant-condition */
import React from 'react';
import styled from 'styled-components';
import { scaleLinear } from '@vx/scale';
import { ParentSize } from '@vx/responsive';
import { Keyframes, animated } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';

const BALL_COLOR = '#c9ff35';


const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ff7354;
  /* cursor: pointer; */
`;

const AnimationContainer = Keyframes.Spring(async (next) => {
  while (true) {
    await next({
      from: { ballHeight: 1 },
      to: { ballHeight: 0 },
    });
    await next({
      from: { ballHeight: 0 },
      to: { ballHeight: 1 },
      config: {
        tension: 200,
        friction: 10,
      },
    });
  }
});

const heightHistory = [];
const derivHistory = [];
const deriv = (heights) => {
  if (heights.length < 2) return 0;
  const diff = heights[heights.length - 1] - heights[0];
  derivHistory.push(diff);
  if (derivHistory.length > 10) derivHistory.shift();
  return derivHistory.reduce((a, d) => a + d, 0) / derivHistory.length;
};

const rxScale = scaleLinear({
  domain: [-0.08, 0.08],
  range: [35, 65],
  clamp: true,
});
const ryScale = scaleLinear({
  domain: [-0.08, 0.08],
  range: [65, 35],
  clamp: true,
});


/* eslint-disable-next-line */
const Ball = ({ ballHeight, height, width }) => {
  ballHeight.addListener((e) => {
    heightHistory.push(e.value);
    if (heightHistory.length > 2) heightHistory.shift();
  });
  const maxHeight = height / 2;
  return (
    <animated.svg height={height} width={width}>
      <animated.ellipse
        cx={`${width / 2}`}
        cy={`${(3 + height) / 4}`}
        rx={ballHeight.interpolate(() => `${rxScale(deriv(heightHistory))}`)}
        ry={ballHeight.interpolate(() => `${ryScale(deriv(heightHistory))}`)}
        fill={BALL_COLOR}
        stroke={BALL_COLOR}
        strokeWidth="2px"
        style={{
          willChange: 'transform',
          transform: ballHeight.interpolate(bH => `translate3d(0, ${(1 - bH) * maxHeight}px, 0)`),
        }}
      />
    </animated.svg>
  );
};

class Bounce extends React.PureComponent {
  render() {
    return (
      <StyledContainer onClick={this.toggle}>
        <ParentSize >
          {sizeProps => (
            <AnimationContainer
              reset
              native
              impl={TimingAnimation}
              config={{ duration: 2500, easing: Easing.bounce }}
            >
              {keyframesProps => <Ball {...sizeProps} {...keyframesProps} />}
            </AnimationContainer>
          )}
        </ParentSize>
      </StyledContainer>
    );
  }
}

export default Bounce;
