import React, { useState, useContext } from 'react';

// context
import { selectionContext } from '../../../context/selectionContext';
import { statesContext } from '../../../context/statesContext';

// style
import { IconButton, FormControlLabel, FormGroup, Checkbox, Typography, Divider, Menu, MenuItem, MenuList, Button, Switch, Chip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const FilterPopulation = (props) => {
	const { filters, setFilters, anchorEl, setAnchorEl, handleMenu, handleMenuClose } = props;

	const { selectedCircles, setSelectedCircles } = useContext(selectionContext);
	const { infoStates } = useContext(statesContext);

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

	return (
		<div>
			<Button id="pop-btn" onClick={handleMenu} fullWidth>
				Population
				<ChevronRightIcon style={{marginLeft: "auto"}}/>
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={anchorEl && Boolean(anchorEl.id === "pop-btn")}
				onClose={handleMenuClose}
			>
				<MenuItem id="pop-high" onClick={filterPopulation}>
					Top 12 (total)
				</MenuItem>
			</Menu>
		</div>
	);
};
