import { useEffect, useContext } from "react";
import * as d3 from "d3";

// context
import { dataContext } from "../../context/dataContext";

// constants
import { date } from "../util/constants";

export const MouseMove = props => {
    const {
        focus,
        overlay,
        linesStates,
        selectedStates,
		chartParams,
		scales
    } = props;
	const { xScale, yScale } = scales;
    const { dataStates } = useContext(dataContext);

	const selectedYParam = chartParams.yParam.selected;

    useEffect(() => {
        if (overlay && selectedStates) {
            overlay.on("mousemove", mousemove);

            let frozen = false;

            function mousemove() {
                let x0 = xScale.invert(d3.mouse(this)[0]);
                const bisectDate = d3.bisector(d => d.dayOfOutbreak).left;

                Object.keys(selectedStates)
                    .sort()
                    .filter(s => selectedStates[s].selected === true)
                    .forEach(state => {
                        const dataEachState = dataStates.filter(
                            d => d.state === state
                        );
                        const stateHTML = selectedStates[state].htmlFormat;
                        const i = bisectDate(dataEachState, x0, 0);

                        let dataEachStateRangeY = dataEachState[i]
                            ? dataEachState[i][selectedYParam]
                            : dataEachState[dataEachState.length - 1][
                                  selectedYParam
                              ];
                        let dataEachStateRangeX = dataEachState[i]
                            ? dataEachState[i].dayOfOutbreak
                            : dataEachState[dataEachState.length - 1]
                                  .dayOfOutbreak;
                        let dataEachStateRangeDate = dataEachState[i]
                            ? date.dateFormatter(dataEachState[i].date)
                            : date.dateFormatter(
                                  dataEachState[dataEachState.length - 1].date
                              );
                        let dataEachStateRangeCases = dataEachState[i]
                            ? dataEachState[i].cases
                            : dataEachState[dataEachState.length - 1].cases;

                        const toggleFreeze = () => {
                            frozen = !frozen;
                        };

                        overlay.on("click", toggleFreeze);

                        if (!frozen) {
                            focus
                                .select(`#circle-${stateHTML}`)
                                .attr("cy", yScale(dataEachStateRangeY))
                                .attr("cx", xScale(dataEachStateRangeX));

                            focus
                                .select(`#d-label-${stateHTML}`)
                                .text(
                                    `${
                                        selectedStates[state].abbreviation
                                    } => Day ${dataEachStateRangeX} (${dataEachStateRangeDate
                                        .split("-")
                                        .slice(0, 2)
                                        .join("-")})`
                                )
                                .attr("fill", selectedStates[state].color);

                            focus
                                .select(`#d-label-b-${stateHTML}`)
                                .text(d =>
                                    selectedYParam === "casesPerThousand"
                                        ? `${dataEachStateRangeY.toFixed(
                                              3
                                          )} (${dataEachStateRangeCases.toLocaleString()} tot.)`
										: selectedYParam === "casesPerThousand"
										? `${dataEachStateRangeY.toLocaleString()} new (${dataEachStateRangeCases.toLocaleString()} tot.)`
										: `${dataEachStateRangeCases.toLocaleString()} tot.`
                                )
                                .attr("fill", selectedStates[state].color);
                        }
                    });
            }
        }
    }, [linesStates]);

    return null;
};
