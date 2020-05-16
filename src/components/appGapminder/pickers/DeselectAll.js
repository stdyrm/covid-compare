import React from "react";

// style
import { IconButton, FormControlLabel } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

export const DeselectAll = (props) => {
	const { handleDeselectAll, classes } = props;

	return (
		<FormControlLabel
			id="deselect-all"
			label="Deselect All"
			name="Deselect All"
			className={classes.deselectAll}
			onClick={handleDeselectAll}
			control={
				<IconButton
					id="deselector-all"
					name="deselect-all"
					className={classes.deselectAllButton}
				>
					<ClearIcon />
				</IconButton>
			}
		/>
	)
};