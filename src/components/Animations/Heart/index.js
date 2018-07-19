/* eslint-disable no-shadow */
/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Keyframes, animated } from 'react-spring';
import { ParentSize } from '@vx/responsive';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';

const strokeColor = '#B8B8B8';
const heartColor = '#E21737';

const AnimationContainer = Keyframes.Spring(async (next) => {
  while (true) {
    // Draw square
    await next({
      from: {
        squareDashOffset: 1,
        circleDashOffset: 1,
        circleTrans: 0,
        groupAngle: 0,
        opacityFrame: 1,
        heartDashOffset: 1,
        heartTransparency: 0,
        heartOpacity: 0,
      },
      to: { squareDashOffset: 0 },
    });
    // Draw circles
    await next({
      from: { circleDashOffset: 1 },
      to: { circleDashOffset: 0 },
    });
    // Move circles circles
    await next({
      from: { circleTrans: 0 },
      to: { circleTrans: 1 },
    });
    // Rotate group
    await next({
      from: { groupAngle: 0, heartOpacity: 0 },
      to: { groupAngle: 45, heartOpacity: 1 },
      config: {
        tension: 200,
        friction: 50,
      },
    });
    // Draw heart
    await next({
      from: { opacityFrame: 1, heartDashOffset: 1 },
      to: { opacityFrame: 0, heartDashOffset: 0 },
    });
    // Colour heart
    await next({
      from: { heartTransparency: 0 },
      to: { heartTransparency: 1 },
    });
    // Fade out heart partially
    await next({
      from: { heartOpacity: 1 },
      to: { heartOpacity: 0.6 },
    });
    // Fade in heart
    await next({
      from: { heartOpacity: 0.6 },
      to: { heartOpacity: 1 },
    });
    // Fade out heart partially
    await next({
      from: { heartOpacity: 1 },
      to: { heartOpacity: 0 },
    });
  }
});

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
`;


const Svg = ({
  squareDashOffset,
  circleDashOffset,
  circleTrans,
  groupAngle,
  opacityFrame,
  heartDashOffset,
  heartTransparency,
  heartOpacity,
  width,
  height,
}) => {
  const squareSide = height / 5;
  return (
    <animated.svg
      width={width}
      height={height}
      style={{
        willChange: 'transform',
        transform: groupAngle.interpolate(a => `rotate(-${a}deg)`),
      }}
    >
      {/* Square */}
      <animated.rect
        x={(width / 2) - (squareSide / 2)}
        y={(height / 2) - (squareSide / 2)}
        width={squareSide}
        height={squareSide}
        fill="none"
        style={{
          stroke: strokeColor,
          strokeDasharray: `${4 * squareSide}`,
          strokeDashoffset: squareDashOffset.interpolate(o => o * 4 * squareSide),
          opacity: opacityFrame.interpolate(o => o),
        }}
      />
      {/* Upper circle */}
      <animated.circle
        cx={width / 2}
        cy={height / 2}
        r={squareSide / 2}
        fill="none"
        style={{
          stroke: strokeColor,
          strokeDasharray: `${Math.PI * squareSide}`,
          strokeDashoffset: circleDashOffset.interpolate(o => o * Math.PI * squareSide),
          willChange: 'transform',
          transform: circleTrans.interpolate(d => `translate(0,-${d * (squareSide / 2)}px)`),
          opacity: opacityFrame.interpolate(o => o),
        }}
      />
      {/* Lower circle */}
      <animated.circle
        cx={width / 2}
        cy={height / 2}
        r={squareSide / 2}
        fill="none"
        style={{
          stroke: strokeColor,
          strokeDasharray: `${Math.PI * squareSide}`,
          strokeDashoffset: circleDashOffset.interpolate(o => o * Math.PI * squareSide),
          willChange: 'transform',
          transform: circleTrans.interpolate(d => `translate(${d * (squareSide / 2)}px,0)`),
          opacity: opacityFrame.interpolate(o => o),
        }}
      />
      {/* Heart path */}
      <animated.path
        d={`
          M${(width / 2) + (squareSide / 2)},${(height / 2) - (squareSide / 2)}
          A${(squareSide / 2)},${(squareSide / 2)} 0 0,1 
           ${(width / 2) + (squareSide / 2)},${(height / 2) + (squareSide / 2)}
          L${(width / 2) + (squareSide / 2)},${(height / 2) + (squareSide / 2)}
           ${(width / 2) - (squareSide / 2)},${(height / 2) + (squareSide / 2)}
          L${(width / 2) - (squareSide / 2)},${(height / 2) + (squareSide / 2)}
           ${(width / 2) - (squareSide / 2)},${(height / 2) - (squareSide / 2)}
          A${(squareSide / 2)},${(squareSide / 2)} 0 0,1
           ${(width / 2) + (squareSide / 2)},${(height / 2) - (squareSide / 2)}
        `}
        strokeWidth="4px"
        fill="none"
        style={{
          stroke: heartColor,
          strokeDasharray: `${(Math.PI * squareSide) + (2 * squareSide)}`,
          strokeDashoffset: heartDashOffset.interpolate(o => o * ((Math.PI * squareSide) + (2 * squareSide))),
          fill: heartTransparency.interpolate(t => `rgba(226, 23, 55, ${t})`),
          opacity: heartOpacity.interpolate(o => o),
        }}
      />
    </animated.svg>
  );
};


class Heart extends React.PureComponent {
  goNext() {
    this.setState(state => ({ index: state.index + 1 >= state.paths.length ? 0 : state.index + 1 }));
  }

  render() {
    return (
      <StyledContainer>
        <ParentSize >
          {sizeProps => (
            <AnimationContainer
              reset
              native
              impl={TimingAnimation}
              config={{ duration: 1200, easing: Easing.linear }}
            >
              {keyframesProps => <Svg {...sizeProps} {...keyframesProps} />}
            </AnimationContainer>
          )}
        </ParentSize>
      </StyledContainer>
    );
  }
}

export default Heart;
