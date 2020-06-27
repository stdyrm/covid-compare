// WRAPPER COMPONENT (FilterValues)

import React, { useState } from "react";
import { FilterValues } from "../components/FilterValues";

import { Menu, MenuItem, Button } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const FilterGDP = props => {
    const {
        nStates,
        selectedStates,
        setSelectedStates,
        handleSelectedFilter,
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    const filterOptions = [
        {
            id: "gdp-high",
            name: `Top ${nStates} (total)`,
            type: "Cases",
            chartParam: "cases",
            sort: "descending",
            n: nStates,
        },
        {
            id: "gdp-low",
            name: `Bottom ${nStates} (total)`,
            type: "Cases",
            chartParam: "cases",
            sort: "ascending",
            n: nStates,
        },
        {
            id: "gdp-per-1000-high",
            name: `Top ${nStates} (per 1000)`,
            type: "Cases",
            chartParam: "casesPerThousand",
            sort: "descending",
            n: nStates,
        },
        {
            id: "gdp-per-1000-low",
            name: `Bottom ${nStates} (per 1000)`,
            type: "Cases",
            chartParam: "casesPerThousand",
            sort: "ascending",
            n: nStates,
        },
    ];

    return (
        <>
            <Button id="gdp-btn" onClick={handleMenu}>
                Filter By Case
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={anchorEl ? Boolean(anchorEl.id === "gdp-btn") : false}
                onClose={handleMenu}
            >
                <FilterValues
                    filterOptions={filterOptions}
                    handleSelectedFilter={handleSelectedFilter}
                />
            </Menu>
        </>
    );
};
