import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

// styles
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    typography: {
        color: theme.palette.text.primary,
        fontWeight: 700,
        fontSize: "1.2rem",
    },
    divider: {
        backgroundColor: theme.palette.text.primary,
        marginBottom: ".2rem",
    },
}));

export const SectionTitle = props => {
    const { divider, href, classes, innerProps } = props;
    const defaultClasses = useStyles();

    return (
        <>
            <Typography
                className={clsx(defaultClasses.typography, classes.typography)}
                {...innerProps.typography}
            >
                {props.children}
            </Typography>
            {divider && (
                <Divider
                    className={clsx(defaultClasses.divider, classes.divider)}
                    {...innerProps.divider}
                />
            )}
        </>
    );
};

SectionTitle.propTypes = {
    classes: PropTypes.object,
    innerProps: PropTypes.object,
};

SectionTitle.defaultProps = {
    classes: {},
    innerProps: {},
};
