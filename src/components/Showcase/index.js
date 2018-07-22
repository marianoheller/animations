import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import routes from '../../routes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-family: 'Galada', cursive;
`;

const AnimationContainers = styled.div`
  margin: 3rem 25% 0 25%;
  display: grid;
  grid-template-columns: repeat(2, 50%);
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
            <Animation src={`/gifs/${r.title.toLowerCase()}.gif`} />
          </Link>
        ))}
      </AnimationContainers>
    </Container>
  );
}
