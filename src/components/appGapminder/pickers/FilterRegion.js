import React, { useContext } from 'react'

// context
import { selectionContext } from '../../../context/selectionContext';
import { statesContext } from '../../../context/statesContext';

// style
import { Menu, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const FilterRegion = (props) => {
	const { filters, setFilters, anchorEl, setAnchorEl, handleMenu, handleMenuClose } = props;

	const { selectedCircles, setSelectedCircles } = useContext(selectionContext);
	const { infoStates } = useContext(statesContext);

	const filterRegion = (e) => {
		const filtered = Object.keys(infoStates)
			.filter(s => infoStates[s].region.toLowerCase() === e.target.id);

		setFilters({
			...filters,
			selected: `Region: ${e.target.id}`,
			list: [
				...filters.list, 
				`Region: ${e.target.id}`
			]
		});
	
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

	return (
		<div>
			<Button id="region-btn" onClick={handleMenu} fullWidth>
				Region
				<ChevronRightIcon style={{marginLeft: "auto"}}/>
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={anchorEl && Boolean(anchorEl.id === "region-btn")}
				onClose={handleMenuClose}
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
		</div>
	)
};