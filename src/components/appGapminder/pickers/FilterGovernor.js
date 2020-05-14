import React, { useState, useContext, forwardRef } from 'react'

// context
import { statesContext } from '../../../context/statesContext';

// style
import { Menu, MenuItem } from '@material-ui/core';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const regionOptions = [
	{id: "democrat", name: "Democrat", type: "Governor", chartParam: "governor"},
	{id: "republican", name: "Republican", type: "Governor", chartParam: "governor"},
];


export const FilterGovernor = forwardRef((props, ref) => {
	const { handleFilter } = props;

	const { infoStates } = useContext(statesContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (e) => {
		!anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
	};

	return (
		<MenuItem id="governor-btn" dense={true} onClick={handleMenu}>
			Gov. party
			<ChevronRightIcon style={{marginLeft: "auto"}}/>
			<Menu
				anchorEl={anchorEl}
				open={anchorEl ? Boolean(anchorEl.id === "governor-btn") : false}
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