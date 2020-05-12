import React from "react";

// style
import { FormControl, InputLabel, Select, MenuItem, Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
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
    },
    filterMenuItem: {
        color: theme.palette.text.primary,
        fontWeight: 500,
        fontSize: ".8rem",
    },
}));

export const ParamPicker = (props) => {
	const { selector, handleSelector } = props;
	const theme = useTheme();

	const mqSmall = useMediaQuery(theme.breakpoints.down("sm"));
	const classes = useStyles();

    return (
		<Grid container className={classes.rootContainer} style={mqSmall 
			? {flexDirection: "column", alignItems: "center"} 
			: {flexDirection: "row"}}
		>
            {Object.keys(selector).map((p) => {
                return (
                    <FormControl key={selector[p].output}>
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
        </Grid>
    );
};
