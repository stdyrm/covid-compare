import React, { useState, useContext } from 'react';

// context
import { selectionContext } from '../../../context/selectionContext';
import { statesContext } from '../../../context/statesContext';

// style
import { IconButton, FormControlLabel, FormGroup, Checkbox, Typography, Divider, Menu, MenuItem, MenuList, Button, Switch, Chip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const populationOptions = [
	{id: "pop-high", name: "Top 12 (total)", type: "Pop."},
	{id: "pop-low", name: "Bottom 12 (total)", type: "Pop."},
	{id: "pop-density-high", name: "Top 12 (density)", type: "Pop."},
	{id: "pop-density-low", name: "Bottom 12 (density)", type: "Pop."}
];

export const FilterPopulation = (props) => {
	const { filters, setFilters, chainOperator, handleFilterPopulation } = props;

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
			<Button id="pop-btn" onClick={handleMenu} fullWidth>
				Population
				<ChevronRightIcon style={{marginLeft: "auto"}}/>
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={anchorEl && Boolean(anchorEl.id === "pop-btn")}
				onClose={handleMenuClose}
			>
				{populationOptions.map(o => {
					return (
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
	);
};
