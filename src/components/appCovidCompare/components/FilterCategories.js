// REUSABLE COMPONENT

import React from 'react';
import PropTypes from "prop-types";

import { MenuItem } from "@material-ui/core";

export const FilterCategories = (props) => {
	const { filterOptions, handleSelectedFilter, handleMenu } = props;

	const handleMenuClick = (newFilter) => {
		handleMenu();
		handleSelectedFilter(newFilter);
	}; 

	return (
		<>
			{filterOptions.map(o => {
				return (
					<MenuItem 
						key={o.id}
						id={o.id} 
						onClick={() => handleMenuClick(o)}
				>
					{o.name}
				</MenuItem>
				)
			})}
		</>
	);
};

FilterCategories.propTypes = {
	filterOptions: PropTypes.shape([{
		id: PropTypes.string.isRequired, // unique ID; html format 
		name: PropTypes.string, // user-facing name of filter 
		type: PropTypes.string, // user-facing parameter being filtered (eg. "Region")
		chartParam: PropTypes.string.isRequired, // match exact parameter name (eg. "region")
	}]),
	info: PropTypes.objectOf(PropTypes.object).isRequired
};