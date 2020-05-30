import React from "react";

// components
import { ParamPicker } from "../pickers/ParamPicker";
import { SectionTitle } from "../../sharedComponents/SectionTitle";

// style
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    menuButton: {
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: "transparent",
        },
	},
	filterBody: {
		paddingLeft: theme.spacing(3),
		marginBottom: theme.spacing(4)
	},
}));

export const ParamDashboard = props => {
    const {
		flexDirection,
        data,
        selector,
        handleSelector,
    } = props;
    const classes = useStyles();

    return (
        <>
			<SectionTitle divider>
				Parameters
			</SectionTitle>
			<div className={classes.filterBody}>
				<ParamPicker
					flexDirection={flexDirection}
					data={data}
					selector={selector}
					handleSelector={handleSelector}
				/>
			</div>
        </>
    );
};