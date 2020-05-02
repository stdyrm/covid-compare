import React, { useState, useEffect, useContext, useRef } from 'react';
import * as d3 from 'd3';

// context
import { dataContext } from '../../context/dataContext';
import { statesContext } from '../../context/statesContext';

// components
import { CirclesGapminder } from './CirclesGapminder';

// data
import stateInfo from '../../data/stateInfo.json';

// Styles
import { IconButton, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';



export const ChartGapminder = (props) => {
	const { data } = props;
	const { xParam, yParam, cParam } = props.chartParams;
	const { wrapperWidth, wrapperHeight, marginTop, marginBottom, marginLeft, marginRight } = props.wrapper;
	const { width, height } = props.bounded;

	const {dataStates} = useContext(dataContext);
	const {selectedStates} = useContext(statesContext);
	const [scales, setScales] = useState(null);
	const [dayCounter, setDayCounter] = useState(1);
	const [animate, setAnimate] = useState(false);

	const yAxisRef = useRef(null);
	const xAxisRef = useRef(null);

	const handleAnimate = () => {	
		setAnimate(!animate);
	};

	const handleDayCounter = (e, newVal) => {
		console.log(newVal);
		setDayCounter(newVal);
	}

	// define scales
	useEffect(() => {
		if (dataStates) {
			console.log(d3.extent(dataStates, d => d[xParam]))
			console.log(d3.extent(dataStates, d => d[yParam]))
			// Scales
			const xScale = d3.scaleLinear()
				.domain(d3.extent(dataStates, d => d[xParam]))
				.range([0, width]);
			const yScale = d3.scaleLinear()
				.domain(d3.extent(dataStates, d => d[yParam]))
				.range([height, 0]);
			const colorScale = d3.scaleOrdinal()
				.domain(["Northeast", "Midwest", "South", "West"])
				.range(["blue", "yellow", "green", "red"])
				// .domain(["republican", "democrat"])
				// .range(["red", "blue"])

			setScales({
				xScale: xScale,
				yScale: yScale,
				colorScale: colorScale
			});
	
			// Axes
			const yAxisGenerator = d3.axisLeft().scale(yScale);
			const xAxisGenerator = d3.axisBottom().scale(xScale);
			d3.select(xAxisRef.current).call(xAxisGenerator)
				.call(axis => axis.append('text')
					.attr('x', width)
					.attr('y', 40)
					.attr('text-anchor', 'end')
					.attr('fill', 'white')
					.text(xParam));

			d3.select(yAxisRef.current).call(yAxisGenerator)
				.call(axis => axis.append('text')
					.attr('x', 0)
					.attr('y', -40)
					.attr('text-anchor', 'end')
					.attr('transform', 'rotate(-90)')
					.attr('fill', 'white')
					.text(yParam));
		}
	}, [dataStates]);

	return (
		<>
			<svg className="wrapper" height={wrapperHeight} width={wrapperWidth}>
				<g className="bounds" transform={`translate(${marginLeft}, ${marginTop})`}>
					<g ref={xAxisRef} transform={`translate(0, ${height})`} />
					<g ref={yAxisRef} />
					{data && scales ? <CirclesGapminder {...props} scales={scales} dayCounter={dayCounter} setDayCounter={setDayCounter} /> : <></>}
				</g>
			</svg>
			<IconButton onClick={handleAnimate}>
				{animate ? <PauseIcon /> : <PlayArrowIcon />}
			</IconButton>
			<Slider 
				// defaultValue={1}
				value={dayCounter}
				valueLabelDisplay="auto"
				step={1}
				marks
				min={1}
				max={60}
				onChange={handleDayCounter}
				style={{width: width, marginLeft: marginLeft}}
			/>
		</>
	)
};
