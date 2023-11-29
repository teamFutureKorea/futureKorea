import React, { useEffect, useCallback } from "react";
import * as d3 from "d3";
import { styled } from "styled-components";

const WordCloud: React.FC<{ keywords: d3.SimulationNodeDatum[] }> = ({
  keywords,
}) => {
  const createWordCloud = useCallback((wordsData: d3.SimulationNodeDatum[]) => {
    const svgWidth = window.innerWidth * 0.8;
    const svgHeight = window.innerHeight * 0.8;
    const svg = d3
    .select("#wordCloud")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("transform",`translate(${window.innerWidth * 0.1}, ${ window.innerHeight * 0.1})`)
    .append("g")
    .attr("transform", `translate(${svgWidth * 0.4}, ${svgHeight * 0.5}) scale(1)`);
    svg.select("g")
      .attr("width", "100%")
      .attr("height", "100%")

    

    const radiusX = svgWidth * 0.8; // 타원의 x 반지름을 더 크게 조절
    const radiusY = svgHeight * 0.6; // 타원의 y 반지름을 더 크게 조절

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
      .on("click", function (d) {
        alert(d.target.textContent);
      });

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
      .force("x", d3.forceX().strength(0.5))
      .force("y", d3.forceY().strength(0.5))
      .on("tick", ticked);

    function ticked() {
      wordElements.attr("transform", (d: any) => {
        const tx = d.x * (radiusX / 100); // x 좌표를 타원의 x 반지름에 비례하도록 조절
        const ty = d.y * (radiusY / 100); // y 좌표를 타원의 y 반지름에 비례하도록 조절
        return `translate(${tx},${ty})`;
      });
    }

    window.addEventListener("resize", function () {
      wordElements.attr(
        "x",
        (d: any) => Math.random() * (window.innerWidth * 0.8 - d.size)
      );
      wordElements.attr(
        "y",
        (d: any) => Math.random() * (window.innerHeight * 0.8 - d.size)
      );
    });
  }, []);

  useEffect(() => {
    createWordCloud(keywords);
  }, [createWordCloud, keywords]);

  return <Container id="wordCloud"></Container>;
};
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
export default WordCloud;
