import React, { useState } from "react";
import clsx from "clsx";

// components
import { FilterDashboard } from "../FilterDashboard";
import { ParamPicker } from "../pickers/ParamPicker";

// style
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    ClickAwayListener,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
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
        marginRight: theme.spacing(2),
        color: theme.palette.text.primary,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 1,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
        backgroundColor: theme.palette.background.default,
    },
    tab: {
        opacity: 0.7,
    },
    menuItem: {
        opacity: 0.7,
        "&:hover": {
            opacity: 1,
        },
        toolbar: {
            display: "flex",
            justifyContent: "flex-start",
        },
    },
}));

export const Navbar = (props) => {
    const { data, selector, handleSelector } = props;

    const [open, setOpen] = useState(false);

    const classes = useStyles();
    const theme = useTheme();

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleClickAway = (e) => {
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
                        <BubbleChartIcon className={classes.menuButton} />
                    </IconButton>
                    <ParamPicker
                        data={data}
                        selector={selector}
                        handleSelector={handleSelector}
                        className={classes.filters}
                    />
                </Toolbar>

                <ClickAwayListener onClickAway={handleClickAway}>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div
                            className={classes.drawerHeader}
                            style={{
                                backgroundColor: theme.palette.primary.main,
                            }}
                        >
                            <IconButton
                                color="inherit"
                                edge="end"
                                onClick={handleDrawer}
                                style={{
                                    color: theme.palette.primary.contrastText,
                                }}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <FilterDashboard data={data} />
                    </Drawer>
                </ClickAwayListener>
            </AppBar>
        </>
    );
};
