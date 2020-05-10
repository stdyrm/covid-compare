import React, { useState, useContext } from 'react'

// context
import { statesContext } from '../../../context/statesContext';

// style
import { Menu, MenuItem } from '@material-ui/core';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const regionOptions = [
	{id: "northeast", name: "Northeast", type: "Region", chartParam: "region"},
	{id: "midwest", name: "Midwest", type: "Region", chartParam: "region"},
	{id: "south", name: "South", type: "Region", chartParam: "region"},
	{id: "west", name: "West", type: "Region", chartParam: "region"}
];

export const FilterRegion = (props) => {
	const { handleFilter } = props;

	const { infoStates } = useContext(statesContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<MenuItem id="region-btn" dense={true} onClick={handleMenu}>
				Region
			<ChevronRightIcon style={{marginLeft: "auto"}}/>
			<Menu
				anchorEl={anchorEl}
				open={anchorEl ? Boolean(anchorEl.id === "region-btn") : false}
				onClose={handleMenuClose}
			>
				{infoStates 
					&& regionOptions.map(o => {
						return (
							<MenuItem 
								key={o.id} 
								id={o.id} 
								onClick={() => handleFilter(o)}
							>
								{o.name}
							</MenuItem>
						)
					})
				}
			</Menu>
		</MenuItem>
	)
};