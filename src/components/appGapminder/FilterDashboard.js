import React, { useState, useContext } from "react";
import {
    IconButton,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Typography,
    Divider,
} from "@material-ui/core";

// components
import {FilterBatch} from "./pickers/FilterBatch";
import { FilterRegion } from "./pickers/FilterRegion";
import { FilterPopulation } from "./pickers/FilterPopulation";
import { FilterOperator } from "./pickers/FilterOperator";

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

export const FilterDashboard = () => {
    const { selectedCircles, setSelectedCircles } = useContext(selectionContext);
    const classes = useStyles();
	const theme = useTheme();
	
	const [filters, setFilters] = useState({
		selected: '',
		operator: '',
		list: []
	});
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};


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

    const handleDeselectAll = () => {
        setSelectedCircles({
            ...selectedCircles,
            selected: [],
            notSelected: selectedCircles.all,
        });
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
				
				<Typography className={classes.dashboardTitle}>
					Filters
				</Typography>
				<Divider className={classes.dashboardDivider} />
				<FilterBatch 
					className={classes.filterBatch}
					filters={filters}
					setFilters={setFilters}
				>
					<FilterRegion 
						filters={filters} 
						setFilters={setFilters}
						anchorEl={anchorEl}
						setAnchorEl={setAnchorEl}
						handleMenu={handleMenu} 
						handleMenuClose={handleMenuClose} 
					/>
					<FilterPopulation 
						filters={filters} 
						setFilters={setFilters}
						anchorEl={anchorEl}
						setAnchorEl={setAnchorEl}
						handleMenu={handleMenu} 
						handleMenuClose={handleMenuClose} 
					/>
				</FilterBatch>
				<FilterOperator filters={filters} setFilters={setFilters} />

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
                                control={<Checkbox name={state} />}
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
                                control={<Checkbox name={state} />}
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
