import React, { Fragment } from 'react';

// style
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	filterSelector: {
		minWidth: 200
	},
	filterMenuItem: {
		color: theme.palette.text.primary,
	}
}));

export const FilterGapminder = (props) => {
	const { data, selector, handleSelector } = props;
	const { xParam, yParam, zParam, cParam, tParam } = selector;

	const classes = useStyles();

	return (
		<Fragment>
			<FormControl>
				<InputLabel>X-axis</InputLabel>
				<Select
					name="xParam"
					value={xParam.selected}
					onChange={handleSelector}
					className={classes.filterSelector}
				>
					{xParam.options.map((d,i) => {
						return (
							<MenuItem 
								key={d} 
								value={d}
								className={classes.filterMenuItem}
							>
								{d}
							</MenuItem>
						)
					})}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel>Y-axis</InputLabel>
				<Select
					name="yParam"
					value={yParam.selected}
					onChange={handleSelector}
					className={classes.filterSelector}
				>
					{yParam.options.map((d,i) => {
						return (
							<MenuItem key={d} value={d}>
								{d}
							</MenuItem>
						)
					})}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel>Size parameter</InputLabel>
				<Select
					name="zParam"
					value={zParam.selected}
					onChange={handleSelector}
					className={classes.filterSelector}
				>
					{zParam.options.map((d,i) => {
						return (
							<MenuItem key={d} value={d}>
								{d}
							</MenuItem>
						)
					})}
				</Select>
			</FormControl>
			<FormControl>
				<InputLabel>Color categories</InputLabel>
				<Select
					name="cParam"
					value={cParam.selected}
					onChange={handleSelector}
					className={classes.filterSelector}
				>
					{cParam.options.map((d,i) => {
						return (
							<MenuItem key={d} value={d}>
								{d}
							</MenuItem>
						)
					})}
				</Select>
			</FormControl>
		</Fragment>
	);
};

