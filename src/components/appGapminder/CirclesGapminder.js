import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';
import * as d3 from 'd3';

// context
import { dataContext } from '../../context/dataContext';
import { statesContext } from '../../context/statesContext';

// data
import stateInfo from '../../data/stateInfo.json';
import { GapminderData } from '../dataParams/gapminderData';

export const CirclesGapminder = (props) => {
	const {data} = props;	
	const { xScale, yScale, colorScale } = props.scales;
	console.log(props)

	const {dataStates} = useContext(dataContext);
	const {selectedStates} = useContext(statesContext);

	const circlesRef = useRef(null);

	const bisectDay = d3.bisector(d => d[0]).left

	const renderCircles = () => {
		d3.select(circlesRef.current).selectAll('circle')
			.data(dataAt(1))
			.enter()
			.append('circle')
				.attr('r', d => selectedStates[d.state].population / 1000000)
				.attr('cx', d => xScale(d.casesPerThousand))
				.attr('cy', d => yScale(d.deathsPerThousand))
				// .attr('fill', d => colorScale(selectedStates[d.state].region))
				.style('fill', 'red')
				.style('stroke', 'black')

		function dataAt(day) {
			return data.map(d => ({
				state: d.state,
				region: d.region,
				casesPerThousand: valueAt(d.casesPerThousand, day),
				deathsPerThousand: valueAt(d.deathsPerThousand, day)
			}));
		};

		function valueAt(values, day) {
			const i = bisectDay(values, day, 0, values.length - 1);
			const a = values[i];

			if (i > 0) {
				const b = values[i - 1];
				const t = (day - a[0]) / (b[0] - a[0]);
				return a[1] * (1 - t) + b[1] * t;
			}
			return a[1];
		};
	};

	useEffect(() => {
		if (data) {
			renderCircles();
		}
	}, [xScale, yScale])

	return (
		<>
			<g ref={circlesRef}></g>
		</>
	)
};