/* eslint-disable no-shadow */
/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Keyframes, animated } from 'react-spring';
import { ParentSize } from '@vx/responsive';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';


const colors = {
  primary: '#5044ff',
  secondary: '#ffa844',
};

const calcInitialDegrees = () => {
  const now = new Date();
  return {
    seconds: now.getSeconds() * (360 / 60),
    minutes: now.getMinutes() * (360 / 60),
    hours: (now.getHours() % 12) * (360 / 12),
  };
};


const calcTickLines = (i, cx, cy, r) => {
  const rads = (((2 * Math.PI) / 12) * i);
  const tickLen = 0.15 * r;
  const hHyp = r * 0.95;
  const lHyp = hHyp - tickLen;
  return {
    x1: (Math.cos(rads) * lHyp) + cx,
    y1: (Math.sin(rads) * lHyp) + cy,
    x2: (Math.cos(rads) * hHyp) + cx,
    y2: (Math.sin(rads) * hHyp) + cy,
  };
};


const calcTickInterval = (deg) => {
  const coef = Math.floor(deg / 6);
  return coef * 6;
};

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
  background: ${() => `linear-gradient(90deg, ${colors.primary} 50%, ${colors.secondary} 50%)`};
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
    innerCircle: {
      r: 120,
      color: colors.primary,
    },
    outerCircle: {
      r: 140,
      color: colors.secondary,
    },
  };
  return (
    <svg
      width={width}
      height={height}
    >
      {/* Outer circle */}
      <circle
        cx={width / 2}
        cy={height / 2}
        r={opts.outerCircle.r}
        stroke={opts.outerCircle.color}
        fill={opts.outerCircle.color}
        strokeWidth={opts.hours.width}
      />
      {/* Inner circle */}
      <circle
        cx={width / 2}
        cy={height / 2}
        r={opts.innerCircle.r}
        stroke={opts.innerCircle.color}
        fill={opts.innerCircle.color}
        strokeWidth={opts.hours.width}
      />
      {/* Ticks */}
      {Array(12).fill(0).map((e, i) => {
        const c = calcTickLines(i, width / 2, height / 2, opts.innerCircle.r);
        return (
          <line
            key={`lineTick${i}`}
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
            stroke={colors.secondary}
            strokeWidth={2}
          />
        );
      })}
      {/* Seconds */}
      <animated.line
        x1={width / 2}
        y1={height / 2}
        x2={width / 2}
        y2={(height / 2) - opts.seconds.length}
        stroke={colors.secondary}
        strokeWidth={opts.seconds.width}

        style={{
          willChange: 'transform',
          // Can be smooth seconds or ticking
          /* transform: seconds.interpolate(s => `rotate(${Math.floor((s * 6) + iniDeg.seconds)}deg)`), */
          transform: seconds.interpolate(s => `rotate(${calcTickInterval((s * 6) + iniDeg.seconds)}deg)`),
          transformOrigin: `${width / 2}px ${height / 2}px`,
        }}
      />
      {/* Minutes */}
      <animated.line
        x1={width / 2}
        y1={height / 2}
        x2={width / 2}
        y2={(height / 2) - opts.minutes.length}
        stroke={colors.secondary}
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
        stroke={colors.secondary}
        strokeWidth={opts.hours.width}

        style={{
          willChange: 'transform',
          transform: seconds.interpolate(s => `rotate(${((s * 6) / (60 * 60)) + iniDeg.hours}deg)`),
          transformOrigin: `${width / 2}px ${height / 2}px`,
        }}
      />
      {/* Pin */}
      <circle
        cx={width / 2}
        cy={height / 2}
        r={4}
        stroke={colors.secondary}
        strokeWidth={2}
        fill={colors.primary}
      />
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
