import React from 'react';
import { saveSvgAsPng } from 'save-svg-as-png';

// constants
import { dimensions } from './util/constants';

// styles
import { makeStyles, useTheme } from '@material-ui/core/styles';
import '../styles/styles.css';
import { IconButton, Tooltip } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const { margin } = dimensions;

const useStyles = makeStyles((theme) => ({
    footnoteText: {
        color: theme.palette.text.primary,
        textAlign: 'left',
        padding: 0,
        fontSize: 10,
        marginLeft: margin.left,
        marginRight: margin.right
    },
    saveButton: {
		color: theme.palette.text.secondary,
        float: 'left',
        marginLeft: margin.left,
        padding: 0
    },
    themeButton: {
        color: theme.palette.text.secondary,
        float: 'left',
        marginLeft: 20,
        padding: 0
    }
}));

const Footnotes = (props) => {
	const {darkMode, setDarkMode} = props;
    const classes = useStyles();
	const theme = useTheme();
	const path = window.location.pathname.replace('/','');

    const saveImage = () => {
        saveSvgAsPng(document.querySelector(`#${path}`), "covid-19_chart.png", {
			backgroundColor: theme.palette.background.default,
			encoderOptions: 1,
			fonts: [
				{
					url: "../../styles/ralewaymedium/raleway-medium-webfont.woff",
					format: "application/font-woff",
					text: "@font-face {font-family: 'ralewaymedium'; src: url('./ralewaymedium/raleway-medium-webfont.woff2') format('woff2'), url('./ralewaymedium/raleway-medium-webfont.woff') format('woff'); font-weight: normal;font-style: normal;}"
				}
			]
        });
	};

    return (
		<>
			<Tooltip title="Save chart as image" placement="right">
				<IconButton onClick={saveImage} className={classes.saveButton}>
					<SaveIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Toggle dark/light theme" placement="right">
				<IconButton onClick={() => setDarkMode(!darkMode)} className={classes.themeButton}>
					<Brightness7Icon />
				</IconButton>
			</Tooltip>
		</>
    )
};

export { Footnotes };