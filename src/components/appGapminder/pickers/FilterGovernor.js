import React, { useState, useContext } from 'react'

// context
import { statesContext } from '../../../context/statesContext';

// style
import { Menu, MenuItem } from '@material-ui/core';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const regionOptions = [
	{id: "democrat", name: "Democrat", type: "Governor", chartParam: "governor"},
	{id: "republican", name: "Republican", type: "Governor", chartParam: "governor"},
];


export const FilterGovernor = (props) => {
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
		<MenuItem id="governor-btn" dense={true} onClick={handleMenu}>
			Gov. party
			<ChevronRightIcon style={{marginLeft: "auto"}}/>
			<Menu
				anchorEl={anchorEl}
				open={anchorEl ? Boolean(anchorEl.id === "governor-btn") : false}
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