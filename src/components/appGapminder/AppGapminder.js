import React, { useState, useEffect, useContext } from 'react';

// components
import { DataReader } from './DataReader';
import { ChartGapminder } from './ChartGapminder'; 

// context
import { dataContext } from '../../context/dataContext';

// data
import stateInfo from '../../data/stateInfo.json';
import { gapminderData } from '../dataParams/gapminderData';

// Chart params: define params for drawing axes and chart
const chartParams = {
	xParam: 'casesPerThousand',
	xParamType: 'linear',
	xParamFormat: 'none',
	yParam: 'deathsPerThousand',
	yParamType: 'linear',
	yParamFormat: 'none',
	tParam: "dayOfOutbreak",
	toTimestamp: null,
	multiple: true,
	normalize: true,
};

export const AppGapminder = () => {
	const {dataStates} = useContext(dataContext);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (dataStates.length > 0) {
			console.log(dataStates);
			// setData(gapminderData(dataStates, stateInfo, chartParams));
			gapminderData(dataStates, stateInfo, chartParams)
				.then(res => setData(res))
		}
	}, [dataStates]);

	return (
		<>
			<h4>Gapminder!</h4>
			{data ? <ChartGapminder data={data} /> : <></>}
		</>
	)
};
