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
  background-color: #ffe1ff;
`;

const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: #ffe1ff;
  overflow: hidden;
`;

const range = n => Array.from(Array(n), (d, i) => i);
const numLayers = 10;
const samplesPerLayer = 25;
const bumpsPerLayer = 20;

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
  range: ['#ff777f', '#580040', '#9cfaff', '#bc5399', '#c84653'],
});

const patternScale = scaleOrdinal({
  domain: keys,
  range: ['mustard', 'cherry', 'navy', 'transparent', 'transparent', 'transparent', 'transparent'],
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
            const xScale = scaleLinear({
              range: [0, width],
              domain: [0, samplesPerLayer - 1],
            });
            const yScale = scaleLinear({
              range: [height, 0],
              domain: [-30, 50],
            });
            return (
              <SvgWrapper onClick={this.toggle}>
                <svg width={width} height={height}>
                  <PatternCircles id="mustard" height={40} width={40} radius={5} fill="#9cfaff" complement />
                  <PatternWaves
                    id="cherry"
                    height={12}
                    width={12}
                    fill="transparent"
                    stroke="#d0ffff"
                    strokeWidth={1}
                    complement
                  />
                  <PatternCircles id="navy" height={60} width={60} radius={10} fill="white" complement />
                  <PatternCircles id="transparent" height={60} width={60} radius={10} fill="transparent" complement />
                  <g onClick={() => this.forceUpdate()} onTouchStart={() => this.forceUpdate()}>
                    <rect x={0} y={0} width={width} height={height} fill="#ffe1ff" />
                    <Graph data={data} xScale={xScale} yScale={yScale} toggle={this.toggle} />
                  </g>
                </svg>
              </SvgWrapper>
            );
          }}
        </ParentSize>
      </Container>
    );
  }
}
