import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { select, max, scaleLinear, scaleLog, extent, axisLeft, axisBottom } from "d3";

// Components
import { Line } from "./Line";

// Context
import { dataContext } from "../../../context/dataContext";

// Styles
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	rootSVG: {
		display: "inline-block",
		position: "relative",
		width: "100%",
		verticalAlign: "middle",
		overflow: "hidden",
	},
	bounds: {
		width: props => props.width,
		height: props => props.height,
	},
	title: {
		fill: theme.palette.text.primary,
		fontSize: "1.2rem",
	},
	axes: {
		fill: theme.palette.text.primary,
	},
	axisLabel: {
		fill: theme.palette.text.primary,
		fontSize: ".8rem",
	},
	footnotes: {
		fill: theme.palette.text.primary,
		fontSize: ".6rem",
	},
}));

const ChartCovidCompare = (props) => {
	const { wrapper, bounds, chartParams } = props;
	const { wrapperWidth, wrapperHeight, margin } = wrapper;
    const { width, height } = bounds;
	const { dataStates } = useContext(dataContext);
	
	const selectedYParam = chartParams.yParam.selected;

	const [scales, setScales] = useState(null);
	const classes = useStyles(props);
	const theme = useTheme();

    const yAxisRef = useRef(null);
    const xAxisRef = useRef(null);
    const svgRef = useRef(null);
    const boundsRef = useRef(null);

    const getFocus = () => {
        return select(boundsRef.current)
            .append("g")
            .attr("class", "focus")
            .style("display", "none");
    };

    const focus = getFocus();

    const getOverlay = () => {
        return select(boundsRef.current)
            .append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .attr("opacity", "0")
            .on("mouseover", () => focus.style("display", null));
    };
	const overlay = getOverlay();

	useEffect(() => {
        // Scales
        const xScale = scaleLinear()
            .domain(extent(dataStates, d => d.dayOfOutbreak))
            .range([0, width]);

		const yScale = chartParams.yParam.type === "log"
			? scaleLog()
				.domain([1, 1000000])
				.range([height, 0])
			: scaleLinear()
				.domain([0, max(dataStates, d => d[selectedYParam])])
				.range([height, 0]);
	
		setScales({
			xScale,
			yScale
		});

        // Axes
		const yAxisGenerator = chartParams.yParam.selected === "cases"
			? axisLeft().scale(yScale).ticks(6).tickFormat(t => t.toLocaleString())
			: axisLeft().scale(yScale);
        const xAxisGenerator = axisBottom().scale(xScale);
        select(xAxisRef.current).call(xAxisGenerator);
		select(yAxisRef.current).call(yAxisGenerator);
		
		return () => {
			setScales(null);
		};
    }, [dataStates, chartParams, selectedYParam, height, width]);

    return (
        <>
            <svg
                id="line-app"
                height={wrapperHeight}
                width={wrapperWidth}
                ref={svgRef}
                className={classes.rootSVG}
                viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}
            >
                <g
                    id="bounds"
                    transform={`translate(${margin.left}, ${margin.top})`}
                    ref={boundsRef}
                >
                    <text
                        className={classes.title}
                        style={{
                            fontFamily:
                                "ralewaymedium, Helvetica, Arial, sans-serif",
                        }}
                        textAnchor="middle"
                        x={width / 2}
                        y={-margin.top * 0.5}
                    >
                        COVID-19 US State Comparison
                    </text>
                    <text
                        className={classes.axisLabel}
                        style={{
                            fontFamily:
                                "ralewaymedium, Helvetica, Arial, sans-serif",
                        }}
                        textAnchor="middle"
                        x={width / 2}
                        y={height + 40}
                    >
                        Day of Outbreak
                    </text>
                    <text
                        className={classes.axisLabel}
                        style={{
                            fontFamily:
                                "ralewaymedium, Helvetica, Arial, sans-serif",
                        }}
                        textAnchor="middle"
                        transform={`rotate(-90)`}
                        x={-height / 2}
                        y={-45}
                    >
                        {selectedYParam}
                    </text>
                    <g
                        ref={yAxisRef}
                        id="y-axis"
                        style={{
                            fontFamily:
								"ralewaymedium, Helvetica, Arial, sans-serif",
							color: theme.palette.text.primary,
                        }}
                    />
                    <g
                        ref={xAxisRef}
                        id="x-axis"
                        transform={`translate(0,${height})`}
                        style={{
                            fontFamily:
								"ralewaymedium, Helvetica, Arial, sans-serif",
							color: theme.palette.text.primary,
                        }}
                    />
					{scales &&
						<Line
						focus={focus}
						wrapper={wrapper}
						overlay={overlay}
						scales={scales}
						{...props}
						/>
					}
                </g>
            </svg>
        </>
    );
};

ChartCovidCompare.propTypes = {
    wrapper: PropTypes.object,
    bounds: PropTypes.object,
};

export default ChartCovidCompare;
