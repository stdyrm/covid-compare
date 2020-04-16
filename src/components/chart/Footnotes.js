import React, { useState, useContext } from 'react';
import { saveSvgAsPng } from 'save-svg-as-png';

// context
import { themeContext } from '../../context/themeContext';

// constants
import { dimensions } from '../util/constants';

// styles
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/styles.css';
import { IconButton, Tooltip } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const { margin } = dimensions;

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#f2ffcc',
        textAlign: 'left',
        padding: 0,
        fontSize: 10,
        marginLeft: margin.left,
        marginRight: margin.right
    },
    saveButton: {
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

const Footnotes = () => {
    const classes = useStyles();
	const {theme, selectTheme} = useContext(themeContext);
	// const [darkTheme, setDarkTheme] = useState(true);

    const saveImage = () => {
        saveSvgAsPng(document.querySelector("#chart"), "covid-19_chart.png", {
			backgroundColor: theme.palette.background.default,
            encoderOptions: 1 
        });
	};

    return (
        <div style={{backgroundColor: theme.palette.background.default}}>
            <p className={classes.root}>Line marking indicates day of lockdown order/advisory</p>
            <p className={classes.root}>Freeze/unfreeze focus by clicking on chart</p>
            <Tooltip title="Save chart as image" placement="right">
                <IconButton onClick={saveImage} className={classes.saveButton} style={{color: theme.palette.text.primary}}>
                    <SaveIcon />
                </IconButton>
			</Tooltip>
        </div>
    )
};

export { Footnotes };