import React, { useState, useEffect, useContext } from 'react';

// components
import { DataReader } from './DataReader';
import { ChartGapminder } from './ChartGapminder'; 

// context
import { dataContext } from '../../context/dataContext';

// data
import stateInfo from '../../data/stateInfo.json';
import { gapminderData } from '../dataParams/gapminderData';

const wrapper = {
	wrapperWidth: window.innerWidth * .8,
	wrapperHeight: window.innerHeight * .8,
	marginTop: 30,
	marginRight: 30,
	marginBottom: 60,
	marginLeft: 60
  };
  
const bounded = {
	width: wrapper.wrapperWidth - wrapper.marginLeft - wrapper.marginRight,
	height: wrapper.wrapperHeight - wrapper.marginTop - wrapper.marginBottom,
};

// Chart params: define params for drawing axes and chart
const chartParams = {
	xParam: 'casesPerThousand',
	xParamType: 'linear',
	xParamFormat: 'none',
	yParam: 'deathsPerThousand',
	yParamType: 'linear',
	yParamFormat: 'none',
	tParam: "dayOfOutbreak",
	cParam: "region",
	toTimestamp: null,
	multiple: true,
	normalize: true,
};

// Label params:
const labelParams = {
	chartTitle: "COVID-19 State Comparison",
	xLabel: "Cases per Thousand",
	yLabel: "Deaths per Thousand"
};

export const AppGapminder = () => {
	const {dataStates} = useContext(dataContext);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (dataStates.length > 0) {
			console.log(dataStates);
			gapminderData(dataStates, stateInfo, chartParams)
				.then(res => setData(res))
		}
	}, [dataStates]);

	return (
		<>
			{data 
				? <ChartGapminder 
					chartParams={chartParams} 
					data={data} 
					wrapper={wrapper} 
					bounded={bounded} 
				/> 
				: <></>
			}
		</>
	)
};
