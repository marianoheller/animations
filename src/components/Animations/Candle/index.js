/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import { curveBasis } from '@vx/curve';
import { ParentSize } from '@vx/responsive';
import { transpose } from 'd3-array';
import { Spring } from 'react-spring';
import { Stack } from '@vx/shape';
import { scaleLinear, scaleOrdinal } from '@vx/scale';

import CandleSvg from './candle';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(#8e7dff, #3b29ff);
`;

const Svg = styled.svg`
  cursor: pointer;
  @media (max-width: 680px) {
    height: ${props => `${props.width}`}
  }
`;

const range = n => Array.from(Array(n), (d, i) => i);
const circleInterpolatorFactory = (r, b) => t => Math.sqrt(((r ** 2) - ((t - b) ** 2)));

const numLayers = 8;
const samplesPerLayer = 5;
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
  const interpolator = circleInterpolatorFactory(n / 2, n / 2);
  const ret = [...a.map((e, i) => interpolator(i) * e), interpolator(n)];
  return ret;
}

const zScale = scaleOrdinal({
  domain: keys,
  range: ['#ffd500', '#ff9900', '#ff5900', '#d10007', '#4f0003', '#ff1500'],
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
        <g
          key={`series-${series.key}`}
        >
          <Spring to={{ d: path(series) }} onRest={toggle}>
            {tweened => (
              <React.Fragment>
                <path d={tweened.d} fill={zScale(series.key)} />
              </React.Fragment>
            )}
          </Spring>
        </g>
      ))
    )}
  />
);

export default class Candle extends React.Component {
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
    const data = transpose(keys.map(() => bumps(samplesPerLayer, bumpsPerLayer)))
      .map((s, i) => {
        const total = s.reduce((a, b) => a + b);
        const scale = scaleLinear({
          domain: [0, total],
          range: [
            0,
            circleInterpolatorFactory(samplesPerLayer / 2, samplesPerLayer / 2)(i),
          ],
          clamp: true,
        });
        return s.map(e => scale(e));
      });
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
            const radius = 100;
            const xScale = scaleLinear({
              domain: [0, samplesPerLayer],
              range: [(width / 2) - radius, (width / 2) + radius],
              clamp: true,
            });

            const yScale = scaleLinear({
              domain: [0, samplesPerLayer / 2],
              range: [height / 2, (height / 2) + radius],
            });
            return (
              <React.Fragment>
                <Svg
                  width={width}
                  height={height}
                  onClick={this.toggle}
                  style={{
                    transform: 'rotate(-90deg)',
                  }}
                >
                  <CandleSvg x={-275} />
                  <g onClick={() => this.forceUpdate()} onTouchStart={() => this.forceUpdate()}>
                    <Graph data={data} xScale={xScale} yScale={yScale} toggle={this.toggle} />
                  </g>
                </Svg>
              </React.Fragment>
            );
          }}
        </ParentSize>
      </Container>
    );
  }
}
