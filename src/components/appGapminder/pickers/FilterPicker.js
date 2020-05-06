import React, { useState, useEffect, useContext } from 'react';
import { timeParse, nest } from 'd3';

// context
import { selectionContext } from '../../../context/selectionContext';
import { statesContext } from '../../../context/statesContext';

// style
import { IconButton, FormControlLabel, FormGroup, Checkbox, Typography, Divider, Menu, MenuItem, Button, Switch } from '@material-ui/core';

export const FilterPicker = (props) => {
	const { selectedCircles, setSelectedCircles } = useContext(selectionContext);
	const { infoStates } = useContext(statesContext);

	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedFilter, setSelectedFilter] = useState(null);
	const [selectedDate, setDateChange] = useState(new Date());
	const [operator, setOperator] = useState("or");

	const handleMenu = (e) => {
		console.log(e.currentTarget.id)
		console.log(e.currentTarget)
		setAnchorEl(e.currentTarget);
	};

	const chainOperator = (query) => {
		if (selectedCircles.selected.length < 1) return;

		let newSelection = selectedCircles.selected;
		
		if (operator === "or") {
 			query.forEach(s => {
				if (!selectedCircles.selected.includes(s)) {
					newSelection.push(s)
				}
			})
		} else if (operator === "and") {
			return newSelection.filter(s => query.includes(s))
		}
		
		return newSelection;
	};

	const filterRegion = (e) => {
		const filtered = Object.keys(infoStates)
			.filter(s => infoStates[s].region.toLowerCase() === e.target.id);
	
		setSelectedCircles({
			...selectedCircles,
			selected: filtered,
			notSelected: selectedCircles.all.filter(s => !filtered.includes(s))
		});
		setAnchorEl(null);
	  };
	
	const regionOptions = [
		{id: "northeast", name: "Northeast"},
		{id: "midwest", name: "Midwest"},
		{id: "south", name: "South"},
		{id: "west", name: "West"}
	];

	const filterPopulation = (e) => {
		const n = 12;
		const sorted = Object.keys(infoStates)
			.sort((a,b) => infoStates[b].population - infoStates[a].population)
			.slice(0,n);
	
		setSelectedCircles({
			...selectedCircles,
			selected: sorted,
			notSelected: selectedCircles.all.filter(s => !sorted.includes(s))
		});
		setAnchorEl(null);
		console.log(sorted)
	  };

	  const testChainOperator = async () => {
		const n = 12;
		const sorted = Object.keys(infoStates)
			.sort((a,b) => infoStates[b].population - infoStates[a].population)
			.slice(0,n);

		const chained = await chainOperator(sorted);

		setSelectedCircles({
			...selectedCircles,
			selected: chained,
			notSelected: selectedCircles.all.filter(s => !chained.includes(s))
		});
		setAnchorEl(null);
		console.log(chained)
	  }


	useEffect(() => {
		console.log(selectedCircles)
		console.log(infoStates)
	}, [selectedCircles, infoStates])

	useEffect(() => {
		anchorEl && console.log(anchorEl.id)
	},[anchorEl])

	return (
		<>
			<FormGroup>
				<FormControlLabel 
					control={
						<Switch onChange={operator === "or" 
							? () => setOperator("and")
							: () => setOperator("or")} 
						/>
					}
					label={operator} 				
				/>
			</FormGroup>
			<Button id="region-btn" onClick={handleMenu}>
				Filter Region
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={anchorEl && Boolean(anchorEl.id === "region-btn")}
			>
				{infoStates 
					&& regionOptions.map((d,i) => {
						return (
							<MenuItem key={d.id} id={d.id} onClick={filterRegion}>
								{d.name}
							</MenuItem>
						)
					})
				}
			</Menu>

			<Button id="pop-btn" onClick={handleMenu}>
				Filter Population
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={anchorEl && Boolean(anchorEl.id === "pop-btn")}
			>
				<MenuItem id="pop-high" onClick={filterPopulation}>
					Top 12 population
				</MenuItem>
				<MenuItem id="pop-chain" onClick={testChainOperator}>
					Chain Top 12 population
				</MenuItem>
			</Menu>
		</>
	);
};

