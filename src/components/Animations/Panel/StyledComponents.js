/* eslint-disable react/prop-types */
import 'antd/dist/antd.css';
import React from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components';
import {
  Avatar as __Avatar,
  Form as __Form,
  Icon as __Icon,
  Input as __Input,
  Button,
  Checkbox as __Checkbox,
} from 'antd';


export const Container = styled.div`
width: 100%;
height: 100%;
background: #2b4b64;
`;

export const ToggleIcon = styled(__Icon)`
  position: absolute;
  margin: 40px;
  color: ${({ type }) => (type === 'menu-fold' ? '#40a9ff' : '#dfdfdf')};
  z-index: 100;
  font-size: 2em;
  cursor: pointer;
`;

export const Icon = styled(__Icon)``;

export const Avatar = styled(__Avatar)`
  width: 150px !important;
  height: 150px !important;
  line-height: 150px !important;
  border-radius: 50% !important;
  font-size: 3em !important;
`;

export const FormItem = styled(__Form.Item)`
  display: ${({ middle }) => (middle ? 'flex' : 'inherit')} !important;
  justify-content: ${({ middle }) => (middle ? 'center' : 'inherit')} !important;
  text-align: center;
`;

export const Input = styled(__Input)``;

export const Checkbox = styled(__Checkbox)`
  float: left;
`;

export const SidebarContent = styled(animated.div)`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 400px;
  background: white;
  padding: 40px;
  padding-top: 60px;
  font-size: 15px;
`;

export const LoginFormForgot = styled.a`
  float: right;
`;

export const LoginFormButton = styled(props => (
  <Button type="primary" htmlType="submit" {...props} />
))`
  width: 100%;
`;
