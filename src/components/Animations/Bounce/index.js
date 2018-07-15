/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components';
import { scaleLinear } from '@vx/scale';
import { ParentSize } from '@vx/responsive';
import { Spring, Keyframes, animated } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';

const MAX_HEIGHT = 300;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffe1ff;
  cursor: pointer;
`;

const animationScript = async (next) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await next(Spring, {
      from: { ballHeight: 300, ry: 50, rx: 50 },
      to: { ballHeight: 0, ry: 45, rx: 55 },
    });
    await next(Spring, {
      // from: { ballHeight: 0, ry: 50, rx: 50 },
      to: { ballHeight: 300, ry: 50, rx: 50 },
      config: {
        tension: 200,
        friction: 25,
        velocity: 100,
      },
    });
  }
};


const heightHistory = [0];
const derivHistory = [0];
const deriv = (numbers) => {
  const ret = numbers[numbers.length - 1] - numbers[0];
  derivHistory.push(ret);
  if (derivHistory.length > 10) derivHistory.shift();
  return derivHistory.reduce((a, d) => a + d, 0) / derivHistory.length;
};
const rxScale = scaleLinear({
  domain: [-15, 15],
  range: [40, 60],
  clamp: true,
});
const ryScale = scaleLinear({
  domain: [-15, 15],
  range: [60, 40],
  clamp: true,
});

/* eslint-disable-next-line */
const Ball = ({ ballHeight, height, width }) => {
  ballHeight.addListener((e) => {
    heightHistory.push(e.value);
    if (heightHistory.length > 2) heightHistory.shift();
  });
  return (
    <svg height={height} width={width}>
      <animated.ellipse
        cx="200"
        cy="200"
        rx={ballHeight.interpolate(() => `${rxScale(deriv(heightHistory))}`)}
        ry={ballHeight.interpolate(() => `${ryScale(deriv(heightHistory))}`)}
        fill="#247BA0"
        stroke="#247BA0"
        strokeWidth="2px"
        style={{
          willChange: 'transform',
          transform: ballHeight.interpolate(bH => `translate3d(0, ${MAX_HEIGHT - bH}px, 0)`),
        }}
      />
    </svg>
  );
};

class Bounce extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      aState: 'drop',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { aState } = this.state;
    const possibleStates = ['topAndDrop', 'drop'];
    const currentIndex = possibleStates.findIndex(p => p === aState);
    const nextAState = possibleStates[(currentIndex + 1) % possibleStates.length];
    this.setState({ aState: nextAState });
  }

  render() {
    const { aState } = this.state;
    return (
      <StyledContainer onClick={this.toggle}>
        <ParentSize >
          {sizeProps => (
            <Keyframes
              state={aState}
              reset
              native
              impl={TimingAnimation}
              config={{ duration: 2500, easing: Easing.bounce }}
              script={animationScript}
            >
              {keyframesProps => <Ball {...sizeProps} {...keyframesProps} />}
            </Keyframes>
          )}
        </ParentSize>
      </StyledContainer>
    );
  }
}

export default Bounce;
