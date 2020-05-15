import React, { useState, useContext } from "react";
import {
    IconButton,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Typography,
	Divider,
	TextField,
} from "@material-ui/core";

// components
import {FilterBatch} from "./pickers/FilterBatch";

// context
import { selectionContext } from "../../context/selectionContext";

// styles
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    dashboard: {
        alignItems: "left",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
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
            <FormGroup className={classes.dashboard}>
				<FormControlLabel
                    id="deselect-all"
                    label="Deselect All"
                    name="Deselect All"
                    onClick={handleDeselectAll}
                    control={
                        <IconButton
                            id="deselector-all"
                            name="deselect-all"
                            style={{ color: "red" }}
                        >
                            <ClearIcon />
                        </IconButton>
                    }
                /><br />

				<TextField 
					id="n-states"
					variant="outlined"
					size="small"
					type="number"
					label="Filter n states"
					InputProps={{
						inputProps: {
							min: 1,
							max: 50
						}
					}}
					defaultValue={nStates}
					onChange={(e) => setNStates(e.target.value)}
				/>
				
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

                <Typography className={classes.dashboardTitle}>
                    Selected
                </Typography>
                <Divider className={classes.dashboardDivider} />
                {selectedCircles.selected ? (
                    selectedCircles.selected.sort().map((state, i) => {
                        return (
                            <FormControlLabel
                                key={i}
                                name={state}
                                checked={selectedCircles.selected.includes(
                                    state
                                )}
                                onChange={handleChange}
                                control={<Checkbox name={state} style={{color: theme.palette.primary.contrastText}} />}
                                label={state}
                            />
                        );
                    })
                ) : (
                    <div />
                )}
                <br />

                <Typography className={classes.dashboardTitle}>
                    Not Selected
                </Typography>
                <Divider className={classes.dashboardDivider} />
                {selectedCircles.notSelected ? (
                    selectedCircles.notSelected.sort().map((state, i) => {
                        return (
                            <FormControlLabel
                                key={i}
                                name={state}
                                checked={selectedCircles.selected.includes(
                                    state
                                )}
                                onChange={handleChange}
                                control={<Checkbox name={state} style={{color: theme.palette.primary.contrastText}} />}
                                label={state}
                            />
                        );
                    })
                ) : (
                    <div />
                )}
            </FormGroup>
        </>
    );
};
