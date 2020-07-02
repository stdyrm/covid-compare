import React, { useState, useEffect, useContext } from "react";

// context
import { selectionContext } from "../../../context/selectionContext";
import { statesContext } from "../../../context/statesContext";

// components
import { Filter } from "../sharedComponents/pickers/Filter";

// style
import { Chip, FormControl, InputLabel, Select, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    button: {
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
	filterSelector: {
		display: "block",
        minWidth: 175,
        fontWeight: 500,
        fontSize: ".8rem",
    },
    chipContainer: {
        listStyle: "none",
        backgroundColor: "transparent",
        padding: 0,
    },
    chip: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.contrastText,
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
        handleSelector,
    } = props;
    const { setSelectedCircles } = useContext(selectionContext);
    const { infoStates } = useContext(statesContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const handleFilterCategories = newFilter => {
        const filtered = Object.keys(infoStates).filter(
            s => infoStates[s][newFilter.chartParam] === newFilter.name
        );

        setAnchorEl(null);
        return filtered;
    };

    const filterParams = [
        {
            category: "Region",
            params: [
                {
                    id: "northeast",
                    name: "Northeast",
                    type: "Region",
                    chartParam: "region",
                },
                {
                    id: "midwest",
                    name: "Midwest",
                    type: "Region",
                    chartParam: "region",
                },
                {
                    id: "south",
                    name: "South",
                    type: "Region",
                    chartParam: "region",
                },
                {
                    id: "west",
                    name: "West",
                    type: "Region",
                    chartParam: "region",
                },
            ],
        },
        {
            category: "Gov. party",
            params: [
                {
                    id: "democrat",
                    name: "Democrat",
                    type: "Governor",
                    chartParam: "governor",
                },
                {
                    id: "republican",
                    name: "Republican",
                    type: "Governor",
                    chartParam: "governor",
                },
            ],
        },
        {
            category: "Population",
            params: [
                {
                    id: "pop-high",
                    name: `Top ${nStates} (pop. total)`,
                    type: "Pop.",
                    chartParam: "population",
                    sort: "descending",
                    n: nStates,
                },
                {
                    id: "pop-low",
                    name: `Bottom ${nStates} (pop. total)`,
                    type: "Pop.",
                    chartParam: "population",
                    sort: "ascending",
                    n: nStates,
                },
                {
                    id: "pop-density-high",
                    name: `Top ${nStates} (pop. density)`,
                    type: "Pop.",
                    chartParam: "populationDensity",
                    sort: "descending",
                    n: nStates,
                },
                {
                    id: "pop-density-low",
                    name: `Bottom ${nStates} (pop. density)`,
                    type: "Pop.",
                    chartParam: "populationDensity",
                    sort: "ascending",
                    n: nStates,
                },
            ],
        },
        {
            category: "GDP",
            params: [
                {
                    id: "gdp-high",
                    name: `Top ${nStates} (2019 GDP)`,
                    type: "GDP",
                    chartParam: "gdp",
                    sort: "descending",
                    n: nStates,
                },
                {
                    id: "gdp-low",
                    name: `Bottom ${nStates} (2019 GDP)`,
                    type: "GDP",
                    chartParam: "gdp",
                    sort: "ascending",
                    n: nStates,
                },
            ],
        },
    ];

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
            {filterParams.map(f => (
                <FormControl key={f.category}>
                    <InputLabel>{f.category}</InputLabel>
                    <Select
                        name={f.category}
                        onChange={handleSelector}
                        className={classes.filterSelector}
                    >
                        <Filter
                            handleFilter={handleFilter}
                            filterData={f.params}
                        />
                    </Select>
                </FormControl>
            ))}
            <Box component="ul" className={classes.chipContainer}>
                {filters.length > 0 &&
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
                    })}
            </Box>
        </>
    );
};
