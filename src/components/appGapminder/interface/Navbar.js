import React, { useState } from "react";
import clsx from "clsx";

// components
import { ParamDashboard } from "./ParamDashboard";
import { ChartPicker } from "./ChartPicker";
import { MenuDrawer } from "./MenuDrawer";

// style
import { AppBar, Toolbar, IconButton, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    appBar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    hide: {
        display: "none",
    },
}));

export const Navbar = props => {
    const { data, selector, handleSelector } = props;

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();
    const theme = useTheme();
    const mqSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleParamMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    const handleClickAway = e => {
        if (e.x > drawerWidth && e.y > 70 && open) {
            setOpen(false);
        }
    };

    return (
        <>
            <AppBar
                position="relative"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        onClick={handleDrawer}
                        edge="start"
                        disableRipple
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon className={classes.menuButton} />
                    </IconButton>
                    <ParamDashboard
                        mqSmall={mqSmall}
                        data={data}
                        selector={selector}
                        handleSelector={handleSelector}
                        handleParamMenu={handleParamMenu}
                        anchorEl={anchorEl}
                    />
                    <span style={{ marginLeft: "auto" }}>
                        <ChartPicker />
                    </span>
                </Toolbar>
                <MenuDrawer
                    data={data}
                    handleDrawer={handleDrawer}
                    open={open}
                    handleClickAway={handleClickAway}
                />
            </AppBar>
        </>
    );
};
