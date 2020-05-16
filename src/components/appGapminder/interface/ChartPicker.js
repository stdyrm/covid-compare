import React from "react";

// style
import { IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import TimelineIcon from "@material-ui/icons/Timeline";

const useStyles = makeStyles(theme => ({
    menuButton: {
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
}));

export const ChartPicker = () => {
    const classes = useStyles();

    return (
        <>
            <Tooltip title="Line chart">
                <IconButton
                    component="a"
                    href="/covidcompare/#/line-app"
                    className={classes.menuButton}
                >
                    <TimelineIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Gapminder chart">
                <IconButton
                    component="a"
                    href="/covidcompare/#/gapminder-app"
                    className={classes.menuButton}
                >
                    <BubbleChartIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};
