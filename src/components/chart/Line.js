import React, { useState, useContext, useEffect } from "react";
import * as d3 from "d3";

// functions
import { MouseMove } from "../util/MouseMove";

// data
import stateInfo from "../../data/stateInfo.json";

// context
import { dataContext } from "../../context/dataContext";
import { statesContext } from "../../context/statesContext";
import { themeContext } from '../../context/themeContext';

// constants
import { bounded } from "../util/constants";

const Line = ({ focus, overlay }) => {
  const { selectedStates } = useContext(statesContext);
  const { dataStates } = useContext(dataContext);
  const { theme, setTheme } = useContext(themeContext);
  const [linesStates, setLinesStates] = useState([]);

  const clearFocus = () => {
    focus.selectAll(['circle', 'text']).attr('display', 'none')
  };

  useEffect(() => {
    return () => clearFocus();
  }, [selectedStates]);

  useEffect(() => {
    if (dataStates.length > 0) {

      // Scales
      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(dataStates, (d) => d.dayOfOutbreak))
        .range([0, bounded.width]);
      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(dataStates, (d) => d.casesPerThousand))
        .range([bounded.height, 0]);

      // Lines
      const lineGenerator = d3
        .line()
        .x((d) => xScale(d.dayOfOutbreak))
        .y((d) => yScale(d.casesPerThousand));

      const linesObject = {};

      Object.keys(selectedStates)
        .sort()
        .filter((s) => selectedStates[s].selected === true)
        .forEach((state, i) => {
          const dataEachState = dataStates.filter((d) => d.state === state);
          const stateHTML = stateInfo[state].htmlFormat;

          // Line label placement
          const lastDayOfOutbreak =
            dataEachState[dataEachState.length - 1].dayOfOutbreak;
          const lastCasesPerThousand =
            dataEachState[dataEachState.length - 1].casesPerThousand;

          // markers for lockdown date
          const lockdownDate = selectedStates[state].lockdown;
          const lockdownDay =
            (lockdownDate - dataEachState[0].date) /
              (24 * 60 * 60 * 10 * 10 * 10) +
            1;
          const lockdownDayDatum = dataEachState.filter(
            (d) => d.dayOfOutbreak === lockdownDay
          )[0];

          if (lockdownDayDatum) {
            linesObject[state] = {
              line: lineGenerator(dataEachState),
              lineLabelX: xScale(lastDayOfOutbreak) + 3,
              lineLabelY: yScale(lastCasesPerThousand),
              lockdownMarkerX: xScale(lockdownDay),
              lockdownMarkerY: yScale(lockdownDayDatum.casesPerThousand),
            };
          } else {
            linesObject[state] = {
              line: lineGenerator(dataEachState),
              lineLabelX: xScale(lastDayOfOutbreak) + 3,
              lineLabelY: yScale(lastCasesPerThousand),
            };
          }

          // for mousemove
          let xShift = 0;
          let yShift = 0;

          if (i > 12) {
            xShift += 200;
            yShift = 13 * 40;
          }

          focus
            .append("circle")
            .attr("id", `circle-${stateHTML}`)
            .attr("r", 5)
            .attr("fill", selectedStates[state].color)
			.attr("stroke", theme.palette.text.primary);

          if (i < 26) {
            focus
              .append("text")
              .attr("id", `d-label-${stateHTML}`)
              .attr("x", 10 + xShift)
              .attr("y", 10 + i * 40 - yShift)
			  .style("font-size", 12)
			  .style("font-family", "ralewaylight, Helvetica, Arial, sans-serif");

            focus
              .append("text")
              .attr("id", `d-label-b-${stateHTML}`)
              .attr("x", 10 + xShift)
              .attr("y", 25 + i * 40 - yShift)
			  .style("font-size", 12)
			  .style("font-family", "ralewaylight, Helvetica, Arial, sans-serif");
          }
        });
      setLinesStates(linesObject);
	}
	
	return () => {
		focus.selectAll('circle').remove();
		focus.selectAll('text').remove();
	}
  }, [dataStates, selectedStates, theme]);

  return (
    <>
      <MouseMove focus={focus} overlay={overlay} linesStates={linesStates} />
      {dataStates.length > 0 ? (
        Object.keys(linesStates)
          .sort()
          .map((state, i) => {
            const stateHTML = stateInfo[state].htmlFormat;

            return (
              <g key={i} id={`bounds-render-${stateHTML}`}>
                <path
                  fill="none"
				  stroke={selectedStates[state].color}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  d={linesStates[state].line}
                />
                <circle
                  id="line-marker-lockdown"
                  r={4}
                  fill={
                    linesStates[state].lockdownMarkerX
                      ? selectedStates[state].color
                      : "none"
                  }
                  cx={linesStates[state].lockdownMarkerX}
                  cy={linesStates[state].lockdownMarkerY}
                />
                <text
                  id={`line-label-${stateHTML}`}
				  className="line-label"
				  style={{fill: theme.palette.text.primary, fontSize: "14px", fontFamily: "ralewaylight, Helvetica, Arial, sans-serif"}}
                  x={linesStates[state].lineLabelX}
                  y={linesStates[state].lineLabelY}
                >
                  {selectedStates[state].abbreviation}
                </text>
              </g>
            );
          })
      ) : (
        <g></g>
      )}
    </>
  );
};

export { Line };
