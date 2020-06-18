import React from 'react';
import { Slider, Typography } from "@material-ui/core";

export const DayCounterSlider = (props) => {
	const { dayCounter, setDayCounter } = props;

	return (
		<>
			<Typography variant="caption">Day of Outbreak</Typography>
			<Slider 
				id="day-counter-slider"
				value={dayCounter}
				valueLabelDisplay="auto"
				step={1}
				min={1}
				max={85}
				onChange={(e, newVal) => setDayCounter(newVal)}
			/>
		</>
	)
};

