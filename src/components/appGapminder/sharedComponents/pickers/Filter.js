import React, { useState, useContext, forwardRef } from "react";

// context
import { statesContext } from "../../../../context/statesContext";

// style
import { MenuItem } from "@material-ui/core";

export const Filter = forwardRef((props, ref) => {
    const { handleFilter, filterData } = props;

    const { infoStates } = useContext(statesContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    return (
        <>
            {infoStates &&
                filterData.map(d => {
                    return (
                        <MenuItem
                            key={d.id}
                            id={d.id}
                            onClick={() => handleFilter(d)}
                            onClose={handleMenu}
                        >
                            {d.name}
                        </MenuItem>
                    );
                })}
        </>
    );
});
