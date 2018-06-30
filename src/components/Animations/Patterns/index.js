import React, { Component } from 'react';
import styled from 'styled-components';
import { ParentSize } from '@vx/responsive';
import { Pattern } from '@vx/pattern';
import { Bar } from '@vx/shape';

const SvgWrapper = styled.div``;

/* eslint-disable-next-line react/prop-types */
const CustomPattern = ({ height, width }) => (
  <Pattern id="customPattern" height={height} width={width}>
    {/* Background */}
    {/* <rect
      width={width}
      height={height}
      fill={background}
    /> */}
    {/* Path */}
    <path
      d={`M ${height / 2}, 0 l 0, ${height}`}
      stroke="red"
      strokeWidth="2px"
      strokeLinecap="square"
      shapeRendering="auto"
    />
  </Pattern>
);

export default class Patterns extends Component {
  render() {
    return (
      <ParentSize>
        {({ width, height }) => (
          <SvgWrapper onClick={this.toggle}>
            <svg width={width} height={height}>
              <CustomPattern width={width} height={height} />
              <rect x={0} y={0} width={width} height={height} fill="#ffe1ff" />
              <g onClick={() => this.forceUpdate()} onTouchStart={() => this.forceUpdate()}>
                {/* <Graph data={data} xScale={xScale} yScale={yScale} /> */}
                <Bar
                  fill="url(#customPattern)"
                  height="100px"
                  width="100px"
                  x={0}
                  y={0}
                  rx={14}
                />
              </g>
            </svg>
          </SvgWrapper>
        )}
      </ParentSize>
    );
  }
}
