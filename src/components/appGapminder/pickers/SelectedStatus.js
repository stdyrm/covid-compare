import React, { useContext } from "react";

// context
import { selectionContext } from "../../../context/selectionContext";

// style
import { FormControlLabel, Checkbox, Divider, Tooltip, IconButton, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
	stateLabelList: {
		display: "block",
	},
	deselectAll: {
		display: "flex",
		alignContent: "center",
		paddingTop: theme.spacing(2)
	},
	deselectAllButton: {
		padding: 0,
		color: "#e32636",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	selectedLabel: { 
		fontSize: ".9rem",
		fontWeight: 300
	},
	notSelectedLabel: {
		fontSize: ".9rem",
		color: "gray",
		fontWeight: 300,
		opacity: 0.7
	},
}))


export const SelectedStatus = props => {
    const { handleChange, handleDeselectAll } = props;
    const { selectedCircles } = useContext(selectionContext);
	const classes = useStyles();
	const theme = useTheme();

    return (
        <>
			<div className={classes.deselectAll}>
				<Tooltip title="Deselect all">
					<IconButton
						className={classes.deselectAllButton}
						onClick={handleDeselectAll}
					>
						<ClearIcon />
					</IconButton>
				</Tooltip>
				<Typography display="inline">Deselect All</Typography>
			</div>
            {selectedCircles.selected &&
                selectedCircles.selected.sort().map((state, i) => {
                    return (
                        <FormControlLabel
                            key={i}
                            name={state}
                            checked={selectedCircles.selected.includes(state)}
                            onChange={handleChange}
                            control={
                                <Checkbox
                                    name={state}
									className={classes.selectedLabel}
                                />
                            }
							label={state}
							className={classes.stateLabelList}
							classes={{label: classes.selectedLabel}}
                        />
					);
                })}
				<Divider />
            <br />
            {selectedCircles.notSelected &&
                selectedCircles.notSelected.sort().map((state, i) => {
                    return (
                        <FormControlLabel
                            key={i}
                            name={state}
                            checked={selectedCircles.selected.includes(state)}
                            onChange={handleChange}
                            control={
                                <Checkbox
                                    name={state}
									className={classes.notSelectedLabel}
                                />
                            }
							label={state}
							className={classes.stateLabelList}
							classes={{label: classes.notSelectedLabel}}
                        />
                    );
                })}
        </>
    );
};
