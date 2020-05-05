import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Components
import { Line } from './Line';

// Context
import { dataContext } from '../../context/dataContext';
import { themeContext } from '../../context/themeContext';

// constants
import { dimensions, bounded } from '../util/constants';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const { width, height, margin } = dimensions;

const useStyles = makeStyles((theme) => ({
	title: {
		fill: theme.palette.text.primary,
		fontSize:'2.5vh'
	},
	axes: {
		fill: theme.palette.text.primary,
	},
	axisLabel: {
		fill: theme.palette.text.primary,
		fontSize: '2vh'
	},
	footnotes: {
		fontSize: '10px'
	}
}));

const ChartUSCompare = (props) => {
	const {dataStates} = useContext(dataContext);
	const {theme} = useContext(themeContext);

    const yAxisRef = useRef(null);
    const xAxisRef = useRef(null);
    const svgRef = useRef(null);
	const boundsRef = useRef(null);
	
	let classes = useStyles();

    const focus = d3.select(boundsRef.current).append('g')
        .attr('class', 'focus')
        .style('display', 'none');

    const overlay = d3.select(boundsRef.current).append('rect')
        .attr('class', 'overlay')
        .attr('width', bounded.width)
		.attr('height', bounded.height)
		.attr('opacity', '0')
        .on('mouseover', () => focus.style('display', null))

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
	}, [dataStates, theme]);

    return (
        <div height={height} width={width}>
            <svg 
                id="chart" 
                height={height} 
                width={width} 
                ref={svgRef}
            >
                <text
					className={classes.title}
					style={{fill: theme.palette.text.primary, fontFamily: "ralewaymedium, Helvetica, Arial, sans-serif"}}
					textAnchor="middle"
                    transform={`translate (${margin.left + bounded.width / 2}, ${margin.top / 2})`}
                >
                    COVID-19 US State Comparison
                </text>
                <text 
					className={classes.axisLabel}
					style={{fill: theme.palette.text.primary, fontFamily: "ralewaymedium, Helvetica, Arial, sans-serif"}}
                    textAnchor="middle"
                    transform={`translate(${margin.left + bounded.width / 2}, ${bounded.height + margin.top + 40})`}
                >
                    Day of Outbreak
                </text>
                <text 
					className={classes.axisLabel}
					style={{fill: theme.palette.text.primary, fontFamily: "ralewaymedium, Helvetica, Arial, sans-serif"}}
                    textAnchor="middle"
                    transform={`translate(${width - bounded.width - margin.right - 40}, ${bounded.height / 2}) rotate(-90)`}
                >
                    Cases per 1000 people
                </text>
                <text 
                    className={classes.footnotes}
                    textAnchor="left"
                    style={{fill: theme.palette.text.primary, fontFamily: "ralewaymedium, Helvetica, Arial, sans-serif"}}
                    transform={`translate(${margin.left}, ${bounded.height + margin.top + 60})`}
                >
                    *Data from The New York Times, based on reports from state and local health agencies.
                </text>
                <text 
                    className={classes.footnotes} 
                    textAnchor="left"
                    style={{fill: theme.palette.text.primary, fontFamily: "ralewaymedium, Helvetica, Arial, sans-serif"}}
                    transform={`translate(${margin.left}, ${bounded.height + margin.top + 80})`}
                >
                    **Population data from US Census Bureau (2019).
                </text>
                <text 
                    className={classes.footnotes} 
                    textAnchor="left"
                    style={{fill: theme.palette.text.primary, fontFamily: "ralewaymedium, Helvetica, Arial, sans-serif"}}
                    transform={`translate(${margin.left}, ${bounded.height + margin.top + 100})`}
                >
                    ***2/27 is earliest possible 'Day 1,' since prior cases were isolated and may skew insights of "community spread"
                </text>
				<text 
                    className={classes.footnotes} 
                    textAnchor="left"
                    style={{fill: theme.palette.text.primary, fontFamily: "ralewaymedium, Helvetica, Arial, sans-serif"}}
                    transform={`translate(${margin.left}, ${bounded.height + margin.top + 120})`}
                >
                    †Legend will display up to 24 states (alphabetical order)   
                </text>
                <g id="bounds" transform={`translate(${margin.left}, ${margin.top})`} ref={boundsRef}>
					<g 
						ref={yAxisRef} 
						id="y-axis"
						style={{color: theme.palette.text.primary, fontFamily: "ralewaymedium, Helvetica, Arial, sans-serif"}} />
					<g 
						ref={xAxisRef} 
						id="x-axis" 
						transform={`translate(0,${bounded.height})`}
						style={{color: theme.palette.text.primary, fontFamily: "ralewaymedium, Helvetica, Arial, sans-serif"}} />
                    <Line focus={focus} overlay={overlay}/>
                </g>
            </svg>
        </div>
    )
};

export { ChartUSCompare };