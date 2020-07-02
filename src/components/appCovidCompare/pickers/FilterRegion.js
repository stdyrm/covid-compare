// WRAPPER COMPONENT (FilterCategories)

import React, { useState } from "react";

// components
import { FilterCategories } from "../components/FilterCategories";

import { Menu, Button } from "@material-ui/core";

export const FilterRegion = props => {
    const { handleSelectedFilter } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    const filterOptions = [
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
        { id: "south", name: "South", type: "Region", chartParam: "region" },
        { id: "west", name: "West", type: "Region", chartParam: "region" },
    ];

    return (
        <>
            <Button id="region-btn" onClick={handleMenu}>
                Filter Region
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={anchorEl ? Boolean(anchorEl.id === "region-btn") : false}
                onClose={handleMenu}
            >
                <FilterCategories
                    filterOptions={filterOptions}
                    handleSelectedFilter={handleSelectedFilter}
                    handleMenu={handleMenu}
                />
            </Menu>
        </>
    );
};
