import React from 'react';

// style
import TextField from "@material-ui/core/TextField";

export const NumberPicker = (props) => {
	const { nStates, setNStates } = props;

	return (
		<TextField
			id="n-states"
			variant="outlined"
			size="small"
			type="number"
			label="Filter n states"
			InputProps={{
				inputProps: {
					min: 1,
					max: 50
				}
			}}
			defaultValue={nStates}
			onChange={(e) => setNStates(e.target.value)}
		/>
	)
};