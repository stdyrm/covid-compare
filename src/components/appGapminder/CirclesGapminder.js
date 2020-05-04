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
	const { data, dayCounter, selector, scales } = props;
	const { xParam, yParam, zParam, cParam } = selector;
	const { xScale, yScale, colorScale } = scales;

	// context and ref
	const {selectedStates} = useContext(statesContext);
	const circlesRef = useRef(null);

	// new state
	const [selectedCircles, setSelectedCircles] = useState([]);

	// styles
	const classes = useStyles();
	const theme = useTheme();

	const bisectDay = d3.bisector(d => d[0]).left;

	function dataAt(day) {
		return data.map(d => ({
			state: d.state,
			region: d.region,
			[xParam.selected]: valueAt(d[xParam.selected], day),
			[yParam.selected]: valueAt(d[yParam.selected], day)
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
					.attr('r', d => zParam.selected === "population" 
						? selectedStates[d.state][zParam.selected] / 1000000 
						: selectedStates[d.state][zParam.selected] / 100
					)
					.attr('cx', d => xScale(d[xParam.selected]))
					.attr('cy', d => yScale(d[yParam.selected]))
					.attr('fill', d => colorScale(selectedStates[d.state][cParam.selected]))
					.attr('stroke', theme.palette.text.primary)
					.attr('id', d => `circle-${selectedStates[d.state].htmlFormat}`)
					.attr('class', d =>
						selected.includes(d.state) ? classes.circleSelected : classes.circle
					)
					.call(circle => circle.append('title')
						.text(d => [
							d.state,
							`Day ${dayCounter}`,
							xParam.selected === "casesPerThousand" 
								? `Cases/1000: ${d.casesPerThousand && d.casesPerThousand.toFixed(2)}`
								: xParam.selected === "cases"
								? `Cases: ${d.cases && d.cases.toLocaleString()}`
								: xParam.selected === "deathsPerThousand"
								? `Deaths/1000: ${d.deathsPerThousand && d.deathsPerThousand.toFixed(2)}`
								: xParam.selected === "deaths"
								? `Deaths: ${d.deaths && d.deaths.toLocaleString()}`
								: "error",
							yParam.selected === "casesPerThousand" 
								? `Cases/1000: ${d.casesPerThousand && d.casesPerThousand.toFixed(2)}`
								: yParam.selected === "cases"
								? `Cases: ${d.cases && d.cases.toLocaleString()}`
								: yParam.selected === "deathsPerThousand"
								? `Deaths/1000: ${d.deathsPerThousand && d.deathsPerThousand.toFixed(2)}`
								: yParam.selected === "deaths"
								? `Deaths: ${d.deaths && d.deaths.toLocaleString()}`
								: "error"
						].join("\n"))
					),
					exit => exit
						.attr('fill', 'gray')
						.attr('stroke', 'black')
						.call(exit => exit
							.transition()
							.duration(500)
						)
			);

			circle.on('mouseover', d => { 
				d3.select(`#circle-${selectedStates[d.state].htmlFormat}`)
					.attr('class', classes.circleSelected)
					.attr('cursor', 'pointer')
					.call(circle => {
						circle.transition()
						.duration(750)
					})
			});

			circle.on('mouseout', d => { 
				d3.select(`#circle-${selectedStates[d.state].htmlFormat}`)
					.attr('class', !selected.includes(d.state) && classes.circle)
					.call(circle => {
						circle.transition()
						.duration(750)
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
	}, [dayCounter, selector, scales]);

	return (
		<>		
			<g ref={circlesRef} />
		</>
	)
};