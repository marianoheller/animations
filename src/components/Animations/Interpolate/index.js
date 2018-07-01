import React from 'react';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';
import { interpolate } from 'flubber';
import { GradientPinkRed } from '@vx/gradient';
import { ParentSize } from '@vx/responsive';

import pathsRef from './paths';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #70b3ff;
`;

const SvgWrapper = styled.div`
  cursor: pointer;
`;

class Interpolate extends React.Component {
  constructor() {
    super();
    this.state = {
      paths: Object.values(pathsRef),
      index: 0,
    };
    this.goNext = this.goNext.bind(this);
  }

  goNext() {
    this.setState(state => ({ index: state.index + 1 >= state.paths.length ? 0 : state.index + 1 }));
  }

  render() {
    const { paths, index } = this.state;
    const interpolator = interpolate(paths[index], paths[index + 1] || paths[0], { maxSegmentLength: 0.1 });
    return (
      <Container>
        <ParentSize>
          {({ width, height }) => (
            <SvgWrapper onClick={this.goNext}>
              <svg width={width} height={height} viewBox="-9 -20 40 64" stroke="none" strokeOpacity={0}>
                <GradientPinkRed id="gradient" />
                <g fill="url(#gradient)">
                  <Spring reset native from={{ t: 0 }} to={{ t: 1 }} onRest={this.goNext}>
                    {({ t }) => <animated.path d={t.interpolate(interpolator)} />}
                  </Spring>
                </g>
              </svg>
            </SvgWrapper>
          )}
        </ParentSize>
      </Container>
    );
  }
}

export default Interpolate;
