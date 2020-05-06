import React, { useState, useEffect, useContext } from 'react';

// params
import { wrapper, bounded, chartParams, labelParams } from "./appParams";

// components
import { DataReader } from './DataReader';
import { ChartGapminder } from './chart/ChartGapminder'; 
import { Dashboard } from './Dashboard';
import { FilterBar } from './interface/FilterBar';

// context
import { dataContext } from '../../context/dataContext';
import { selectionContext } from '../../context/selectionContext';

// data
import stateInfo from '../../data/stateInfo.json';
import { gapminderData } from '../dataParams/gapminderData';

// style
import { Container, Drawer, List, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	filterBar: {
		width: bounded.width,
		marginLeft: wrapper.marginLeft,
		display: 'flex',
		justifyContent: 'flex-start',
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
	const [selectedCircles, setSelectedCircles] = useState({
		selected: [], 
		notSelected: Object.keys(stateInfo), 
		all: Object.keys(stateInfo)
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
		<selectionContext.Provider value={{selectedCircles, setSelectedCircles}}>
			<FilterBar 								
				data={data} 
				selector={selector} 
				handleSelector={handleSelector}
				className={classes.filterBar}
			/>
			<div transform={`translate(${marginLeft}, ${marginTop})`}>
				{data 
					&& <ChartGapminder 
						selector={selector}
						data={data}
						wrapper={wrapper} 
						bounded={bounded} 
						/>
				}
			</div>
		</selectionContext.Provider>
	)
};
