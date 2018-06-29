import React, { Component } from 'react';
import styled from 'styled-components';
import { curveBasis } from '@vx/curve';
import { AreaClosed } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { ParentSize } from '@vx/responsive';
import { GradientPinkRed, GradientTealBlue } from '@vx/gradient';
import { genDateValue } from '@vx/mock-data';
import { extent, max } from 'd3-array';
import { Spring } from 'react-spring';

const data = genDateValue(10);
const x = d => d.date;
const y = d => d.value;

const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Svg = styled.svg`
  position: absolute;
  bottom: 0;
`;

const Graph = ({ interpolate, data, xScale, yScale }) => (
  <AreaClosed
    data={data.map((d, i) => ({ ...d, value: interpolate[i] }))}
    xScale={xScale}
    yScale={yScale}
    x={x}
    y={y}
    strokeWidth={2}
    stroke={'url(#PinkRed)'}
    fill={'url(#PinkRed)'}
    curve={curveBasis}
  />
)

export default class Tides extends Component {
  constructor() {
    super();
    this.state = { toggle: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    return (
      <ParentSize>
        {({ width, height }) => {
          const yMax = max(data, y);
          const yScale = scaleLinear({ range: [height, height/2], domain: [0, yMax], nice: true });
          const xScale = scaleTime({ range: [0, width], domain: extent(data, x) });
          const interpolate = data.map(() => Math.random() * yMax);
          const extra = { data, xScale, yScale };
          return (
            <SvgWrapper onClick={this.toggle}>
              <Svg width={width} height={height}>
                <GradientPinkRed id="PinkRed" />
                <GradientTealBlue id="TealBlue" />
                <rect width={width} height={height} fill={'url(#TealBlue)'} />
                <g>
                  <Spring to={{ interpolate }} {...extra} children={Graph} />
                </g>
              </Svg>
            </SvgWrapper>
          )
        }}
      </ParentSize>
    )
  }
}
