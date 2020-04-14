import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { saveSvgAsPng } from 'save-svg-as-png';

// Components
import { Line } from './Line';

// Context
import { dataContext } from '../../context/dataContext';

// constants
import { dimensions, bounded } from '../util/constants';

// Styles
import { IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import '../../styles/styles.css';
import { theme } from '../../styles/theme';

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

    // const saveImage = () => {
    //     saveSvgAsPng(document.querySelector("#chart"), "covid-19_chart.png",
    //     {
    //         backgroundColor: theme.palette.background.default
    //     },
    //     {
    //         modifyCss() {
    //             return {backgroundColor: 'red'};
    //         }
    //     }
    //     )
    // };

    useEffect(() => {
        // Scales
        const xScale = d3.scaleLinear()
            .domain(d3.extent(dataStates, d => d.dayOfOutbreak))
            .range([0, bounded.width]);
        const yScale = d3.scaleLinear()
            .domain(d3.extent(dataStates, d => d.casesPerThousand))
            .range([bounded.height, 0]);

        // Axes
        const yAxisGenerator = d3.axisLeft().scale(yScale);
        const xAxisGenerator = d3.axisBottom().scale(xScale);
        d3.select(xAxisRef.current).call(xAxisGenerator);
        d3.select(yAxisRef.current).call(yAxisGenerator);
    }, [dataStates, window.innerWidth]);

    return (
        <div height={height} width={width}>
            <svg 
                id="chart" 
                height={height} 
                width={width} 
                ref={svgRef}
            >
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