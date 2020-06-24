import React from 'react';

// styles
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const ParamPicker = (props) => {
	const { selectedYParam, setSelectedYParam } = props;

	return (
		<FormControl>
			<InputLabel>Y-Axis</InputLabel>
			<Select
				value={selectedYParam}
				onChange={(e) => setSelectedYParam(e.target.value)}
			>
				<MenuItem
					id="y-param-cases-100"
					value="casesPerThousand"
				>
					Cases/1000
				</MenuItem>
				<MenuItem
					id="y-param-new-cases"
					value="newCases"
				>
					New cases
				</MenuItem>

			</Select>
		</FormControl>
	)
};

export { ParamPicker };

