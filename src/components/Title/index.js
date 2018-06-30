import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleWrapper = styled.div`
  font-family: 'Galada', cursive;
  user-select: none;
  cursor: default;
  font-size: 2rem;
  z-index: 10;
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

export default function Title({ title }) {
  return (
    <TitleWrapper>
      {title}
    </TitleWrapper>
  );
}

Title.propTypes = {
  title: PropTypes.string,
};

Title.defaultProps = {
  title: '',
};
