import React, { useState, useEffect, useContext } from "react";

// context
import { selectionContext } from "../../../context/selectionContext";
import { statesContext } from "../../../context/statesContext";

// components
import { FilterRegion } from "./FilterRegion";
import { FilterGovernor } from "./FilterGovernor";
import { FilterPopulation } from "./FilterPopulation";
import { FilterGdp } from "./FilterGdp";

// style
import { Typography, Menu, Button, Chip, Paper, MenuList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles(theme => ({
    button: {
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    chipContainer: {
        listStyle: "none",
        backgroundColor: theme.palette.primary.main,
    },
    chip: {
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(0.5),
        margin: theme.spacing(0.5),
        fontSize: ".7rem",
    },
}));

export const FilterBatch = props => {
    const {
        filters,
        handleDeleteFilter,
        handleFilter,
        nStates,
    } = props;
    const { setSelectedCircles } = useContext(
        selectionContext
    );
    const { infoStates } = useContext(statesContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const handleMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    const handleFilterCategories = newFilter => {
        const filtered = Object.keys(infoStates).filter(
            s => infoStates[s][newFilter.chartParam] === newFilter.name
		);

        setAnchorEl(null);
        return filtered;
    };

    const handleFilterValues = newFilter => {
        const n = newFilter.n;
        const filtered = Object.keys(infoStates)
            .sort((a, b) =>
                newFilter.sort === "descending"
                    ? infoStates[b][newFilter.chartParam] -
                      infoStates[a][newFilter.chartParam]
                    : infoStates[a][newFilter.chartParam] -
                      infoStates[b][newFilter.chartParam]
            )
            .slice(0, n);

        setAnchorEl(null);
        return filtered;
    };

    const handleFilters = () => {
        let selected = [];
        let currSelection = [];
        filters.forEach((d, i) => {
            if (d.type === "Region" || d.type === "Governor") {
                currSelection = handleFilterCategories(d);
            } else if (d.type === "Pop." || d.type === "GDP") {
                currSelection = handleFilterValues(d);
            }

            selected =
                selected.length < 1
                    ? currSelection
                    : currSelection.filter(s => selected.includes(s));
        });

        setSelectedCircles(prevState => ({
            ...prevState,
            selected: selected,
            notSelected: prevState.all.filter(s => !selected.includes(s)),
        }));
    };

    useEffect(() => {
        filters.length > 0
            ? handleFilters()
            : setSelectedCircles(prevState => ({
                  ...prevState,
                  selected: [],
                  notSelected: prevState.all,
              }));
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
                open={
                    anchorEl ? Boolean(anchorEl.id === "select-filter") : false
                }
                onClose={handleMenu}
            >
				<MenuList>
					<FilterRegion handleFilter={handleFilter} />
					<FilterGovernor handleFilter={handleFilter} />
					<FilterPopulation handleFilter={handleFilter} nStates={nStates} />
					<FilterGdp handleFilter={handleFilter} nStates={nStates} />
				</MenuList>
            </Menu>

            <Paper component="ul" className={classes.chipContainer}>
                {filters.length > 0 ? (
                    filters.map(f => {
                        return (
                            <li key={f.id}>
                                <Chip
                                    size="small"
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
