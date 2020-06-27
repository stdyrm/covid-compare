import React from "react";

// components
import { SectionTitle } from "../../sharedComponents/SectionTitle";

// styles
import {
    IconButton,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Divider,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    sectionTitleTypography: {
        color: theme.palette.text.primary,
        fontWeight: 700,
    },
    drawerBody: {
        alignText: "left",
        paddingLeft: theme.spacing(3),
    },
    selectAllButton: {
        color: "green",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    deselectAllButton: {
        color: "red",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    stateLabelSelected: {
        fontSize: ".9rem",
    },
    stateLabelNotSelected: {
        color: "gray",
        opacity: 0.7,
        fontSize: ".9rem",
    },
}));

export const Dashboard = props => {
    const {
        selectedStates,
        handleSelectedStates,
        handleSelectAllStates,
        handleDeselectAllStates,
    } = props;

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div>
            <SectionTitle
                divider
                classes={{ typography: classes.sectionTitleTypography }}
            >
                Selections
            </SectionTitle>
            <FormGroup className={classes.drawerBody}>
                <FormControlLabel
                    id="select-all"
                    label="Select All"
                    name="Select All"
                    onClick={handleSelectAllStates}
                    control={
                        <IconButton
                            id="selector-all"
                            name="select-all"
                            className={classes.selectAllButton}
                        >
                            <CheckIcon />
                        </IconButton>
                    }
                />
                <FormControlLabel
                    id="deselect-all"
                    label="Deselect All"
                    name="Deselect All"
                    onClick={handleDeselectAllStates}
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
                <Divider className={classes.divider} />
                {selectedStates ? (
                    Object.keys(selectedStates)
                        .sort()
                        .filter(s => selectedStates[s].selected === true)
                        .map((state, i) => {
                            return (
                                <FormControlLabel
                                    key={i}
                                    id={selectedStates[state].htmlFormat}
                                    name={state}
                                    checked={selectedStates[state].selected}
                                    onChange={handleSelectedStates}
                                    classes={{
                                        label: classes.stateLabelSelected,
                                    }}
                                    control={
                                        <Checkbox
                                            name={state}
                                            className={
                                                classes.stateLabelSelected
                                            }
                                            style={{
                                                color:
                                                    selectedStates[state].color,
                                            }}
                                        />
                                    }
                                    label={`${state} (${selectedStates[state].abbreviation})`}
                                />
                            );
                        })
                ) : (
                    <div />
                )}
                <Divider className={classes.divider} />
                {selectedStates ? (
                    Object.keys(selectedStates)
                        .sort()
                        .filter(s => selectedStates[s].selected === false)
                        .map((state, i) => {
                            return (
                                <FormControlLabel
                                    key={i}
                                    id={selectedStates[state].htmlFormat}
                                    name={state}
                                    checked={selectedStates[state].selected}
                                    onChange={handleSelectedStates}
                                    classes={{
                                        label: classes.stateLabelNotSelected,
                                    }}
                                    control={
                                        <Checkbox
                                            name={state}
                                            className={
                                                classes.stateLabelNotSelected
                                            }
                                        />
                                    }
                                    label={`${state} (${selectedStates[state].abbreviation})`}
                                />
                            );
                        })
                ) : (
                    <div />
                )}
            </FormGroup>
        </div>
    );
};
