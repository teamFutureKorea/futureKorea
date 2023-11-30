import React, { useEffect, useCallback } from "react";
import * as d3 from "d3";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/actions/SearchAction";

const WordCloud: React.FC<{ keywords: d3.SimulationNodeDatum[] }> = ({
  keywords,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = useCallback((keyword : string) => {
    dispatch(setSearch(keyword));
    navigate("/list");
  }, [dispatch, navigate]);
  const createWordCloud = useCallback((wordsData: d3.SimulationNodeDatum[]) => {
    const svgWidth = window.innerWidth;
    const svgHeight = window.innerHeight;
    const svg = d3
    .select("#wordCloud")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${svgWidth * 0.4}, ${svgHeight * 0.5}) scale(1)`);
    svg.select("g")
      .attr("width", "100%")
      .attr("height", "100%")

    

    const radiusX = svgWidth * 0.3; // 타원의 x 반지름을 더 크게 조절
    const radiusY = svgHeight * 0.4; // 타원의 y 반지름을 더 크게 조절

    const wordElements = svg
      .selectAll("text")
      .data(wordsData)
      .enter()
      .append("text")
      .style("font-size", (d: any) => d.size + "px")
      .style("font-weight", 900)
      .style("fill", () => "#FFFFFF")
      .style("stroke", "#000000") // 외각선 색상을 검은색으로 설정
      .style("stroke-width", 1) // 외각선의 두께를 조절
      .text((d: any) => d.text)
      .attr("transform", function (d, i) {
        const angle = (i / wordsData.length) * 2 * Math.PI;
        const x = radiusX * Math.cos(angle);
        const y = radiusY * Math.sin(angle);
        return `translate(${x},${y})`;
      })
      .on("click", (d)=>handleSearch(d.target.textContent));

    d3
      .forceSimulation(wordsData)
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d: any) => d.size + 2)
          .iterations(5)
          .strength(0.5)
      )
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.05))
      .on("tick", ticked);

    function ticked() {
      wordElements.attr("transform", (d: any) => {
        const tx = d.x * (radiusX / 100); // x 좌표를 타원의 x 반지름에 비례하도록 조절
        const ty = d.y * (radiusY / 100); // y 좌표를 타원의 y 반지름에 비례하도록 조절
        return `translate(${tx},${ty})`;
      });
    }

    window.addEventListener("resize", function () {
      wordElements.attr("transform", (d: any) => {
        const tx = d.x * (radiusX / 100); // x 좌표를 타원의 x 반지름에 비례하도록 조절
        const ty = d.y * (radiusY / 100); // y 좌표를 타원의 y 반지름에 비례하도록 조절
        return `translate(${tx},${ty})`;
      });
    });
  }, [handleSearch]);

  useEffect(() => {
    if(keywords && keywords.length !== 0){
      createWordCloud(keywords);
    }
  }, [createWordCloud, keywords]);

  return <Container id="wordCloud" className="wordCloudContainer"></Container>;
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  &.wordCloudContainer {
    overflow: hidden;
  }
`;
export default WordCloud;
