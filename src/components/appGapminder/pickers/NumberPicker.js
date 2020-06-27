import React from "react";

// style
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    filterSelector: {
        minWidth: 150,
        fontWeight: 500,
        fontSize: ".8rem",
        color: theme.palette.text.primary,
    },
    input: {
        color: theme.palette.text.primary,
    },
}));

export const NumberPicker = props => {
    const { nStates, setNStates } = props;
    const classes = useStyles();

    return (
        <TextField
            id="n-states"
            size="small"
            type="number"
            label="Filter n states"
            InputProps={{
                inputProps: {
                    min: 1,
                    max: 50,
                    className: classes.input,
                },
            }}
            defaultValue={nStates}
            onChange={e => setNStates(e.target.value)}
            className={classes.filterSelector}
        />
    );
};
