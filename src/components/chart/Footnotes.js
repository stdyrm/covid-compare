import React from 'react';

// constants
import { dimensions } from '../util/constants';

// styles
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/styles.css';

const { margin } = dimensions;

const useStyles = makeStyles({
    root: {
        color: '#f2ffcc',
        textAlign: 'left',
        padding: 0,
        fontSize: 10,
        marginLeft: margin.left,
        marginRight: margin.right
    }
})

const Footnotes = () => {
    const classes = useStyles();
    return (
        <>
            <p className={classes.root}>Line marking indicates day of lockdown order/advisory</p>
            <p className={classes.root}>*Data from The New York Times, based on reports from state and local health agencies.</p>
            <p className={classes.root}>*Population data from US Census Bureau (2019).</p>
            <p className={classes.root}>*WA: although 2/27 is counted as 'Day 1,' WA had an isolated case on 1/21.</p>
        </>
    )
};

export { Footnotes };