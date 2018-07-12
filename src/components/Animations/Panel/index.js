/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Keyframes, Transition, animated, config } from 'react-spring';
import delay from '../../../delay';

import * as SC from './StyledComponents';

config.panel = { tension: 200, friction: 20 };


const Sidebar = Keyframes.Spring({
  open: { to: { x: 0 }, config: config.default },
  close: async (call) => {
    await delay(300);
    await call({ to: { x: -100 }, config: config.gentle });
  },
});

const Content = Keyframes.Trail({
  open: {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1 },
  },
  close: {
    to: { x: -100, opacity: 0 },
  },
});

const formItems = [
  <SC.Avatar src="https://semantic-ui.com/images/avatar2/large/matthew.png" />,
  <SC.Input prefix={<SC.Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
  <SC.Input
    prefix={<SC.Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
    type="password"
    placeholder="Password"
  />,
  <React.Fragment>
    <SC.Checkbox>Remember me</SC.Checkbox>
    <SC.LoginFormForgot>Forgot password</SC.LoginFormForgot>
  </React.Fragment>,
  <React.Fragment>
    <SC.LoginFormButton>Log in</SC.LoginFormButton>
  </React.Fragment>,
  <React.Fragment>
    Or <a>register now!</a>
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
    const state = open ? 'open' : 'close';

    const toogleIcons = {
      open: style => <SC.ToggleIcon style={{ ...style }} type="menu-fold" onClick={this.toggle} />,
      close: style => <SC.ToggleIcon style={{ ...style }} type="menu-unfold" onClick={this.toggle} />,
    };

    return (
      <SC.Container>
        <Transition from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
          {toogleIcons[state]}
        </Transition>
        <Sidebar native state={state}>
          {({ x }) => (
            <SC.SidebarContent
              style={{
                willChange: 'transform',
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
                    <SC.FormItem middle={i === 0}>{item}</SC.FormItem>
                  </animated.div>
                ))}
              </Content>
            </SC.SidebarContent>
          )}
        </Sidebar>
      </SC.Container>
    );
  }
}

export default Panel;
