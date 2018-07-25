/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import { curveBasis } from '@vx/curve';
import { ParentSize } from '@vx/responsive';
import { transpose } from 'd3-array';
import { Spring } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';
import { Stack } from '@vx/shape';
import { PatternWaves } from '@vx/pattern';
import { scaleLinear, scaleOrdinal } from '@vx/scale';

import Boat from './Boat';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient( to bottom right, #540007, #ffa200);
`;

const Svg = styled.svg`
  cursor: pointer;
`;

const StyledPatternWaves = styled(PatternWaves)`
  stroke-opacity: ${props => props.deepnessIndex * 0.1};
`;

const range = n => Array.from(Array(n), (d, i) => i);
const numLayers = 6;
const samplesPerLayer = 21;
const bumpsPerLayer = 5;

const keys = range(numLayers);


function bump(a, n) {
  const ret = [...a];
  const x = 1 / (0.1 + Math.random());
  const y = (2 * Math.random()) - 0.5;
  const z = 10 / (0.1 + Math.random());
  for (let i = 0; i < n; i++) {
    const w = ((i / n) - y) * z;
    ret[i] += x * Math.exp(-w * w);
  }
  return ret;
}

function bumps(n, m) {
  let a = new Array(n).fill(0);
  for (let i = 0; i < m; ++i) a = bump(a, n);
  return a;
}

const zScale = scaleOrdinal({
  domain: keys,
  range: ['#026bff', '#3103ff', '#1f03db', '#1002ab', '#050175', '#010242'],
  clamp: true,
});

const patternScale = scaleOrdinal({
  domain: keys,
  range: ['water5', 'water4', 'water3', 'water2', 'water1', 'water0'],
  clamp: true,
});


const boatSize = {
  h: 100,
  w: 100,
};

/* eslint-disable react/prop-types */
const Graph = ({
  data,
  xScale,
  yScale,
  toggle,
}) => (
  /* eslint-enable react/prop-types */
  <Stack
    curve={curveBasis}
    data={data}
    keys={keys}
    offset="wiggle"
    x={(d, i) => xScale(i)}
    y0={d => yScale(d[0])}
    y1={d => yScale(d[1])}
    render={({ seriesData, path }) => (
      <React.Fragment>
        {seriesData.map(series => (
          <g key={`series-${series.key}`}>
            <Spring
              to={{
                d: path(series),
                b: series[10][0],
                angle: (Math.random() - 0.5) * 35,
                scale: 1 + ((Math.random() - 0.5) * 0.2),
              }}
              onRest={toggle}
              impl={TimingAnimation}
              config={{ duration: 2000, easing: Easing.inOut(Easing.linear) }}
            >
              {({
                d,
                b,
                angle,
                scale,
              }) => (
                <React.Fragment>
                  { series.key === 1 &&
                    <Boat
                      x={xScale(10) - (boatSize.w / 2)}
                      y={yScale(b) - (boatSize.h * 0.9)}
                      width={boatSize.w}
                      height={boatSize.h}
                      angle={angle}
                      scale={scale}
                      id="boat"
                    />
                  }
                  <path d={d} fill={zScale(series.key)} />
                  <path d={d} fill={`url(#${patternScale(series.key)})`} />
                </React.Fragment>
              )}
            </Spring>
          </g>
        ))}
      </React.Fragment>
    )}
  />
);

export default class Sea extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      toggle: true,
      firstRender: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    if (this.state.firstRender) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        firstRender: false,
      });
    }
  }

  toggle() {
    this.setState(state => ({ toggle: !state.toggle }));
  }

  render() {
    const data = transpose(keys.map((e, i) => {
      if (i === keys.length - 1) return Array(samplesPerLayer).fill(10);
      return bumps(samplesPerLayer, bumpsPerLayer).map(b => b + 0.75 + Math.random() + Math.random());
    }));
    return (
      <Container>
        <ParentSize>
          {({ width, height }) => {
            if (width === 0 && height === 0) {
              /* eslint-disable no-param-reassign */
              height = window.innerHeight;
              width = window.innerWidth;
              /* eslint-enable no-param-reassign */
            }
            const xScale = scaleLinear({
              range: [0, width],
              domain: [0, samplesPerLayer - 1],
            });
            const yScale = scaleLinear({
              range: [height / 3, height],
              domain: [-8, 11],
              clamp: true,
            });
            return (
              <Svg width={width} height={height} onClick={this.toggle}>
                {Array(6).fill(0).map((e, i) => (
                  <StyledPatternWaves
                    key={`water${i}`}
                    id={`water${i}`}
                    height={12}
                    width={12}
                    fill="transparent"
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.1}
                    complement
                    deepnessIndex={i}
                  />
                ))}
                <g onClick={() => this.forceUpdate()} onTouchStart={() => this.forceUpdate()}>
                  <Graph data={data} xScale={xScale} yScale={yScale} toggle={this.toggle} />
                </g>
              </Svg>
            );
          }}
        </ParentSize>
      </Container>
    );
  }
}
