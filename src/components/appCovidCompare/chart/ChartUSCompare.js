import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";

// Components
import { Line } from "./Line";

// Context
import { dataContext } from "../../../context/dataContext";

// Styles
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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
        fontSize: ".6rem",
    },
}));

export const ChartUSCompare = props => {
	const { wrapperDim, boundedDim } = props;
	const { wrapperWidth, wrapperHeight, marginLeft, marginRight, marginBottom, marginTop } = wrapperDim;
	const { width, height } = boundedDim;
	const { dataStates } = useContext(dataContext);

	const theme = useTheme();
	let classes = useStyles();

    const yAxisRef = useRef(null);
    const xAxisRef = useRef(null);
    const svgRef = useRef(null);
	const boundsRef = useRef(null);

	const getFocus = () => {
		return d3
			.select(boundsRef.current)
			.append("g")
			.attr("class", "focus")
			.style("display", "none");
	};
	const focus = getFocus();

	const getOverlay = () => {
		return d3
			.select(boundsRef.current)
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
        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(dataStates, d => d.dayOfOutbreak))
            .range([0, width]);
        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(dataStates, d => d.casesPerThousand))
            .range([height, 0]);

        // Axes
        const yAxisGenerator = d3.axisLeft().scale(yScale);
        const xAxisGenerator = d3.axisBottom().scale(xScale);
        d3.select(xAxisRef.current).call(xAxisGenerator);
        d3.select(yAxisRef.current).call(yAxisGenerator);
	}, [dataStates, theme]);

    return (
		<>
            <svg id="covidcompare" height={wrapperHeight} width={wrapperWidth} ref={svgRef}>
                <text
                    className={classes.title}
                    style={{
                        fill: theme.palette.text.primary,
                        fontFamily:
                            "ralewaymedium, Helvetica, Arial, sans-serif",
                    }}
                    textAnchor="middle"
                    transform={`translate (${
                        marginLeft + width / 2
                    }, ${marginTop / 2})`}
                >
                    COVID-19 US State Comparison
                </text>
                <text
                    className={classes.axisLabel}
                    style={{
                        fill: theme.palette.text.primary,
                        fontFamily:
                            "ralewaymedium, Helvetica, Arial, sans-serif",
                    }}
                    textAnchor="middle"
                    transform={`translate(${marginLeft + width / 2}, ${
                        height + marginTop + 40
                    })`}
                >
                    Day of Outbreak
                </text>
                <text
                    className={classes.axisLabel}
                    style={{
                        fill: theme.palette.text.primary,
                        fontFamily:
                            "ralewaymedium, Helvetica, Arial, sans-serif",
                    }}
                    textAnchor="middle"
                    transform={`translate(${
                        marginLeft * .6
                    }, ${height / 2}) rotate(-90)`}
                >
                    Cases per 1000 people
                </text>
                <text
                    className={classes.footnotes}
                    textAnchor="left"
                    style={{
                        fill: theme.palette.text.primary,
                        fontFamily:
                            "ralewaymedium, Helvetica, Arial, sans-serif",
                    }}
                    transform={`translate(${marginLeft}, ${
                        height + marginTop + 60
                    })`}
                >
                    *Data from The New York Times, based on reports from state
                    and local health agencies.
                </text>
                <text
                    className={classes.footnotes}
                    textAnchor="left"
                    style={{
                        fill: theme.palette.text.primary,
                        fontFamily:
                            "ralewaymedium, Helvetica, Arial, sans-serif",
                    }}
                    transform={`translate(${marginLeft}, ${
                        height + marginTop + 80
                    })`}
                >
                    **Population data from US Census Bureau (2019).
                </text>
                <text
                    className={classes.footnotes}
                    textAnchor="left"
                    style={{
                        fill: theme.palette.text.primary,
                        fontFamily:
                            "ralewaymedium, Helvetica, Arial, sans-serif",
                    }}
                    transform={`translate(${marginLeft}, ${
                        height + marginTop + 100
                    })`}
                >
                    ***2/27 is earliest possible 'Day 1,' since prior cases were
                    isolated and may skew insights of "community spread"
                </text>
                <text
                    className={classes.footnotes}
                    textAnchor="left"
                    style={{
                        fill: theme.palette.text.primary,
                        fontFamily:
                            "ralewaymedium, Helvetica, Arial, sans-serif",
                    }}
                    transform={`translate(${marginLeft}, ${
                        height + marginTop + 120
                    })`}
                >
                    †Legend will display up to 24 states (alphabetical order)
                </text>
                <g
                    id="bounds"
                    transform={`translate(${marginLeft}, ${marginTop})`}
                    ref={boundsRef}
                >
                    <g
                        ref={yAxisRef}
                        id="y-axis"
                        style={{
                            color: theme.palette.text.primary,
                            fontFamily:
                                "ralewaymedium, Helvetica, Arial, sans-serif",
                        }}s
                    />
                    <g
                        ref={xAxisRef}
                        id="x-axis"
                        transform={`translate(0,${height})`}
                        style={{
                            color: theme.palette.text.primary,
                            fontFamily:
                                "ralewaymedium, Helvetica, Arial, sans-serif",
                        }}
                    />
                    <Line focus={focus} overlay={overlay} {...props} />
                </g>
            </svg>
		</>
    );
};
