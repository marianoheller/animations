import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import routes from '../../routes';

const Container = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 2rem;
  background: linear-gradient( #ebd8eb, #ededd9);
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2.5rem;
  color: #57014a;
  font-family: 'Galada', cursive;

  @media (max-width: 650px) {
    font-size: 2rem;
  }
`;

const AnimationContainers = styled.div`
  margin-top: 6rem;
  max-width: 600px;
  display: grid;
  grid-template-columns: repeat(2, 50%);

  @media (max-width: 650px) {
    margin-top: 2rem;
    max-width: 300px;
    grid-template-columns: repeat(1, 100%);
  }
`;

const Animation = styled.img`
`;

export default function Showcase() {
  return (
    <Container>
      <Title>Animations Showcase</Title>
      <AnimationContainers>
        {routes.map(r => (
          <Link key={r.path} to={r.path}>
            <Animation src={`gifs/${r.title.toLowerCase()}.gif`} />
          </Link>
        ))}
      </AnimationContainers>
    </Container>
  );
}
