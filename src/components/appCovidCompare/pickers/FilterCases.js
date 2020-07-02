// WRAPPER COMPONENT (FilterValues)

import React, { useState } from "react";
import { FilterValues } from "../components/FilterValues";

import { Menu, Button } from "@material-ui/core";

export const FilterCases = props => {
    const { nStates, handleSelectedFilter } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    const filterOptions = [
        {
            id: "cases-high",
            name: `Top ${nStates} (total)`,
            type: "Cases",
            chartParam: "latestCaseCount",
            sort: "descending",
            n: nStates,
        },
        {
            id: "cases-low",
            name: `Bottom ${nStates} (total)`,
            type: "Cases",
            chartParam: "latestCaseCount",
            sort: "ascending",
            n: nStates,
        },
        {
            id: "cases-per-1000-high",
            name: `Top ${nStates} (per 1000)`,
            type: "Cases",
            chartParam: "latestCaseCountPerThou",
            sort: "descending",
            n: nStates,
        },
        {
            id: "cases-per-1000-low",
            name: `Bottom ${nStates} (per 1000)`,
            type: "Cases",
            chartParam: "latestCaseCountPerThou",
            sort: "ascending",
            n: nStates,
        },
    ];

    return (
        <>
            <Button id="cases-btn" onClick={handleMenu}>
                Filter Cases
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={anchorEl ? Boolean(anchorEl.id === "cases-btn") : false}
                onClose={handleMenu}
            >
                <FilterValues
                    filterOptions={filterOptions}
                    handleSelectedFilter={handleSelectedFilter}
                    handleMenu={handleMenu}
                />
            </Menu>
        </>
    );
};
