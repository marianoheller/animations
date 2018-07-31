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
  background: linear-gradient( #EEEEEE, #DDDDDD);
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
  margin-top: 4rem;
  max-width: 610px;
  background-color: rgba(0,0,0,0);
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-gap: 0.5rem;

  @media (max-width: 650px) {
    margin-top: 2rem;
    max-width: 300px;
    grid-template-columns: repeat(1, 100%);
  }
`;

const AnimationWrapper = styled.div`
  perspective: 100;
  background-color: rgba(0,0,0,0);
  transition: all 1.0s linear;
  &:hover {
    transform: rotateX(10deg);
  }
`;

const Animation = styled.img`
  transform-style: preserve-3d;
  transition: all 0.6s linear;
  &:hover {
    filter: brightness(80%);
  }
`;

export default function Showcase() {
  return (
    <Container>
      <Title>Animations</Title>
      <AnimationContainers>
        {routes.map(r => (
          <Link key={r.path} to={r.path}>
            <AnimationWrapper>
              <Animation src={`gifs/${r.title.toLowerCase()}.gif`} />
            </AnimationWrapper>
          </Link>
        ))}
      </AnimationContainers>
    </Container>
  );
}
