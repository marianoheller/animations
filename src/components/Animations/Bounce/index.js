/* eslint-disable no-shadow */
/* eslint-disable no-constant-condition */
import React from 'react';
import styled from 'styled-components';
import { scaleLinear } from '@vx/scale';
import { ParentSize } from '@vx/responsive';
import { Spring, Keyframes, animated } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';

const BALL_COLOR = '#c9ff35';


const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ff7354;
  /* cursor: pointer; */
`;

const animationScript = (state, sizeProps) => {
  switch (state) {
    case 'drop':
      return async (next) => {
        while (true) {
          await next(Spring, {
            from: { ballHeight: sizeProps.height / 2 },
            to: { ballHeight: 0 },
          });
          await next(Spring, {
            to: { ballHeight: sizeProps.height / 2 },
            config: {
              tension: 200,
              friction: 25,
              velocity: 100,
            },
          });
        }
      };
    case 'toTop': {
      console.log('THIS RUNS WHEN CHANGING STATE');
      return async (next) => {
        console.log("WHY THIS DOESN'T RUN!! :(");
        await next(Spring, {
          to: { ballHeight: 0 },
        });
      };
    }
    default:
      return null;
  }
};


const heightHistory = [window.innerHeight / 2, window.innerHeight / 2];
const derivHistory = [0, 0];
const deriv = (heights) => {
  const diff = heights[heights.length - 1] - heights[0];
  derivHistory.push(diff);
  if (derivHistory.length > 10) derivHistory.shift();
  return derivHistory.reduce((a, d) => a + d, 0) / derivHistory.length;
};

const rxScale = scaleLinear({
  domain: [-15, 15],
  range: [35, 65],
  clamp: true,
});
const ryScale = scaleLinear({
  domain: [-15, 15],
  range: [65, 35],
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
        cx={`${width / 2}`}
        cy={`${(3 + height) / 4}`}
        rx={ballHeight.interpolate(() => `${rxScale(deriv(heightHistory))}`)}
        ry={ballHeight.interpolate(() => `${ryScale(deriv(heightHistory))}`)}
        fill={BALL_COLOR}
        stroke={BALL_COLOR}
        strokeWidth="2px"
        style={{
          willChange: 'transform',
          transform: ballHeight.interpolate(bH => `translate3d(0, ${(height / 2) - bH}px, 0)`),
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

  /* eslint-disable */
  toggle() {
    // Disabled toogle.
    // TODO: fix this
    /* const { aState } = this.state;
    const possibleStates = ['toTop', 'drop'];
    const currentIndex = possibleStates.findIndex(p => p === aState);
    const nextAState = possibleStates[(currentIndex + 1) % possibleStates.length];
    this.setState({ aState: nextAState }); */
  }
  /* eslint-enable */

  render() {
    const { aState } = this.state;
    return (
      <StyledContainer onClick={this.toggle}>
        <ParentSize >
          {(sizeProps) => {
            /* eslint-disable no-param-reassign */
            if (sizeProps.height === 0 || sizeProps.width === 0) {
              sizeProps.height = window.innerHeight;
              sizeProps.width = window.innerWidth;
            }
            /* eslint-enable no-param-reassign */
            return (
              <Keyframes
                reset
                native
                impl={TimingAnimation}
                config={{ duration: 2500, easing: Easing.bounce }}
                script={animationScript(aState, sizeProps)}
              >
                {keyframesProps => <Ball {...sizeProps} {...keyframesProps} />}
              </Keyframes>
            );
          }}
        </ParentSize>
      </StyledContainer>
    );
  }
}

export default Bounce;
