// WRAPPER COMPONENT (FilterValues)

import React, { useState } from "react";
import { FilterValues } from "../components/FilterValues";

import { Menu, Button } from "@material-ui/core";

export const FilterGDP = props => {
    const {
        nStates,
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
                Filter GDP
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
