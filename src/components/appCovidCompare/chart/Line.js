import React, { useState, useContext, useEffect, Fragment } from "react";
import * as d3 from "d3";

// functions
import { MouseMove } from "../../util/MouseMove";

// context
import { dataContext } from "../../../context/dataContext";
import { statesContext } from "../../../context/statesContext";

// style
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

export const Line = props => {
    const {
        focus,
		overlay,
        selectedStates,
		bounds,
		selectedYParam
    } = props;
    const { width, height } = bounds;

    // context
    const { dataStates } = useContext(dataContext);
	const { infoStates } = useContext(statesContext);

    // style
    const theme = useTheme();
	const mqMedium = useMediaQuery(theme.breakpoints.up("md"));
	const mqLarge = useMediaQuery(theme.breakpoints.up("lg"));

	const [linesStates, setLinesStates] = useState([]);

	const filterStates = statesObject => {
		let filtered = Object.keys(statesObject)
			.sort()
			.filter(s => statesObject[s].selected === true);
		return filtered;
	};

    useEffect(() => {
        if (selectedStates && dataStates.length > 0) {
			// Scales
            const xScale = d3
                .scaleLinear()
                .domain(d3.extent(dataStates, d => d.dayOfOutbreak))
                .range([0, width]);
				
			const yScale = d3
                .scaleLinear()
                .domain(d3.extent(dataStates, d => d[selectedYParam]))
                .range([height, 0]);
				
			const lineGenerator = d3
                .line()
                .x(d => xScale(d.dayOfOutbreak))
                .y(d => yScale(d[selectedYParam]));

            const linesObject = {};

			const filtered = filterStates(selectedStates)
			filtered
                .forEach((state,i) => {
                    const dataEachState = dataStates.filter(
                        d => d.state === state
					);
					
                    // Line label placement
                    const lastDayOfOutbreak =
                        dataEachState[dataEachState.length - 1].dayOfOutbreak;
                    const lastCasesDatum =
                        dataEachState[dataEachState.length - 1]
                            [selectedYParam];
					
					linesObject[state] = {
						line: lineGenerator(dataEachState),
						lineLabelX: xScale(lastDayOfOutbreak) + 3,
						lineLabelY: yScale(lastCasesDatum),
					};
                });
            setLinesStates(linesObject);
        };
	}, [dataStates, selectedStates, selectedYParam, theme]);

	useEffect(() => {
		if (selectedStates) {
			const filtered = filterStates(selectedStates);

			filtered
				.forEach((state, i) => {
					const stateHTML = infoStates[state].htmlFormat;
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
		}
		return () => {
			focus.selectAll("circle").remove();
			focus.selectAll("text").remove();
        };
	}, [linesStates]);

    return (
        <>	
            <MouseMove
                focus={focus}
				overlay={overlay}
				linesStates={linesStates}
				bounds={bounds}
				selectedYParam={selectedYParam}
                {...props}
            />
            {dataStates.length > 0 ? (
                Object.keys(linesStates)
                    .sort()
                    .map((state, i) => {
                        const stateHTML = infoStates[state].htmlFormat;

                        return (
							<Fragment key={state}>
								<g id={`bounds-render-${stateHTML}`}>
									<path
										fill="none"
										stroke={selectedStates[state].color}
										strokeWidth={2.5}
										strokeLinejoin="round"
										strokeLinecap="round"
										d={linesStates[state].line}
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
							</Fragment>
                        );
                    })
            ) : (
                <g></g>
            )}
        </>
    );
};
