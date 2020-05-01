import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import USStates from "../../data/us-states.csv";

export const DataReader = (props) => {
	
	useEffect(() => {
		const getData = async () => {
			d3.csv(USStates)
				.then(res => {
					console.log(res)
				})

		};

		getData();
	}, []);

	return null;
};