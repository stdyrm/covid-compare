import React, { useState, useContext, forwardRef } from 'react'

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

export const FilterRegion = forwardRef((props, ref) => {
	const { handleFilter } = props;

	const { infoStates } = useContext(statesContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (e) => {
		!anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
	};

	return (
		<MenuItem id="region-btn" ref={ref} dense={true} onClick={handleMenu}>
				Region
			<ChevronRightIcon style={{marginLeft: "auto"}}/>
			<Menu
				anchorEl={anchorEl}
				open={anchorEl ? Boolean(anchorEl.id === "region-btn") : false}
				onClose={handleMenu}
			>
				{infoStates 
					&& regionOptions.map(o => {
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
	)
});