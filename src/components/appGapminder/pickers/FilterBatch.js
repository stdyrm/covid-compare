import React, { useState, useEffect, useContext } from "react";

// context
import { selectionContext } from "../../../context/selectionContext";
import { statesContext } from "../../../context/statesContext";

// components
import { FilterRegion } from "./FilterRegion";
import { FilterPopulation } from "./FilterPopulation";
import { FilterOperator } from "./FilterOperator";

// style
import {
    IconButton,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Typography,
    Divider,
    Menu,
    MenuItem,
    MenuList,
    Button,
    Switch,
    Chip,
    Paper,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TagFacesIcon from "@material-ui/icons/TagFaces";

const useStyles = makeStyles(theme => ({
    button: {
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    chipContainer: {
        listStyle: "none",
    },
    chip: {
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(0.5),
    },
}));

export const FilterBatch = props => {
    const { filters, setFilters } = props;

    const { selectedCircles, setSelectedCircles } = useContext(selectionContext);
    const { infoStates } = useContext(statesContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDate, setDateChange] = useState(new Date());
    const [operator, setOperator] = useState("and");

    const classes = useStyles();

    const handleMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    const handleDeleteFilter = deletedFilter => {
		const newFilterList = filters.filter(f => f.id !== deletedFilter.id)

		setFilters(newFilterList);
		
		newFilterList.forEach(f => {
            if (f.type === "Region") {
                handleFilterRegion(f);
            } else if (f.type === "Pop.") {
                handleFilterPopulation(f);
            }
        });
    };

    const chainOperator = query => {

        let newSelection = selectedCircles.selected;

        if (operator === "or") {
            query.forEach(s => {
                if (!selectedCircles.selected.includes(s)) {
                    newSelection.push(s);
                }
            });
        } else if (operator === "and") {
            return newSelection.filter(s => query.includes(s)); 
        }

        return newSelection;
    };

    const handleFilterRegion = newFilter => {
        const filtered = Object.keys(infoStates).filter(
            s => infoStates[s].region === newFilter.name
        );

        // setFilters(prevState => [...prevState, newFilter]);

        // const chained = filters.length > 1 ? chainOperator(filtered) : filtered;

        // setSelectedCircles({
        //     ...selectedCircles,
        //     selected: chained,
        //     notSelected: selectedCircles.all.filter(s => !chained.includes(s)),
		// });
		setAnchorEl(null);
		return filtered;
    };

    const handleFilterPopulation = newFilter => {
        const n = 12;
        const filtered = Object.keys(infoStates)
            .sort((a, b) => infoStates[b].population - infoStates[a].population)
            .slice(0, n);

        // setFilters(prevState => [...prevState, newFilter]);

        // const chained = filters.length > 1 ? chainOperator(filtered) : filtered;

        // setSelectedCircles({
        //     ...selectedCircles,
        //     selected: chained,
        //     notSelected: selectedCircles.all.filter(s => !chained.includes(s)),
		// });
		setAnchorEl(null);

		return filtered;
	};
	
	const handleFilters = () => {
		let prevFilters = [];
		let newFilters = [];
		let newestFilters = [];

		filters.forEach((d,i) => {
			prevFilters = newFilters;
			if (d.type === "Region") {
				newFilters = handleFilterRegion(d)
			} else if (d.type === "Pop.") {
				newFilters = handleFilterPopulation(d)
			}
			newestFilters = newFilters.filter(s => prevFilters.includes(s));
			console.log(newestFilters);
		});

		setSelectedCircles(prevState => ({
			...prevState,
			selected: newestFilters,
			notSelected: prevState.all.filter(s => !newestFilters.includes(s))
		}));
	};

    useEffect(() => {
        console.log(filters);
	}, [filters]);
	
	useEffect(() => {
		filters.length > 0 && handleFilters();
    }, [filters]);

    return (
        <>
            <Button
                id="select-filter"
                onClick={handleMenu}
                className={classes.button}
            >
                New Filter
                <ChevronRightIcon style={{ marginLeft: "auto" }} />
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={anchorEl && Boolean(anchorEl.id === "select-filter")}
                onClose={handleMenu}
            >
                <FilterRegion
                    filters={filters}
                    setFilters={setFilters}
                    chainOperator={chainOperator}
                    handleFilterRegion={handleFilterRegion}
                />
                <FilterPopulation
                    filters={filters}
                    setFilters={setFilters}
                    chainOperator={chainOperator}
                    handleFilterPopulation={handleFilterPopulation}
                />
                <FilterOperator filters={filters} setFilters={setFilters} />
            </Menu>

            <Paper component="ul" className={classes.chipContainer}>
                {filters.length > 0 ? (
                    filters.map(f => {
                        return (
                            <li>
                                <Chip
                                    key={f.id}
                                    variant="small"
                                    className={classes.chip}
                                    label={f.name}
                                    onDelete={() => handleDeleteFilter(f)}
                                />
                            </li>
                        );
                    })
                ) : (
                    <Typography>No filters</Typography>
                )}
            </Paper>
        </>
    );
};
