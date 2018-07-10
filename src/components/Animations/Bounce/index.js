import React from 'react';
import styled from 'styled-components';
import { ParentSize } from '@vx/responsive';
import { Keyframes, animated } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs';


const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffe1ff;
`;

const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
`;


const animations = {
  bringTop: { to: { ballHeight: 0, ry: 50, rx: 50 } },
  drop: {
    from: { ballHeight: 0, ry: 50, rx: 50 },
    to: { ballHeight: 300, ry: 45, rx: 55 },
  }
};

const Container = Keyframes.Spring(animations);

/* eslint-disable-next-line */
const Ball = ({ ballHeight, rx, ry, height, width }) => (
  <svg height={height} width={width}>
    <animated.ellipse
      cx="200"
      cy="200"
      rx={rx}
      ry={ry}
      fill="#247BA0"
      stroke="#247BA0"
      strokeWidth="2px"
      style={{
        willChange: 'transform',
        transform: ballHeight.interpolate(bH => `translate3d(0, ${bH}px, 0)`)
      }}
    />
  </svg>
)

class Bounce extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      aState: "drop",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { aState } = this.state;
    const possibleStates = [ 'bringToTop', 'drop'];
    const currentIndex = possibleStates.findIndex(p => p === aState);
    this.setState({ aState: (currentIndex + 1) % possibleStates });
  }

  render() {
    const { aState } = this.state;
    return (
      <StyledContainer onClick={this.toggle}>
        <ParentSize >
          {sizeProps => (
            <Container state={aState} reset native impl={TimingAnimation} config={{ duration: 2500, easing: Easing.bounce }}>
              {keyframesProps => <Ball {...sizeProps} {...keyframesProps} />}
            </Container>
          )}
        </ParentSize>
      </StyledContainer>
    );
  }
}

export default Bounce;
