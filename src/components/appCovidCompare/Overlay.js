import React from 'react';
import * as d3 from "d3";

export const Overlay = (props) => {
	const { width, height } = props;
	// const getOverlay = () => {
	// 	return d3
	// 		.append("rect")
	// 		.attr("class", "overlay")
	// 		.attr("width", width)
	// 		.attr("height", height)
	// 		.style("fill", "red")
	// 		.attr("opacity", "0")
	// 		.on("mouseover", () => focus.style("display", null));
	// };
	const mouseOver = () => {
		d3.select("#focus")
			.style("display", null)
	};

	return (
		<>
			<g 
				className="focus"
				style={{display: "none"}}
			/>
			<rect 
				className="overlay"
				width={width}
				height={height}
				style={{fill: "red", opacity: 0.2}}
				onMouseOver={mouseOver}
			>
			</rect>
		</>
	)
};

