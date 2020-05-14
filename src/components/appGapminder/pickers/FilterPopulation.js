import React, { useState, forwardRef } from 'react';

// style
import { Menu, MenuItem, Button } from '@material-ui/core';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const FilterPopulation = forwardRef((props, ref) => {
	const { handleFilter, nStates } = props;

	const [anchorEl, setAnchorEl] = useState(null);
	
	const handleMenu = (e) => {
		!anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
	};

	const populationOptions = [
		{id: "pop-high", name: `Top ${nStates} (pop. total)`, type: "Pop.", chartParam: "population", sort: "descending", n: nStates},
		{id: "pop-low", name: `Bottom ${nStates} (pop. total)`, type: "Pop.", chartParam: "population", sort: "ascending", n: nStates},
		{id: "pop-density-high", name: `Top ${nStates} (pop. density)`, type: "Pop.", chartParam: "populationDensity", sort: "descending", n: nStates},
		{id: "pop-density-low", name: `Bottom ${nStates} (pop. density)`, type: "Pop.", chartParam: "populationDensity", sort: "ascending", n: nStates}
	];

	return (
		<MenuItem id="pop-btn" dense={true} onClick={handleMenu}>
			Population
			<ChevronRightIcon style={{marginLeft: "auto"}}/>
			<Menu
				anchorEl={anchorEl}
				open={anchorEl ? Boolean(anchorEl.id === "pop-btn") : false}
				onClose={handleMenu}
			>
				{populationOptions.map(o => {
					return (
						<MenuItem 
							key={o.id} 
							id={o.id}
							onClick={() => handleFilter(o)}
							onClose={handleMenu}
						>
							{o.name}
						</MenuItem>
					)
				})
				}
			</Menu>
		</MenuItem>
	);
});