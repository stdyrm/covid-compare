import React, { useState, useContext, useEffect, useRef } from "react";
import * as d3 from "d3";

// functions
import { MouseMove } from "../util/MouseMove";

// context
import { dataContext } from "../../context/dataContext";
import { statesContext } from "../../context/statesContext";

// style
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

export const Line = props => {
    const {
        chartParams,
		labelParams,
        focus,
		overlay,
        selectedStates,
        wrapperDim,
		boundedDim,
    } = props;
    const { xParam, yParam } = chartParams;
    const {
        wrapperWidth,
        wrapperHeight,
        marginLeft,
        marginRight,
        marginBottom,
        marginTop,
    } = wrapperDim;
    const { width, height } = boundedDim;

    // context
    const { dataStates } = useContext(dataContext);
	const { infoStates } = useContext(statesContext);

    // style
    const theme = useTheme();
	const mqMedium = useMediaQuery(theme.breakpoints.up("md"));
	const mqLarge = useMediaQuery(theme.breakpoints.up("lg"));

	const [linesStates, setLinesStates] = useState([]);

    useEffect(() => {
        if (selectedStates && dataStates.length > 0) {
			// Scales
            const xScale = d3
                .scaleLinear()
                .domain(d3.extent(dataStates, d => d.dayOfOutbreak))
                .range([0, width]);
            const yScale = d3
                .scaleLinear()
                .domain(d3.extent(dataStates, d => d.casesPerThousand))
                .range([height, 0]);

            // Lines
            const lineGenerator = d3
                .line()
                .x(d => xScale(d.dayOfOutbreak))
                .y(d => yScale(d.casesPerThousand));

            const linesObject = {};

            Object.keys(selectedStates)
                .sort()
                .filter(s => selectedStates[s].selected === true)
                .forEach((state, i) => {
                    const dataEachState = dataStates.filter(
                        d => d.state === state
                    );
                    const stateHTML = infoStates[state].htmlFormat;
                    // Line label placement
                    const lastDayOfOutbreak =
                        dataEachState[dataEachState.length - 1].dayOfOutbreak;
                    const lastCasesPerThousand =
                        dataEachState[dataEachState.length - 1]
                            .casesPerThousand;

                    // markers for lockdown date
                    const lockdownDate = selectedStates[state].lockdown;
                    const lockdownDay =
                        (lockdownDate - dataEachState[0].date) /
                            (24 * 60 * 60 * 10 * 10 * 10) +
                        1;
                    const lockdownDayDatum = dataEachState.filter(
                        d => d.dayOfOutbreak === lockdownDay
                    )[0];

                    if (lockdownDayDatum) {
                        linesObject[state] = {
                            line: lineGenerator(dataEachState),
                            lineLabelX: xScale(lastDayOfOutbreak) + 3,
                            lineLabelY: yScale(lastCasesPerThousand),
                            lockdownMarkerX: xScale(lockdownDay),
                            lockdownMarkerY: yScale(
                                lockdownDayDatum.casesPerThousand
                            ),
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

                    if (i > 11) {
						if (mqLarge) {
							xShift = 180;
							yShift = 12 * 40;
						} else if (mqMedium) {
							xShift = 120;
							yShift = 12 * 40;
						} 
					}

                    focus
                        .append("circle")
                        .attr("id", `circle-${stateHTML}`)
                        .attr("r", 5)
						.attr("fill", selectedStates[state].color)
                        .attr("stroke", theme.palette.text.primary);

                    if (mqMedium ? i < 24 : i < 12) {
                        focus
                            .append("text")
                            .attr("id", `d-label-${stateHTML}`)
                            .attr("x", 10 + xShift)
                            .attr("y", d => mqMedium ? 10 + i * 40 - yShift : 10 + i * 30)
                            .style("font-size", d => mqLarge ? ".8rem" : ".6rem")
                            .style(
                                "font-family",
                                "ralewaymedium, Helvetica, Arial, sans-serif"
                            );

						focus
							.append("text")
                            .attr("id", `d-label-b-${stateHTML}`)
                            .attr("x", 10 + xShift)
                            .attr("y", d => mqMedium ? 25 + i * 40 - yShift : 25 + i * 30)
                            .style("font-size", d => mqLarge ? ".8rem" : ".6rem")
                            .style(
                                "font-family",
                                "ralewaymedium, Helvetica, Arial, sans-serif"
							);
                    }
                });
            setLinesStates(linesObject);
        }

        return () => {
            focus.selectAll("circle").remove();
            focus.selectAll("text").remove();
        };
	}, [dataStates, selectedStates, theme]);

    return (
        <>	
            <MouseMove
                focus={focus}
				overlay={overlay}
				linesStates={linesStates}
                {...props}
            />
            {dataStates.length > 0 ? (
                Object.keys(linesStates)
                    .sort()
                    .map((state, i) => {
                        const stateHTML = infoStates[state].htmlFormat;

                        return (
							<>
                            <g key={i} id={`bounds-render-${stateHTML}`}>
                                <path
                                    fill="none"
                                    stroke={selectedStates[state].color}
                                    strokeWidth={2.5}
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
                                    style={{
                                        fill: theme.palette.text.primary,
                                        fontSize: "14px",
                                        fontFamily:
                                            "ralewaymedium, Helvetica, Arial, sans-serif",
                                    }}
                                    x={linesStates[state].lineLabelX}
                                    y={linesStates[state].lineLabelY}
                                >
                                    {selectedStates[state].abbreviation}
                                </text>
                            </g>
							</>
                        );
                    })
            ) : (
                <g></g>
            )}
        </>
    );
};
