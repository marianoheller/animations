import React, { Component } from 'react';
import styled from 'styled-components';
import { curveBasis } from '@vx/curve';
import { AreaClosed } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { ParentSize } from '@vx/responsive';
import { LinearGradient } from '@vx/gradient';
import { genDateValue } from '@vx/mock-data';
import { extent, max } from 'd3-array';
import { Spring, config } from 'react-spring';

const data = genDateValue(10);
const x = d => d.date;
const y = d => d.value;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(#00ffee, #0325ff);
`;

const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;  
`;

const Svg = styled.svg`
  position: absolute;
  bottom: 0;
`;

/* eslint-disable-next-line */
const Graph = ({ interpolate, data, xScale, yScale }) => (
  <AreaClosed
    data={data.map((d, i) => ({ ...d, value: interpolate[i] }))}
    xScale={xScale}
    yScale={yScale}
    x={x}
    y={y}
    strokeWidth={2}
    stroke="url(#linGrad)"
    fill="url(#linGrad)"
    curve={curveBasis}
  />
);

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
      <Container>
        <ParentSize>
          {({ width, height }) => {
            const yMax = max(data, y);
            const yScale = scaleLinear({ range: [height, height / 2], domain: [0, yMax], nice: true });
            const xScale = scaleTime({ range: [0, width], domain: extent(data, x) });
            const interpolate = data.map(() => Math.random() * yMax);
            const extra = { data, xScale, yScale };
            return (
              <SvgWrapper onClick={this.toggle}>
                <Svg width={width} height={height} stroke="none" strokeOpacity={0}>
                  <LinearGradient id="linGrad" from="#03ff35" to="#fbff00" />
                  <g>
                    <Spring config={config.wobbly} to={{ interpolate }} onRest={this.toggle} {...extra}>
                      {springProps => <Graph {...springProps} />}
                    </Spring>
                  </g>
                </Svg>
              </SvgWrapper>
            );
          }}
        </ParentSize>
      </Container>
    );
  }
}
