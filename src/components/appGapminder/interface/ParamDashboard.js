import React from "react";

// components
import { ParamPicker } from "../pickers/ParamPicker";

// style
import { IconButton, Tooltip, Menu, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssessmentIcon from "@material-ui/icons/Assessment";

const useStyles = makeStyles(theme => ({
    menuButton: {
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
}));

export const ParamDashboard = props => {
    const {
        mqSmall,
        data,
        selector,
        handleSelector,
        handleParamMenu,
        anchorEl,
    } = props;
    const classes = useStyles();

    return (
        <>
            {mqSmall ? (
                <span>
                    <Tooltip title="Chart parameters">
                        <IconButton
                            id="parameters-btn"
                            className={classes.menuButton}
                            onClick={handleParamMenu}
                        >
                            <AssessmentIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={
                            anchorEl
                                ? Boolean(anchorEl.id === "parameters-btn")
                                : false
                        }
                        onClose={handleParamMenu}
                    >
                        <List>
                            <ParamPicker
                                data={data}
                                selector={selector}
                                handleSelector={handleSelector}
                            />
                        </List>
                    </Menu>
                </span>
            ) : (
                <ParamPicker
                    data={data}
                    selector={selector}
                    handleSelector={handleSelector}
                />
            )}
        </>
    );
};