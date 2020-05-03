import React, { useState, useEffect, useContext, useRef } from 'react';
import * as d3 from 'd3';

// context
import { statesContext } from '../../context/statesContext';

// style 
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	circle: {
		stroke: 'none',
		opacity: .8
	},
	circleSelected: {
		stroke: theme.palette.text.primary,
		strokeWidth: 2,
		opacity: 1,
	}
}));

export const CirclesGapminder = (props) => {
	const { data, dayCounter } = props;
	const { xParam, yParam, cParam } = props.chartParams;
	const { xScale, yScale, colorScale } = props.scales;
	const [selectedCircles, setSelectedCircles] = useState([]);

	// styles
	const classes = useStyles();
	const theme = useTheme();

	const {selectedStates} = useContext(statesContext);

	const circlesRef = useRef(null);

	const bisectDay = d3.bisector(d => d[0]).left;

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
			let selected = [...selectedCircles];
			const circle = d3.select(circlesRef.current).selectAll('circle')
			.data(dataAt(dayCounter), d => d)
			.join(
				enter => enter.append('circle')
					.attr('r', d => selectedStates[d.state].population / 1000000)
					.attr('cx', d => xScale(d[xParam]))
					.attr('cy', d => yScale(d[yParam]))
					.attr('fill', d => colorScale(selectedStates[d.state][cParam]))
					.attr('stroke', theme.palette.text.primary)
					.attr('id', d => `circle-${selectedStates[d.state].htmlFormat}`)
					.attr('class', d =>  
						selected.includes(d.state) ? classes.circleSelected : classes.circle
					)
					.call(circle => circle.append('title')
						.text(d => [
							d.state,
							`Cases/1000: ${d.casesPerThousand && d.casesPerThousand.toFixed(2)}`,
							`Deaths/1000: ${d.deathsPerThousand && d.deathsPerThousand.toFixed(2)}`
						].join("\n"))
					)
					.call(circle => {
						circle.transition()
						.duration(250)
					})
			);

			circle.on('mouseover', d => { 
				d3.select(`#circle-${selectedStates[d.state].htmlFormat}`)
					.attr('stroke', theme.palette.primary.main)
					.attr('opacity', 1)
					.attr('cursor', 'pointer')
					.call(circle => {
						circle.transition()
						.duration(250)
					})
			});

			circle.on('mouseout', d => { 
				d3.select(`#circle-${selectedStates[d.state].htmlFormat}`)
					.attr('stroke', theme.palette.text.primary)
					.attr('opacity', .8)
					.call(circle => {
						circle.transition()
						.duration(250)
					})
			});

			circle.on('click', d => { 
				if (selected.includes(d.state)) {
					const i = selected.indexOf(d.state);
					selected.splice(i,1);
					d3.select(`#circle-${selectedStates[d.state].htmlFormat}`)
						.attr('class', classes.circle)
				} else {
					selected.push(d.state);
					d3.select(`#circle-${selectedStates[d.state].htmlFormat}`)
						.attr('class', classes.circleSelected)
				}
				setSelectedCircles(selected);
			});
		};
	}, [dayCounter, xScale, yScale]);

	return (
		<>		
			<g ref={circlesRef} />
		</>
	)
};