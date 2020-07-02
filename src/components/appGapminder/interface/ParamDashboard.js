import React from "react";

// components
import { ParamPicker } from "../pickers/ParamPicker";
import { SectionTitle } from "../../sharedComponents/SectionTitle";

// style
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	paramPickerContainer: {},
    menuButton: {
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    filterBody: {
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
}));

const ParamDashboard = props => {
    const { flexDirection, data, selector, handleSelector } = props;
    const classes = useStyles();

    return (
        <div className={classes.paramPickerContainer}>
            <SectionTitle divider>Parameters</SectionTitle>
            <div className={classes.filterBody}>
                <ParamPicker
                    flexDirection={flexDirection}
                    data={data}
                    selector={selector}
                    handleSelector={handleSelector}
                />
            </div>
        </div>
    );
};

export default ParamDashboard;