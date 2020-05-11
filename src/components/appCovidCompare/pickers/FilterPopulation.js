// WRAPPER COMPONENT (FilterValues)

import React, { useState } from 'react';
import { FilterValues } from "../components/FilterValues";

import { Menu, Button } from "@material-ui/core";

export const FilterPopulation = (props) => {
	const { nStates, handleSelectedFilter } = props;

	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (e) => {
		!anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
	};
	
	const filterOptions = [
		{id: "pop-high", name: `Top ${nStates} (pop. total)`, type: "Pop.", chartParam: "population", sort: "descending", n: nStates},
		{id: "pop-low", name: `Bottom ${nStates} (pop. total)`, type: "Pop.", chartParam: "population", sort: "ascending", n: nStates},
		{id: "pop-density-high", name: `Top ${nStates} (pop. density)`, type: "Pop.", chartParam: "populationDensity", sort: "descending", n: nStates},
		{id: "pop-density-low", name: `Bottom ${nStates} (pop. density)`, type: "Pop.", chartParam: "populationDensity", sort: "ascending", n: nStates}
	];

	return (
		<>
			<Button id="population-btn" onClick={handleMenu}>
				Filter By Population
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={anchorEl ? Boolean(anchorEl.id === "population-btn") : false}
				onClose={handleMenu}
			>
				<FilterValues 
					filterOptions={filterOptions}
					handleSelectedFilter={handleSelectedFilter}
					handleMenu={handleMenu}
				/>
			</Menu>
		</>
	)
};
