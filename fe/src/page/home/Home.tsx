import React from 'react';
import { styled } from 'styled-components';
import WordCloud from './WordCloud'; // WordCloud 컴포넌트 파일의 경로에 따라 수정
import * as d3 from 'd3';

const Home = () => {
  const futureKeywords : d3.SimulationNodeDatum[] = [
    { text: 'innovation', size: 20 }as d3.SimulationNodeDatum,
    { text: 'automation', size: 18 }as d3.SimulationNodeDatum,
    { text: 'AI', size: 22 }as d3.SimulationNodeDatum,
    { text: 'robotics', size: 15 }as d3.SimulationNodeDatum,
    { text: 'future', size: 30 }as d3.SimulationNodeDatum,
    { text: 'digital', size: 25 }as d3.SimulationNodeDatum,
    { text: 'environment', size: 18 }as d3.SimulationNodeDatum,
    { text: 'space', size: 20 }as d3.SimulationNodeDatum,
    { text: 'climate', size: 28 }as d3.SimulationNodeDatum,
  ];

  return (
    <Container>
      <WordCloud keywords={futureKeywords} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-size: cover;
  background-image: url("/배경.png");
`;

export default Home;
