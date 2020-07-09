import React, { useContext } from "react";
import { saveSvgAsPng } from "save-svg-as-png";

// context
import { ThemeContext } from "../context/ThemeContext";

// styles
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "../styles/styles.css";
import { IconButton, Tooltip, Typography, MenuItem } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Brightness7Icon from "@material-ui/icons/Brightness7";

export const Settings = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const useStyles = makeStyles(theme => ({
    rootGrid: {
      maxWidth: window.innerWidth,
      margin: "0 auto",
    },
    footerButton: {
      color: theme.palette.text.secondary,
      "&:hover": {
        backgroundColor: "transparent",
      },
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
          text:
            "@font-face {font-family:'ralewaymedium';src:url('../styles/fonts/raleway-medium-webfont.woff2') format('woff2'),url('../styles/fonts/raleway-medium-webfont.woff') format('woff')}",
          url: "../styles/fonts/raleway-medium-webfont.woff",
          format: "application/font-woff",
        },
      ],
    });
  };

  return (
    <>
      <MenuItem onClick={saveImage}>
        <Tooltip title="Save chart as image" placement="right">
          <IconButton className={classes.footerButton}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Typography display="inline">Save chart</Typography>
      </MenuItem>
      <MenuItem onClick={() => setDarkMode(!darkMode)}>
        <Tooltip title="Toggle dark/light theme" placement="right">
          <IconButton className={classes.footerButton}>
            <Brightness7Icon />
          </IconButton>
        </Tooltip>
        <Typography display="inline">Dark mode</Typography>
      </MenuItem>
    </>
  );
};
