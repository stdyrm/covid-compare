import React, { useContext } from "react";

// context
import { selectionContext } from "../../../context/selectionContext";

// style
import { FormControlLabel, Checkbox, Typography, Divider } from "@material-ui/core";

export const SelectedStatus = props => {
    const { handleChange, theme, classes } = props;
    const { selectedCircles } = useContext(selectionContext);

    return (
        <>
            <Typography className={classes.dashboardTitle}>Selected</Typography>
            <Divider className={classes.dashboardDivider} />
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
                                    style={{
                                        color:
                                            theme.palette.primary.contrastText,
                                    }}
                                />
                            }
                            label={state}
                        />
                    );
                })}
            <br />
            <Typography className={classes.dashboardTitle}>
                Not Selected
            </Typography>
            <Divider className={classes.dashboardDivider} />
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
                                    style={{
                                        color:
                                            theme.palette.primary.contrastText,
                                    }}
                                />
                            }
                            label={state}
                        />
                    );
                })}
        </>
    );
};
