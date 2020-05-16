import React, { useState, useContext } from "react";
import {
    FormGroup,
    Typography,
	Divider,
} from "@material-ui/core";

// components
import { DeselectAll } from "../pickers/DeselectAll";
import {FilterBatch} from "../pickers/FilterBatch";
import { SelectedStatus } from "../pickers/SelectedStatus";
import { NumberPicker } from "../pickers/NumberPicker";

// context
import { selectionContext } from "../../../context/selectionContext";

// styles
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	deselectAll: {
		marginBottom: "1.5rem",
	},
	deselectAllButton: {
		color: "#e32636",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	dashboardTitle: {
		color: theme.palette.primary.contrastText,
		fontWeight: 700,
		fontSize: "1.2rem" 
	},
	dashboardDivider: {
		backgroundColor: theme.palette.primary.contrastText,
		marginBottom: ".2rem",
	},
	filterBatch: {
		justifyContent: "flex-start",
		color: theme.palette.text.primary,
	},
}));

export const FilterDashboard = (props) => {
    const { selectedCircles, setSelectedCircles } = useContext(selectionContext);
	const classes = useStyles();
	const theme = useTheme();

	const [filters, setFilters] = useState([]);
	const [nStates, setNStates] = useState(12);

    const handleChange = e => {
        const state = e.target.name;

        if (selectedCircles.selected.includes(state)) {
            setSelectedCircles({
                ...selectedCircles,
                selected: selectedCircles.selected.filter(d => d !== state),
                notSelected: [...selectedCircles.notSelected, state],
            });
        } else {
            setSelectedCircles({
                ...selectedCircles,
                selected: [...selectedCircles.selected, state],
                notSelected: selectedCircles.notSelected.filter(
                    d => d !== state
                ),
            });
        }
	};

	const handleFilter = (newFilter) => {
		if (filters.length > 0) {
			setFilters(prevState => [...prevState, newFilter])
		} else (
			setFilters([newFilter])
		)	
	};
	
	const handleDeleteFilter = deletedFilter => {
        const newFilterList = filters.filter(f => f.id !== deletedFilter.id);
        setFilters(newFilterList);
    };

    const handleDeselectAll = () => {
		setFilters([]);
        setSelectedCircles(prevState => ({
            ...prevState,
            selected: [],
            notSelected: prevState.all,
        }));
    };

    return (
        <>
            <FormGroup>
				<DeselectAll handleDeselectAll={handleDeselectAll} classes={classes} />
				<NumberPicker nStates={nStates} setNStates={setNStates} />
				<Typography className={classes.dashboardTitle}>
					Filters
				</Typography>
				<Divider className={classes.dashboardDivider} />
				<FilterBatch 
					className={classes.filterBatch}
					nStates={nStates}
					setNStates={setNStates}
					filters={filters}
					setFilters={setFilters}
					handleDeleteFilter={handleDeleteFilter}
					handleFilter={handleFilter}
				/>
				<SelectedStatus 
					handleChange={handleChange} 
					classes={classes} 
					theme={theme}
				/>
            </FormGroup>
        </>
    );
};
