import React from 'react';
import * as d3 from "d3";

export const Focus = (props) => {
	const { width, height } = props;

	// const getFocus = () => {
	// 	return d3
	// 		.select("#bounds")
	// 		.append("g")
	// 		.attr("class", "focus")
	// 		.style("display", "none");
	// };

	return (
		<g 
			className="focus"
			style={{display: "none"}}
		>
		</g>
	)
};

