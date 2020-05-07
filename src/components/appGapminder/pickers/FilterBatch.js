import React, { useState, useEffect, useContext } from 'react';

// context
import { selectionContext } from '../../../context/selectionContext';
import { statesContext } from '../../../context/statesContext';

// style
import { IconButton, FormControlLabel, FormGroup, Checkbox, Typography, Divider, Menu, MenuItem, MenuList, Button, Switch, Chip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
	button: {
		"&:hover": {
			backgroundColor: "transparent"
		}
	}
}))

export const FilterBatch = (props) => {
	const { selectedCircles, setSelectedCircles } = useContext(selectionContext);
	const { infoStates } = useContext(statesContext);

	const [anchorEl, setAnchorEl] = useState(null);
	const [filters, setFilters] = useState({
		selected: '',
		operator: '',
		list: []
	});
	const [selectedDate, setDateChange] = useState(new Date());
	const [operator, setOperator] = useState("or");

	const classes = useStyles();

	const handleMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleOperator = (e) => {
		setFilters({...filters, operator: e.currentTarget.id});
	};

	const chainOperator = (query) => {
		if (selectedCircles.selected.length < 1) return;

		let newSelection = selectedCircles.selected;
		
		if (operator === "or") {
 			query.forEach(s => {
				if (!selectedCircles.selected.includes(s)) {
					newSelection.push(s)
				}
			})
		} else if (operator === "and") {
			return newSelection.filter(s => query.includes(s))
		}
		
		return newSelection;
	};

	//   const testChainOperator = async () => {
	// 	const n = 12;
	// 	const sorted = Object.keys(infoStates)
	// 		.sort((a,b) => infoStates[b].population - infoStates[a].population)
	// 		.slice(0,n);

	// 	const chained = await chainOperator(sorted);

	// 	setSelectedCircles({
	// 		...selectedCircles,
	// 		selected: chained,
	// 		notSelected: selectedCircles.all.filter(s => !chained.includes(s))
	// 	});
	// 	setAnchorEl(null);
	// 	console.log(chained)
	//   }

	return (
		<>
			<Button id="select-filter" onClick={handleMenu} className={classes.button}>
				New Filter
				<ChevronRightIcon style={{marginLeft: "auto"}}/>
			</Button>

			<Menu
				anchorEl={anchorEl}
				open={anchorEl && Boolean(anchorEl.id === "select-filter")}
				onClose={handleMenuClose}
			>
				{props.children}
			</Menu>
			
		</>
	);
};

