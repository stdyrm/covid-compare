import React from 'react';

// context
import { selectionContext } from '../../context/selectionContext';
import { statesContext } from '../../context/statesContext';

// style
import { IconButton, FormControlLabel, FormGroup, Checkbox, Typography, Divider, Menu, MenuItem, MenuList, Button, Switch, Chip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
	button: {
		backgroundColor: theme.palette.secondary.main,
		margin: "auto",
	}
}));

export const FilterOperator = (props) => {
	const { filters, setFilters } = props;

	const classes = useStyles();

	return (
		<div container>
			<Button variant="contained" className={classes.button}>
				Or
			</Button>
			<Button variant="contained" className={classes.button}>
				And
			</Button>
		</div>
	);
};
