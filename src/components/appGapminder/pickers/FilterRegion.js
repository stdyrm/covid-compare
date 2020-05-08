import React, { useState, useContext } from 'react'

// context
import { selectionContext } from '../../../context/selectionContext';
import { statesContext } from '../../../context/statesContext';

// style
import { Menu, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const regionOptions = [
	{id: "northeast", name: "Northeast", type: "Region"},
	{id: "midwest", name: "Midwest", type: "Region"},
	{id: "south", name: "South", type: "Region"},
	{id: "west", name: "West", type: "Region"}
];


export const FilterRegion = (props) => {
	const { filters, setFilters, chainOperator, handleFilterRegion } = props;

	const { selectedCircles, setSelectedCircles } = useContext(selectionContext);
	const { infoStates } = useContext(statesContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

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
					&& regionOptions.map(o => {
						return (
							// <MenuItem key={o.id} id={o.id} onClick={() => handleFilterRegion(o)}>
							<MenuItem 
								key={o.id} 
								id={o.id} 
								onClick={() => filters.length > 0 
									? setFilters(prevState => ([...prevState, o])) 
									: setFilters([o])
								}
							>
								{o.name}
							</MenuItem>
						)
					})
				}
			</Menu>
		</div>
	)
};