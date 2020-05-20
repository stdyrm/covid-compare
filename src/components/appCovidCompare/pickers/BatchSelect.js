import React, { useState, useEffect, useContext } from "react";
import { useMediaQuery, Grid } from "@material-ui/core";

// components
import { FilterCases } from "./FilterCases";
import { FilterPopulation } from "./FilterPopulation";
import { FilterRegion } from "./FilterRegion";

// context
import { statesContext } from "../../../context/statesContext";

// styles
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	rootContainer: {
		maxWidth: 550,
		minWidth: 175,
		justifyContent: "space-evenly",
		padding: 0,
		margin: 0,
	},
    tab: {
        opacity: 0.7,
    },
    menuItem: {
        opacity: 0.7,
        "&:hover": {
            opacity: 1,
        },
    },
}));

export const BatchSelect = props => {
    const { selectedStates, setSelectedStates } = props;

    // ref and context
	const { infoStates } = useContext(statesContext);

    // assign
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState(null);

	// style
	const theme = useTheme();
	const classes = useStyles();
	const mqSmall = useMediaQuery(theme.breakpoints.down("sm"));
	
	const handleSelectedFilter = (newSelectedFilter) => {
		setSelectedFilter(newSelectedFilter);
		setAnchorEl(null);
	};

	const handleFilterCategories = (newFilter, info) => {
        const filtered = Object.keys(info).filter(
            s => info[s][newFilter.chartParam] === newFilter.name
		);

		let newSelection = {};
		Object.keys(info).forEach(s => {
			if (filtered.includes(s)) {
				newSelection[s] = {...info[s], selected: true}
			} else {
				newSelection[s] = {...info[s], selected: false}
			}
		});

        return newSelection;
    };
	
    const handleFilterValues = (newFilter, info) => {
		const n = newFilter.n;
		let filtered;

		filtered = Object.keys(info)
		.sort((a, b) =>
			newFilter.sort === "descending"
				? info[b][newFilter.chartParam] -
					info[a][newFilter.chartParam]
				: info[a][newFilter.chartParam] -
					info[b][newFilter.chartParam]
		)
		.slice(0, n);
			
		let newSelection = {};
		Object.keys(info).forEach(s => {
			if (filtered.includes(s)) {
				newSelection[s] = {...info[s], selected: true}
			} else {
				newSelection[s] = {...info[s], selected: false}
			}
		});

        return newSelection;
    };
	
	useEffect(() => {
		if (selectedFilter) {
			const newSelection = selectedFilter.n 
				? handleFilterValues(selectedFilter, infoStates)
				: handleFilterCategories(selectedFilter, infoStates);
			setSelectedStates(newSelection);
		}
	},[selectedFilter]);

    return (
		<Grid container className={classes.rootContainer}
			style={mqSmall
			? {flexDirection: "column", alignItems: "center"}
			: {flexDirection: "row"}}
		>
			<FilterCases
				aria-controls="cases-btn"
				aria-haspopup="true"
				className={classes.tab}
				nStates={12}
				selectedStates={selectedStates}
				setSelectedStates={setSelectedStates}
				handleSelectedFilter={handleSelectedFilter}
			/>
			<FilterPopulation
				aria-controls="population-btn"
				aria-haspopup="true"
				className={classes.tab}
				nStates={12}
				selectedStates={selectedStates}
				setSelectedStates={setSelectedStates}
				handleSelectedFilter={handleSelectedFilter}
			/>
			<FilterRegion
				aria-controls="region-btn"
				aria-haspopup="true"
				className={classes.tab}
				selectedStates={selectedStates}
				setSelectedStates={setSelectedStates}
				handleSelectedFilter={handleSelectedFilter}
			/>
        </Grid>
    );
};