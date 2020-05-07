import React from "react";

// style
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    filterSelector: {
        minWidth: 150,
        fontWeight: 500,
        fontSize: ".8rem",
        marginRight: 30,
    },
    filterMenuItem: {
        color: theme.palette.text.primary,
        fontWeight: 500,
        fontSize: ".8rem",
    },
}));

export const ParamPicker = ({ selector, handleSelector }) => {
    const classes = useStyles();

    return (
        <>
            {Object.keys(selector).map((p) => {
                return (
                    <FormControl>
                        <InputLabel>{selector[p].output}</InputLabel>
                        <Select
                            name={p}
                            value={selector[p].selected}
                            onChange={handleSelector}
                            className={classes.filterSelector}
                        >
                            {selector[p].options.map((o) => {
                                return (
                                    <MenuItem
                                        key={o}
                                        value={o}
                                        className={classes.filterMenuItem}
                                    >
                                        {o}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                );
            })}
        </>
    );
};
