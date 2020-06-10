import React, { useState, useContext, forwardRef } from "react";

// context
import { statesContext } from "../../../../context/statesContext";

// style
import { MenuItem } from "@material-ui/core";

const regionOptions = [
    { id: "northeast", name: "Northeast", type: "Region", chartParam: "region" },
    { id: "midwest", name: "Midwest", type: "Region", chartParam: "region" },
    { id: "south", name: "South", type: "Region", chartParam: "region" },
    { id: "west", name: "West", type: "Region", chartParam: "region" },
];

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
