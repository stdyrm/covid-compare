import React, { useEffect, useContext, useRef } from 'react';
import * as d3 from 'd3';

// context
import { statesContext } from '../../../context/statesContext';
import { selectionContext } from '../../../context/selectionContext';

// style 
import { makeStyles, useTheme } from '@material-ui/core/styles';

export const CirclesGapminder = (props) => {
	const { data, dayCounter, selector, scales, opacityNotSel } = props;
	const { xParam, yParam, zParam, cParam } = selector;
	const { xScale, yScale, colorScale } = scales;

	// context and ref
	const { infoStates } = useContext(statesContext);
	const { selectedCircles, setSelectedCircles } = useContext(selectionContext); 
	const circlesRef = useRef(null);

	// styles
	const useStyles = makeStyles((theme) => ({
		circle: {
			stroke: 'none',
			opacity: opacityNotSel
		},
		circleSelected: {
			stroke: "#e91e63",
			strokeWidth: 2,
			opacity: .8,
		},
		circleLabel: {
			fill: theme.palette.text.primary,
			fontSize: ".6rem",
		},
	}));
	const classes = useStyles();
	const theme = useTheme();

	const bisectDay = d3.bisector(([d]) => d).left;

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
			const circle = d3.select(circlesRef.current).selectAll('circle')
			.data(dataAt(dayCounter), d => d)
			.join('circle')
				.sort((a,b) => d3.descending(infoStates[a.state][zParam.selected], infoStates[b.state][zParam.selected]))
				.attr('r', d => zParam.selected === "population" 
					? infoStates[d.state][zParam.selected] / 1000000 
					: zParam.selected === "populationDensity"
					? infoStates[d.state][zParam.selected] / 100
					: zParam.selected === "gdp"
					? infoStates[d.state][zParam.selected] / 100000
					: 5
				)
				.attr('cx', d => xScale(d[xParam.selected]))
				.attr('cy', d => yScale(d[yParam.selected]))
				.attr('fill', d => colorScale(infoStates[d.state][cParam.selected]))
				.attr('id', d => `circle-${infoStates[d.state].htmlFormat}`)
				.attr('class', d =>
					selectedCircles.selected.includes(d.state) 
						? classes.circleSelected
						: classes.circle
				)
				.call(circle => circle
					.append('title')
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
						].join("\n")
					)
				);

			circle.on('mouseover', d => {
				const mouseOverCircle = d3.select(`#circle-${infoStates[d.state].htmlFormat}`)			
				if (opacityNotSel !== 0 || selectedCircles.selected.includes(d.state)) {
					mouseOverCircle
						.attr('cursor', 'pointer')
						.style("opacity", .9)
						.style("stroke", "#e91e63")
						.style("stroke-width", 2)
				}
			});

			circle.on('mouseout', d => { 
				const mouseOutCircle = d3.select(`#circle-${infoStates[d.state].htmlFormat}`)
				if (selectedCircles.notSelected.includes(d.state)) {
					mouseOutCircle
						.style("opacity", opacityNotSel)
						.style("stroke", "none")					
				}
			});

			circle.on('click', d => { 
				if (selectedCircles.selected.includes(d.state)) {
					setSelectedCircles({
						...selectedCircles,
						selected: selectedCircles.selected.filter(s => s !== d.state),
						notSelected: [...selectedCircles.notSelected, d.state]
					})
					d3.select(`#circle-${infoStates[d.state].htmlFormat}`)
						.style("opacity", opacityNotSel)
						.style("stroke", "none")
				} else {
					setSelectedCircles({
						...selectedCircles,
						selected: [...selectedCircles.selected, d.state],
						notSelected: selectedCircles.notSelected.filter(s => s !== d.state)
					})
					d3.select(`#circle-${infoStates[d.state].htmlFormat}`)
						.style("opacity", .9)
						.style("stroke", "#e91e63")
						.style("stroke-width", 2)
				}
			});

			d3.select(circlesRef.current).selectAll("text")
				.data(dataAt(dayCounter), d => d)
				.join("text")
					.call(label => {
						const length = d => {
							if (zParam.selected === "population") {
								return infoStates[d.state][zParam.selected] / 1000000
							} else if (zParam.selected === "populationDensity") {
								return infoStates[d.state][zParam.selected] / 100
							} else if (zParam.selected === "gdp") {
								return infoStates[d.state][zParam.selected] / 100000
							} else {
								return 4 
							}
						};
						label
							.attr("x", d => xScale(d[xParam.selected]) + length(d))
							.attr("y", d => yScale(d[yParam.selected]) - length(d))
					})
					.attr("opacity", d => selectedCircles.selected.includes(d.state)
						? .8
						: 0)
					.attr("class", classes.circleLabel)
					.attr('cursor', 'context-menu')
					.text(d => infoStates[d.state].abbreviation);
		};
	}, [dayCounter, selector, scales, selectedCircles, opacityNotSel, theme]);

	return (
		<>		
			<g ref={circlesRef} />
		</>
	)
};