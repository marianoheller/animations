/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import { curveBasis } from '@vx/curve';
import { ParentSize } from '@vx/responsive';
import { transpose } from 'd3-array';
import { Spring } from 'react-spring';
import { Stack } from '@vx/shape';
import { PatternCircles, PatternWaves } from '@vx/pattern';
import { scaleLinear, scaleOrdinal } from '@vx/scale';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(#ffe1ff, #ff7fe5);
`;

const Svg = styled.svg`
  cursor: pointer;
`;

const range = n => Array.from(Array(n), (d, i) => i);
const circleInterpolatorFactory = (r, w) => t => Math.sqrt(Math.abs((r ** 2) - ((t - (w / 2)) ** 2)));

const numLayers = 6;
const samplesPerLayer = 11;
const bumpsPerLayer = 3;

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

/**
 * @param {*} n Samples per layer
 * @param {*} m Bumps per layer
 */
function bumps(n, m) {
  let a = new Array(n).fill(0);
  for (let i = 0; i < m; ++i) a = bump(a, n);
  const interpolator = circleInterpolatorFactory(n / 2, n);
  return [...a.map((e, i) => interpolator(i) * e), interpolator(n)];
}

const zScale = scaleOrdinal({
  domain: keys,
  range: ['#ff777f', '#580040', '#9cfaff', '#bc5399', '#c84653'],
});

const patternScale = scaleOrdinal({
  domain: keys,
  range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent'],
});

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
      seriesData.map(series => (
        <g key={`series-${series.key}`}>
          <Spring to={{ d: path(series) }} onRest={toggle}>
            {tweened => (
              <React.Fragment>
                <path d={tweened.d} fill={zScale(series.key)} />
                <path d={tweened.d} fill={`url(#${patternScale(series.key)})`} />
              </React.Fragment>
            )}
          </Spring>
        </g>
      ))
    )}
  />
);

export default class Vickating extends React.Component {
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
    /*
    const normalizeScale = scaleLinear({
      domain: [0, 20],
      range: [0, 1],
      clamp: true,
    });
    const data = transpose(keys.map(() => bumps(samplesPerLayer, bumpsPerLayer).map((e, i) => {
      const interpolator = circleInterpolatorFactory(0.5, 0.5);
      const ret = interpolator(normalizeScale(i)) * e;
      // console.log("INTERP", i, normalizeScale(i), interpolator(normalizeScale(i)));
      return ret;
    }))); */
    const data = transpose(keys.map(() => bumps(samplesPerLayer, bumpsPerLayer)));
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
            const radius = width / 4;
            const xScale = scaleLinear({
              domain: [0, samplesPerLayer],
              range: [radius, 3 * radius],
              clamp: true,
            });

            const yScale = scaleLinear({
              domain: [-30, 50],
              range: [radius, 3 * radius],
            });
            return (
              <Svg width={width} height={height} onClick={this.toggle}>
                <PatternCircles id="mustard" height={40} width={40} radius={5} fill="#9cfaff" complement />
                <PatternWaves id="cherry" height={12} width={12} fill="transparent" stroke="#d0ffff" strokeWidth={1} complement />
                <PatternCircles id="navy" height={60} width={60} radius={10} fill="white" complement />
                <PatternCircles id="transparent" height={60} width={60} radius={10} fill="transparent" complement />

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
