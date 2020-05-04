import React, { useState, useEffect, useContext } from 'react';

// components
import { DataReader } from './DataReader';
import { ChartGapminder } from './ChartGapminder'; 
import { FilterGapminder } from './FilterGapminder';

// context
import { dataContext } from '../../context/dataContext';

// data
import stateInfo from '../../data/stateInfo.json';
import { gapminderData } from '../dataParams/gapminderData';

// style
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const wrapper = {
	wrapperWidth: window.innerWidth * .8,
	wrapperHeight: window.innerHeight * .8,
	marginTop: 30,
	marginRight: 30,
	marginBottom: 40,
	marginLeft: 60
  };
  
const bounded = {
	width: wrapper.wrapperWidth - wrapper.marginLeft - wrapper.marginRight,
	height: wrapper.wrapperHeight - wrapper.marginTop - wrapper.marginBottom,
};

// Chart params: define params for drawing axes and chart
const chartParams = {
	chartType: "bubble",
	toTimestamp: null,
	multiple: true,
	normalize: true,
	xParam: { // x-axis
		type: 'linear',
		format: 'none',
		selected: 'casesPerThousand',
		alt1: 'cases',
		options: [
			"casesPerThousand",
			"cases",
			"deathsPerThousand",
			"deaths"
		]
	},
	yParam: { // y-axis
		type: 'linear',
		format: 'none',
		selected: 'deathsPerThousand',
		alt1: 'deaths',
		options: [ 
			"casesPerThousand",
			"cases",
			"deathsPerThousand",
			"deaths"
		], 
	},
	zParam: {// z-axis (3rd dimension) (eg. size)
		type: "linear",
		format: "none",
		selected: "population",
		options: [ 
			"population",
			"populationDensity"
		]
	},
	cParam: { // color axis (categorical/ordinal data) (eg. gender, birthplace, etc.)
		type: "categorical",
		selected: "region",
		options: [ 
			"region",
			"division",
			"governor"
		],
	},
	tParam: { // time axis (4th dimension) (ie. for animated charts)
		type: 'time',
		selected: "dayOfOutbreak",
		options: [
			"dayOfOutbreak",
			"date"
		]
	},
};

// Label params:
const labelParams = {
	chartTitle: "COVID-19 State Comparison",
	xLabel: "Cases per Thousand",
	yLabel: "Deaths per Thousand"
};

const useStyles = makeStyles((theme) => ({
	container: {
		width: bounded.width,
		marginLeft: wrapper.marginLeft,
		display: 'flex',
		justifyContent: 'space-evenly'
	}
}))

export const AppGapminder = () => {
	const {dataStates} = useContext(dataContext);
	const [data, setData] = useState(null);
	const [selector, setSelector] = useState({
		xParam: chartParams.xParam, 
		yParam: chartParams.yParam, 
		zParam: chartParams.zParam, 
		cParam: chartParams.cParam, 
		tParam: chartParams.tParam
	});

	// style
	const { wrapperWidth, wrapperHeight, marginTop, marginBottom, marginLeft, marginRight } = wrapper;
	const { width, height } = bounded;
	const classes = useStyles();

	const handleSelector = (e) => {
		const param = e.target.name;

		setSelector({
			...selector,
			[param]: {
				...selector[param],
				selected: e.target.value
			}
		});
	};

	useEffect(() => {
		if (dataStates.length > 0) {
			console.log(dataStates);
			gapminderData(dataStates, stateInfo, chartParams)
				.then(res => setData(res))
		}
	}, [dataStates]);

	return (
		<div transform={`translate(${marginLeft}, ${marginTop})`}>
			{data 
				&& <ChartGapminder 
					selector={selector}
					data={data} 
					wrapper={wrapper} 
					bounded={bounded} 
				/> 
			}
			{selector
				&& <>
					<Container className={classes.container}>
						<FilterGapminder data={data} selector={selector} handleSelector={handleSelector} />
					</Container>
					{/* <button onClick={() => console.log(selector)}>Check Selector</button> */}
				</>
			}
		</div>
	)
};
