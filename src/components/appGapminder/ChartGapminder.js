import React, { useState, useEffect, useContext, useRef } from 'react';
import * as d3 from 'd3';

// context
import { dataContext } from '../../context/dataContext';
import { statesContext } from '../../context/statesContext';

// components
import { CirclesGapminder } from './CirclesGapminder';

// constants
import { dimensions, bounded } from '../util/constants';

// data
import stateInfo from '../../data/stateInfo.json';

// Styles
import { makeStyles } from '@material-ui/core/styles';

const { width, height, margin } = dimensions

// // temp
// const bounded = {
// 	height: 600,
// 	width: window.innerWidth * .9
// }

export const ChartGapminder = (props) => {
	const {data} = props;
	const {dataStates} = useContext(dataContext);
	const {selectedStates} = useContext(statesContext);
	const [scales, setScales] = useState(null);

	const yAxisRef = useRef(null);
	const xAxisRef = useRef(null);

	// define scales
	useEffect(() => {
		if (dataStates) {
			// Scales
			const xScale = d3.scaleLinear()
				.domain(d3.extent(dataStates, d => d.casesPerThousand))
				.range([0, width]);
			const yScale = d3.scaleLinear()
				.domain(d3.extent(dataStates, d => d.deathsPerThousand))
				.range([height, 0]);
			const colorScale = d3.scaleOrdinal()
				.domain(["Northeast", "Midwest", "South", "West"])
				.range(["blue", "yellow", "green", "red"])

			setScales({
				xScale: xScale,
				yScale: yScale,
				colorScale: colorScale
			});
	
			// Axes
			const yAxisGenerator = d3.axisLeft().scale(yScale);
			const xAxisGenerator = d3.axisBottom().scale(xScale);
			d3.select(xAxisRef.current).call(xAxisGenerator);
			d3.select(yAxisRef.current).call(yAxisGenerator);
		}

	}, [dataStates]);

	return (
		<>
			<svg className="wrapper" height={height} width={width}>
				<g className="bounds" transform={`translate(${margin.left}, ${margin.top})`} height={height} width={width}>
					<g ref={xAxisRef} transform={`translate(0,${bounded.height})`}/>
					<g ref={yAxisRef} />
					{data && scales ? <CirclesGapminder data={data} scales={scales} /> : <></>}
				</g>
			</svg>
		</>
	)
};
