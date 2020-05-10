import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Menu, MenuItem, Typography, Divider } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

// components
import { FilterCases } from "./pickers/FilterCases";
import { FilterGDP } from "./pickers/FilterGDP";
import { FilterPopulation } from "./pickers/FilterPopulation";
import { FilterRegion } from "./pickers/FilterRegion";

// context
import { statesContext } from "../../context/statesContext";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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
    const [selectedDate, setDateChange] = useState(new Date());

    // style
    const classes = useStyles();

    const handleMenu = e => {
		!anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    const handleDateChange = e => {
        setDateChange(e);
	};
	
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
        <span>
			<FilterCases
				aria-controls="cases-btn"
				aria-haspopup="true"
				className={classes.tab}
				nStates={12}
				selectedStates={selectedStates}
				setSelectedStates={setSelectedStates}
				handleSelectedFilter={handleSelectedFilter}
				onClose={handleMenu}
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
        </span>
    );
};