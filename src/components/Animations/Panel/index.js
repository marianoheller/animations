/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import { Keyframes, animated, config } from 'react-spring';
import { Avatar, Form, Icon, Input, Button, Checkbox } from 'antd';
import delay from 'delay';

config.panel = { tension: 200, friction: 20 };

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffe1ff;
`;

const Sidebar = Keyframes.Spring({
  open: { to: { x: 0 }, config: config.default },
  close: async (call) => {
    await delay(400);
    await call({ to: { x: -100 }, config: config.gentle });
  },
});

const Content = Keyframes.Trail({
  open: {
    delay: 100,
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1 },
    config: config.default,
  },
  close: {
    delay: 25,
    to: { x: -100, opacity: 0 },
  },
});

const formItems = [
  <Avatar src="https://semantic-ui.com/images/avatar2/large/elyse.png" />,
  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
  <React.Fragment>
    <Checkbox>Remember me</Checkbox>
    <a className="login-form-forgot" href="#">Forgot password</a>
    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
    Or <a href="#">register now!</a>
  </React.Fragment>,
];

class Panel extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { open } = this.state;
    const state = open ? 'open' : 'false';
    return (
      <StyledContainer onClick={this.toggle}>
        <button onClick={this.toggle}>ICON</button>
        <Sidebar native state={state}>
          {({ x }) => (
            <animated.div
              styled={{
                'will-change': 'transform',
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
              }}
            >
              <Content native keys={formItems.map((_, i) => `formItems${i}`)} config={config.panel} state={state}>
                {formItems.map((item, i) => ({ x, ...props }) => (
                  <animated.div
                    style={{
                      transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                      ...props,
                    }}
                  >
                    <Form.Item className={i === 0 ? 'middle' : ''}>{item}</Form.Item>
                  </animated.div>
                ))}
              </Content>
            </animated.div>
          )}
        </Sidebar>
      </StyledContainer>
    );
  }
}

export default Panel;
