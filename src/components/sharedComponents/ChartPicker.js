import React from "react";

// style
import { IconButton, Tooltip, Typography, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import TimelineIcon from "@material-ui/icons/Timeline";

const useStyles = makeStyles(theme => ({
    menuButton: {
        color: theme.palette.text.secondary,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
}));

export const ChartPicker = () => {
    const classes = useStyles();

    return (
        <>
            <MenuItem component="a" href="/covidcompare/#/line-app">
                <Tooltip title="Line chart">
                    <IconButton className={classes.menuButton}>
                        <TimelineIcon />
                    </IconButton>
                </Tooltip>
                <Typography display="inline">Line chart</Typography>
            </MenuItem>
            <MenuItem component="a" href="/covidcompare/#/gapminder-app">
                <Tooltip title="Gapminder chart">
                    <IconButton className={classes.menuButton}>
                        <BubbleChartIcon />
                    </IconButton>
                </Tooltip>
                <Typography display="inline">Gapminder chart</Typography>
            </MenuItem>
        </>
    );
};
