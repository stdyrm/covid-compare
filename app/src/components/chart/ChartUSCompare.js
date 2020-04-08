import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Components
import { Line } from './Line';

// Context
import { dataContext } from '../../context/dataContext';

// constants
import { dimensions, bounded } from '../util/constants';

// Styles
import '../../styles/styles.css';

const { width, height, margin } = dimensions;

const ChartUSCompare = () => {
    const {dataStates} = useContext(dataContext);
    const yAxisRef = useRef(null);
    const xAxisRef = useRef(null);
    const svgRef = useRef(null);
    const boundsRef = useRef(null);

    const focus = d3.select(boundsRef.current).append('g')
        .attr('class', 'focus')
        .style('display', 'none');

    const overlay = d3.select(boundsRef.current).append('rect')
        .attr('class', 'overlay')
        .attr('width', bounded.width)
        .attr('height', bounded.height)
        .on('mouseover', () => focus.style('display', null))
        .on('mouseout', () => focus.style('display', 'none'));

    useEffect(() => {
        // Scales
        const xScale = d3.scaleLinear()
            // .domain(d3.extent(dataStates, d => d.dayOfOutbreak))
            .domain([d3.min(dataStates, d => d.dayOfOutbreak), d3.max(dataStates, d => d.dayOfOutbreak)])
            .range([0, bounded.width]);
        const yScale = d3.scaleLinear()
            // .domain(d3.extent(dataStates, d => d.casesPerThousand))
            .domain([d3.min(dataStates, d => d.casesPerThousand), d3.max(dataStates, d => d.casesPerThousand)])
            .range([bounded.height, 0]);

        // Axes
        const yAxisGenerator = d3.axisLeft().scale(yScale);
        const xAxisGenerator = d3.axisBottom().scale(xScale);
        d3.select(xAxisRef.current).call(xAxisGenerator);
        d3.select(yAxisRef.current).call(yAxisGenerator);
    }, [dataStates]);

    return (
        <div height={height} width={width}>
            <svg height={height} width={width} ref={svgRef}>
                <text
                    className="title"
                    textAnchor="middle"
                    fill="gray"
                    transform={`translate (${margin.left + bounded.width / 2}, ${margin.top / 2})`}
                >
                    COVID-19 US State Comparison
                </text>
                <text 
                    className="axes-label"
                    textAnchor="middle"
                    transform={`translate(${margin.left + bounded.width / 2}, ${bounded.height + margin.top + 40})`}
                >
                    Day of Outbreak
                </text>
                <text 
                    className="axes-label" 
                    textAnchor="middle" 
                    transform={`translate(${width - bounded.width - margin.right - 40}, ${bounded.height / 2}) rotate(-90)`}
                >
                    Cases per 1000 people
                </text>
                <circle 
                    r={4}
                    cx={margin.left + 4}
                    cy={height - 55}/>
                <text
                    className="footnote"
                    x={margin.left + 12}
                    y={height - 50}
                    fontSize={10}
                >
                    Line marking indicates day of lockdown order/advisory
                </text>
                <text 
                    className="footnote"
                    x={margin.left}
                    y={height - 35}
                    fontSize={10}
                >
                    *Data from The New York Times, based on reports from state and local health agencies. 
                </text>
                <text 
                    className="footnote"
                    x={margin.left}
                    y={height - 20}
                    fontSize={10}
                >
                    *Population data from US Census Bureau (2019). 
                </text>
                <text 
                    className="footnote"
                    x={margin.left}
                    y={height - 5}
                    fontSize={10}
                >
                    *WA: although 2/27 is counted as 'Day 1,' WA had an isolated case on 1/21.
                </text>
                <g id="bounds" transform={`translate(${margin.left}, ${margin.top})`} ref={boundsRef}>
                    <g ref={yAxisRef} id="y-axis" />
                    <g ref={xAxisRef} id="x-axis" transform={`translate(0,${bounded.height})`} />
                    <Line focus={focus} overlay={overlay}/>
                </g>
            </svg>
        </div>
    )
};

export { ChartUSCompare };