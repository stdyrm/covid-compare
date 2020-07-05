import React from 'react';

// styles
import { IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		justifyContent: "space-between",
		alignContent: "center"
	}
}));

const Footer = (props) => {
	const classes = useStyles();
	return (
		<Toolbar className={classes.wrapper}>
			<div>
				<p><strong>You may freely share, but please credit the source:</strong> Data is from the New York Times, based on reports from state and local agencies.</p>
			</div>
			<IconButton href="https://github.com/stdyrm/covidcompare" rel="noopener noreferrer" target="_blank">
				<GitHubIcon />
			</IconButton>
		</Toolbar>
	);
};

export default Footer;

