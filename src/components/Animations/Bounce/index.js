import React from 'react';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';
import { ParentSize } from '@vx/responsive';


const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffe1ff;
`;

const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
`;


/* eslint-disable-next-line */
const Ball = ({ rx, ry, height }) => {
  return (
    <ellipse
      cx="200"
      cy="200"
      rx={rx}
      ry={ry}
      fill="black"
      stroke="black"
      strokeWidth="2px"
      style={{
        willChange: 'transform',
        transform: `translate3d(0, ${height}px, 0)`,
      }}
    />
  );
};


class Bounce extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      toggle: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    const { toggle } = this.state;
    /* const paths = Object.values(pathsRefs);
    const interpolator = interpolate(paths[index], paths[index + 1] || paths[0], { maxSegmentLength: 0.1 }); */
    return (
      <Container>
        <ParentSize>
          {({ width, height }) => (
            <SvgWrapper onClick={this.toggle}>
              <animated.svg width={width} height={height} stroke="none" strokeOpacity={0}>
                <g>
                  <Spring
                    from={{ rx: 100, ry: 100 }}
                    to={{
                      rx: toggle ? 100 : 120,
                      ry: toggle ? 100 : 75,
                      height: toggle ? 0 : 100,
                    }}
                    onRest={this.toggle}
                  >
                    {springProps => <Ball {...springProps} />}
                  </Spring>
                </g>
              </animated.svg>
            </SvgWrapper>
          )}
        </ParentSize>
      </Container>
    );
  }
}

export default Bounce;
