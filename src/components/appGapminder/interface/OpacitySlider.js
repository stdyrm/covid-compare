import React from 'react';
import { Slider, Typography } from "@material-ui/core";

export const OpacitySlider = (props) => {
	const { opacityNotSel, setOpacityNotSel } = props;

	return (
		<>	
			<Typography variant="caption">Non-selected opacity</Typography>
			<Slider 
				id="opacity-slider"
				value={opacityNotSel}
				valueLabelDisplay="auto"
				step={.1}
				min={0}
				max={1}
				onChange={(e, newVal) => setOpacityNotSel(newVal)}
				{...props}
			/>
		</>
	)
};

