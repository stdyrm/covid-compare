import React from "react";

// style
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    rootContainer: {
        maxWidth: 750,
        minWidth: 175,
        justifyContent: "space-evenly",
        padding: 0,
        margin: 0,
    },
    filterSelector: {
        minWidth: 150,
        fontWeight: 500,
        fontSize: ".8rem",
        color: theme.palette.text.primary,
    },
    filterMenuItem: {
        color: theme.palette.text.primary,
        fontWeight: 500,
        fontSize: ".8rem",
    },
}));

export const ParamPicker = props => {
    const { flexDirection, selector, handleSelector } = props;
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.rootContainer}
            style={
                flexDirection === "row"
                    ? { flexDirection: "row", justifyContent: "space-evenly" }
                    : { flexDirection: "column" }
            }
        >
            {Object.keys(selector).map(p => {
                return (
                    <FormControl key={selector[p].output}>
                        <InputLabel>{selector[p].output}</InputLabel>
                        <Select
                            name={p}
                            value={selector[p].selected}
                            onChange={handleSelector}
                            className={classes.filterSelector}
                        >
                            {selector[p].options.map(o => {
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
        </Grid>
    );
};
