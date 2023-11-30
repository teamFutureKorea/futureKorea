import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import WordCloud from './WordCloud'; // WordCloud 컴포넌트 파일의 경로에 따라 수정
import * as d3 from 'd3';
import axios from 'axios';

const Home = () => {
  const [futureKeywords,setFutureKeywords] = useState<d3.SimulationNodeDatum[]>([]);
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND}/gpt/keyword/top`)
      .then(({data})=>{
        const temp : d3.SimulationNodeDatum[] = [];
        data.data.forEach((e:String)=>temp.push({ text: e, size: 20 }as d3.SimulationNodeDatum));
        setFutureKeywords(temp);
      })
      .catch(err=>console.log(err));
  },[])

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
