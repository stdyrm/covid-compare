import React, { useState, forwardRef } from "react";

// style
import { Menu, MenuItem } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const FilterGdp = forwardRef((props, ref) => {
    const { handleFilter, nStates } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    const gdpOptions = [
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
    ];

    return (
        <MenuItem id="gdp-btn" dense={true} onClick={handleMenu}>
            GDP
            <ChevronRightIcon style={{ marginLeft: "auto" }} />
            <Menu
                anchorEl={anchorEl}
                open={anchorEl ? Boolean(anchorEl.id === "gdp-btn") : false}
                onClose={handleMenu}
            >
                {gdpOptions.map(o => {
                    return (
                        <MenuItem
                            key={o.id}
                            id={o.id}
                            onClick={() => handleFilter(o)}
                            onClose={handleMenu}
                        >
                            {o.name}
                        </MenuItem>
                    );
                })}
            </Menu>
        </MenuItem>
    );
});
