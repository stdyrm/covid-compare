import React, { useState, useContext, useEffect, Fragment } from "react";
import { line } from "d3";

// functions
import { MouseMove } from "../../util/MouseMove";

// context
import { dataContext } from "../../../context/dataContext";
import { statesContext } from "../../../context/statesContext";

// style
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

export const Line = props => {
	const { focus, overlay, selectedStates, bounds, chartParams, scales } = props;
	const { width, height } = bounds;
	const { xScale, yScale } = scales;
	const selectedYParam = chartParams.yParam.selected;

    // context
    const { dataStates } = useContext(dataContext);
    const { infoStates } = useContext(statesContext);

    // style
    const theme = useTheme();

    const [linesStates, setLinesStates] = useState([]);

	const filterStates = async selectedStates => {
        let filtered = Object.keys(selectedStates)
            .sort()
			.filter(s => selectedStates[s].selected === true);
        return filtered;
	};
	
	const generateLine = async filtered => {
		const lineGenerator = line()
			.x(d => xScale(d.dayOfOutbreak))
			.y(d => yScale(d[selectedYParam]));

		const lineData = {};

		// const filtered = filterStates(selectedStates);
		filtered.forEach(state => {
			const dataEachState = dataStates.filter(d => d.state === state);

			// Line label placement
			const lastDayOfOutbreak =
				dataEachState[dataEachState.length - 1].dayOfOutbreak;
			const lastCasesDatum =
				dataEachState[dataEachState.length - 1][selectedYParam];

			lineData[state] = {
				line: lineGenerator(dataEachState),
				lineLabelX: xScale(lastDayOfOutbreak) + 3,
				lineLabelY: yScale(lastCasesDatum),
			};
		});

		return lineData;
	};

	const generateFocus = async filtered => {
		let xShift = 0;
		let yShift = 0;

		filtered.forEach((state, i) => {
			const stateHTML = infoStates[state].htmlFormat;
			focus
				.append("circle")
				.attr("id", `circle-${stateHTML}`)
				.attr("r", 5)
				.attr("fill", selectedStates[state].color)
				.attr("stroke", theme.palette.text.primary);

			if (i === 0) {
				xShift = 0;
				yShift = 0;
			} else if (i % 4 === 0) {
				xShift += 130;
				yShift = 0;
			} else {
				yShift += 35;
			}
			
			if (xShift + 65 < width) {
				focus
					.append("text")
					.attr("id", `d-label-${stateHTML}`)
					.attr("x", xShift)
					.attr("y", d => 70 + height + yShift)
					.style("font-size", ".75rem")
					.style(
						"font-family",
						"ralewaymedium, Helvetica, Arial, sans-serif"
					);
				focus
					.append("text")
					.attr("id", `d-label-b-${stateHTML}`)
					.attr("x", xShift)
					.attr("y", d => 70 + height + yShift + 15)
					.style("font-size", ".75rem")
					.style(
						"font-family",
						"ralewaymedium, Helvetica, Arial, sans-serif"
					);
			}
		});
	};

	useEffect(() => {
		if (!selectedStates || dataStates.length < 1 || !selectedYParam) return;
		let mounted = true;
		filterStates(selectedStates)
			.then(filtered => generateLine(filtered))
			.then(lineData => {
				if (mounted) {
					setLinesStates(lineData)
				}
			});
		
		return () => {
			mounted = false;
			setLinesStates(null);
		}
	}, [dataStates, selectedStates, chartParams, selectedYParam, scales]);

	useEffect(() => {
		if (!selectedStates) return;
		filterStates(selectedStates)
			.then(filtered => generateFocus(filtered));

        return () => {
            focus.selectAll("circle").remove();
            focus.selectAll("text").remove();
        };
	}, [linesStates]);

    return (
		<React.Fragment>
			{dataStates && linesStates && selectedStates &&
				<MouseMove
					focus={focus}
					overlay={overlay}
					linesStates={linesStates}
					bounds={bounds}
					chartParams={chartParams}
					{...props}
			/>}
			{linesStates && selectedStates && (
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
			)}
        </React.Fragment>
    );
};
