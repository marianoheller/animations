import React from 'react';
import styled from 'styled-components';
import { Spring, Keyframes, animated } from 'react-spring';
import { ParentSize } from '@vx/responsive';
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


class Trail extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      items: ['item1', 'item2', 'item3', 'item4', 'item5'],
    };
  }

  render() {
    const { items } = this.state;
    const Content = ({
      radians,
      color,
      width,
      height,
    }) => (
      items.map((_, i) => (
        <animated.svg
          key={i}
          style={{
            width: width / items.length,
            height: height / items.length,
            willChange: 'transform',
            transform: radians.interpolate(r => (
              // eslint-disable-next-line no-mixed-operators
              `translate3d(0, ${100 * Math.sin(r + (i * 2 * Math.PI / items.length))}px, 0)`
            )),
          }}
          viewBox="0 0 400 400"
        >
          <animated.g fill={color} fillRule="evenodd">
            <path id="path-1" d="M20,380 L380,380 L380,380 L200,20 L20,380 Z" />
          </animated.g>
        </animated.svg>
      ))
    );

    const repeatScript = async (next) => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await next(Spring, {
          from: { radians: 0, color: '#247BA0' },
          to: { radians: 2 * Math.PI },
        });
      }
    };

    return (
      <Container>
        <ParentSize>
          {(sizeProps) => {
            if (sizeProps.width === 0 && sizeProps.height === 0) {
              /* eslint-disable no-param-reassign */
              sizeProps.width = window.innerWidth;
              sizeProps.height = window.innerHeight;
              /* eslint-enable no-param-reassign */
            }
            return (
              <SvgWrapper>
                <Keyframes
                  reset
                  native
                  keys={items}
                  impl={TimingAnimation}
                  config={{ duration: 2000, easing: Easing.linear }}
                  script={repeatScript}
                >
                  {keyFrameProps => Content({ ...keyFrameProps, ...sizeProps })}
                </Keyframes>
              </SvgWrapper>
            );
          }}
        </ParentSize>
      </Container>
    );
  }
}

export default Trail;
