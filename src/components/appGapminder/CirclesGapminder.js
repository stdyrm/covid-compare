import React, { useState, useEffect, useContext, useRef, Fragment } from 'react';
import * as d3 from 'd3';

// context
import { statesContext } from '../../context/statesContext';

export const CirclesGapminder = (props) => {
	const { data, dayCounter, setDayCounter } = props;
	const { xParam, yParam, cParam } = props.chartParams;
	const { xScale, yScale, colorScale } = props.scales;

	const {selectedStates} = useContext(statesContext);

	const circlesRef = useRef(null);

	const bisectDay = d3.bisector(d => d[0]).left

	const renderCircles = () => {
		const circle = d3.select(circlesRef.current).selectAll('circle')
			.data(dataAt(dayCounter))
			.join('circle')
				.attr('r', d => selectedStates[d.state].population / 1500000)
				.attr('cx', d => xScale(d[xParam]))
				.attr('cy', d => yScale(d[yParam]))
				.attr('fill', d => colorScale(selectedStates[d.state][cParam]))
				.attr('stroke', 'black')
				// .call(circle => circle.append("title"))
				// 	.text(d => [d.state, d[xParam]].join("\n"))
	};

	function dataAt(day) {
		return data.map(d => ({
			state: d.state,
			region: d.region,
			[xParam]: valueAt(d[xParam], day),
			[yParam]: valueAt(d[yParam], day)
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

	useEffect(() => {
		if (data) {
			renderCircles();
		};
	}, [dayCounter, xScale, yScale])

	return (
		<>
			<g ref={circlesRef}></g>
		</>
	)
};