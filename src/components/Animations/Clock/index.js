/* eslint-disable no-shadow */
/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Keyframes, animated } from 'react-spring';
import { ParentSize } from '@vx/responsive';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';


const calcInitialDegrees = () => {
  const now = new Date();
  return {
    seconds: now.getSeconds() * (360 / 60),
    minutes: now.getMinutes() * (360 / 60),
    hours: (now.getHours() % 12) * (360 / 12),
  };
};

/*
const calcTickLines = (i, cx, cy, rStart, rEnd) => {
  const degs = (360 / 12) * i;
  const x1 = Math.sin(degs);
  return {
    x1: 1,
    y1: 1,
    x2: 2,
    y2: 2,
  };
};
 */

const AnimationContainer = Keyframes.Spring(async (next) => {
  while (true) {
    // Draw square
    await next({
      from: { seconds: 0 },
      to: { seconds: 59 },
    });
  }
});


const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
`;


const Svg = ({
  seconds,
  width,
  height,
  iniDeg,
}) => {
  const opts = {
    seconds: {
      length: 100,
      width: 2,
    },
    minutes: {
      length: 80,
      width: 3,
    },
    hours: {
      length: 60,
      width: 4,
    },
  };
  return (
    <svg
      width={width}
      height={height}
    >
      {/* Seconds */}
      <animated.line
        x1={width / 2}
        y1={height / 2}
        x2={width / 2}
        y2={(height / 2) - opts.seconds.length}
        stroke="black"
        strokeWidth={opts.seconds.width}

        style={{
          willChange: 'transform',
          transform: seconds.interpolate(s => `rotate(${(s * 6) + iniDeg.seconds}deg)`),
          transformOrigin: `${width / 2}px ${height / 2}px`,
        }}
      />
      {/* Minutes */}
      <animated.line
        x1={width / 2}
        y1={height / 2}
        x2={width / 2}
        y2={(height / 2) - opts.minutes.length}
        stroke="black"
        strokeWidth={opts.minutes.width}

        style={{
          willChange: 'transform',
          transform: seconds.interpolate(s => `rotate(${((s * 6) / 60) + iniDeg.minutes}deg)`),
          transformOrigin: `${width / 2}px ${height / 2}px`,
        }}
      />
      {/* Hours */}
      <animated.line
        x1={width / 2}
        y1={height / 2}
        x2={width / 2}
        y2={(height / 2) - opts.hours.length}
        stroke="black"
        strokeWidth={opts.hours.width}

        style={{
          willChange: 'transform',
          transform: seconds.interpolate(s => `rotate(${((s * 6) / (60 * 60)) + iniDeg.hours}deg)`),
          transformOrigin: `${width / 2}px ${height / 2}px`,
        }}
      />
      {/* Ticks */}
      {Array(12).fill(0).map(() => (
        <line
          x1={width / 2}
          y1={height / 2}
          x2={width / 2}
          y2={(height / 2) - opts.hours.length}
          stroke="black"
          strokeWidth={opts.hours.width}
        />
      ))}
    </svg>
  );
};


class Clock extends React.PureComponent {
  goNext() {
    this.setState(state => ({ index: state.index + 1 >= state.paths.length ? 0 : state.index + 1 }));
  }

  render() {
    const iniDegrees = calcInitialDegrees();
    return (
      <StyledContainer>
        <ParentSize >
          {sizeProps => (
            <AnimationContainer
              reset
              native
              impl={TimingAnimation}
              config={{ duration: 60000, easing: Easing.linear }}
            >
              {keyframesProps => <Svg {...sizeProps} {...keyframesProps} iniDeg={iniDegrees} />}
            </AnimationContainer>
          )}
        </ParentSize>
      </StyledContainer>
    );
  }
}

export default Clock;
