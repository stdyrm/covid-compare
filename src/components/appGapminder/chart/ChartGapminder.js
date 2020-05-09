import React, { useState, useEffect, useContext, useRef } from "react";
import * as d3 from "d3";

// context
import { dataContext } from "../../../context/dataContext";

// components
import { CirclesGapminder } from "./CirclesGapminder";
import { OpacitySlider } from "../interface/OpacitySlider";
import { DayCounterSlider } from "../interface/DayCounterSlider";

// style
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    axes: {
        color: theme.palette.text.primary,
    },
    legend: {
        fontWeight: 700,
        fontSize: ".8rem",
    },
}));

const cParamCategories = {
    region: ["Northeast", "Midwest", "South", "West"],
    division: [
        "New England",
        "Mid-Atlantic",
        "East North Central",
        "West North Central",
        "South Atlantic",
        "East South Central",
        "West South Central",
        "Mountain",
        "Pacific",
    ],
    governor: ["Republican", "Democrat", "n/a"],
};

export const ChartGapminder = props => {
    const { data, selector, wrapper, bounded } = props;
    const { xParam, yParam, cParam } = selector;
    const {
        wrapperWidth,
        wrapperHeight,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
    } = wrapper;
	const { width, height } = bounded;

    const { dataStates } = useContext(dataContext);
    const [scales, setScales] = useState(null);
	const [dayCounter, setDayCounter] = useState(1);
	const [opacityNotSel, setOpacityNotSel] = useState(0.6);

    const classes = useStyles();

    const boundsRef = useRef(null);
    const yAxisRef = useRef(null);
    const xAxisRef = useRef(null);
    const legendRef = useRef(null);

    const renderChart = () => {
        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(dataStates, d => d[xParam.selected]))
            .range([0, width]);
        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(dataStates, d => d[yParam.selected]))
            .range([height, 0]);
        let colorScale;

        if (cParam.selected === "region") {
            colorScale = d3
                .scaleOrdinal()
                .domain(cParamCategories.region)
                .range(d3.schemePaired);
        } else if (cParam.selected === "division") {
            colorScale = d3
                .scaleOrdinal()
                .domain(cParamCategories.division)
                .range(d3.schemePaired);
        } else if (cParam.selected === "governor") {
            colorScale = d3
                .scaleOrdinal()
                .domain(cParamCategories.governor)
                .range(["#B61515", "#2E84D5", "#009C72"]);
        }

        setScales({
            xScale: xScale,
            yScale: yScale,
            colorScale: colorScale,
        });

        // Axes
        const yAxisGenerator = d3.axisLeft().scale(yScale);
        const xAxisGenerator = d3.axisBottom().scale(xScale);

        const xAxis = d3
            .select(xAxisRef.current)
            .call(xAxisGenerator)
            .call(axis => axis.append("text").attr("class", "xLabel"));

        xAxis
            .selectAll(".xLabel")
            .data(xParam.selected, d => d)
            .join("text")
            .attr("x", width)
            .attr("y", 40)
            .attr("class", "xLabel")
            .attr("text-anchor", "end")
            .attr("fill", "white")
            .text(xParam.selected);

        const yAxis = d3
            .select(yAxisRef.current)
            .call(yAxisGenerator)
            .call(axis => axis.append("text").attr("class", "yLabel"));

        yAxis
            .selectAll(".yLabel")
            .data(yParam.selected, d => d)
            .join("text")
            .attr("x", 0)
            .attr("y", -40)
            .attr("class", "yLabel")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("fill", "white")
            .text(yParam.selected);

        // legend
        d3.select(legendRef.current)
            .selectAll("text")
            .data(cParamCategories[cParam.selected], d => d)
            .join(
                enter =>
                    enter
                        .append("text")
                        .attr("x", "1rem")
                        .attr("y", -1000)
                        .attr("fill", d => colorScale(d))
                        .attr("text-anchor", "start")
                        .text(d => d)
                        .call(enter =>
                            enter
                                .transition()
                                .duration(750)
                                .attr("y", (d, i) => -height + 10 + 20 * i)
                        ),
                update =>
                    update
                        .append("text")
                        .attr("fill", d => colorScale(d))
                        .attr("text-anchor", "start")
                        .attr("y", 60)
                        .text(d => d)
                        .call(update => update.transition().duration(750)),
                exit =>
                    exit
                        .attr("fill", "gray")
                        .attr("text-anchor", "start")
                        .text(d => d)
                        .call(exit =>
                            exit
                                .transition()
                                .duration(750)
                                .attr("y", 0)
                                .remove()
                        )
            );
    };

    useEffect(() => {
        if (dataStates) {
            renderChart();
        }
    }, [dataStates, selector]);

    useEffect(() => {
		d3.select(".counter-display")
			.join("text")
			.text(`Day ${dayCounter}`);
    }, [dayCounter]);

    return (
        <>
            <svg
                id="gapminder"
                className="wrapper"
                height={wrapperHeight}
                width={wrapperWidth}
            >
                <g
                    ref={boundsRef}
                    className="bounds"
                    transform={`translate(${marginLeft}, ${marginTop})`}
                >
                    <g
                        ref={xAxisRef}
                        transform={`translate(0, ${height})`}
                        className={classes.axes}
                    />
                    <g ref={yAxisRef} className={classes.axes} />
                    <g
                        ref={legendRef}
                        transform={`translate(0, ${height})`}
                        className={classes.legend}
                    />
                    {data && scales ? (
                        <CirclesGapminder
                            {...props}
                            scales={scales}
                            dayCounter={dayCounter}
                            opacityNotSel={opacityNotSel}
                        />
                    ) : (
                        <></>
                    )}
                </g>
            </svg>
            <div style={{ marginLeft: marginLeft, width: width }}>
                <div>
					<DayCounterSlider 
						dayCounter={dayCounter}
						setDayCounter={setDayCounter}
					/>
                </div>
				<div>
					<OpacitySlider 
						opacityNotSel={opacityNotSel} 
						setOpacityNotSel={setOpacityNotSel}/>
				</div>
            </div>
        </>
    );
};
