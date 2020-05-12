import React from "react";
import { saveSvgAsPng } from "save-svg-as-png";

// styles
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "../styles/styles.css";
import { IconButton, Tooltip, Grid } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Brightness7Icon from "@material-ui/icons/Brightness7";

export const Footnotes = props => {
    const { darkMode, setDarkMode, wrapper, bounds } = props;
    const { margin } = wrapper;
	const { width } = bounds;
	
    const useStyles = makeStyles(theme => ({
        rootGrid: {
            maxWidth: width,
			margin: "0 auto",
        },
        footerButton: {
            color: theme.palette.text.secondary,
            marginRight: "auto",
        },
    }));
    const classes = useStyles();
    const theme = useTheme();

    const pathArray = window.location.href.split("/");
    const queryID = `#${pathArray[pathArray.length - 1]}`;

    const saveImage = () => {
        saveSvgAsPng(document.querySelector(queryID), "covid-19_chart.png", {
            backgroundColor: theme.palette.background.default,
            encoderOptions: 1,
            fonts: [
                {
                    url:
                        "../../styles/ralewaymedium/raleway-medium-webfont.woff",
                    format: "application/font-woff",
                    text:
                        "@font-face {font-family: 'ralewaymedium'; src: url('./ralewaymedium/raleway-medium-webfont.woff2') format('woff2'), url('./ralewaymedium/raleway-medium-webfont.woff') format('woff'); font-weight: normal;font-style: normal;}",
                },
            ],
        });
	};

    return (
        <Grid container className={classes.rootGrid}>
            <Grid item>
                <Tooltip title="Save chart as image" placement="right">
                    <IconButton
                        onClick={saveImage}
                        className={classes.footerButton}
                    >
                        <SaveIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title="Toggle dark/light theme" placement="right">
                    <IconButton
                        onClick={() => setDarkMode(!darkMode)}
                        className={classes.footerButton}
                    >
                        <Brightness7Icon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    );
};