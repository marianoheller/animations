/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { ParentSize } from '@vx/responsive';
import { Keyframes, animated } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';
import { GradientPinkRed } from '@vx/gradient';
import { curveBasis } from '@vx/curve';
import { AreaClosed } from '@vx/shape';
import { genDateValue } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const AnimatedAreaClosed = animated(AreaClosed);

const KeyframesContainer = Keyframes.Spring(async (next) => {
  while (true) {
    await next({
      from: { t: 0, color: '#247BA0' },
      to: { t: 1 },
    });
  }
});


const data = genDateValue(10);
const x = d => d.date;
const y = d => d.value;

const Content = ({ t, color, height, width }) => {
  const yMax = max(data, y);
  const yScale = scaleLinear({ range: [height, height / 2], domain: [0, yMax], nice: true });
  const xScale = scaleTime({ range: [0, width], domain: extent(data, x) });
  return (
    <animated.svg
      width={width}
      height={height}
    >
      <GradientPinkRed id="PinkRed" />
      <animated.g fill={color} fillRule="evenodd">
        <AnimatedAreaClosed
          data={t.interpolate((i) => {
            console.log("INTERPOL", i);
            return data.map(d => ({ ...d, value: i * 300 }));
          })}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          strokeWidth={2}
          stroke="url(#PinkRed)"
          fill="url(#PinkRed)"
          curve={curveBasis}
        />
      </animated.g>
    </animated.svg>
  );
}

function Sea() {
  return (
    <Container>
      <ParentSize>
        {sizeProps => (
          <KeyframesContainer
            reset
            native
            impl={TimingAnimation}
            config={{ duration: 3000, easing: Easing.linear }}
          >
            {keyframeProps => <Content {...sizeProps} {...keyframeProps} />}
          </KeyframesContainer>
        )}
      </ParentSize>
    </Container>
  );
}

export default Sea;
