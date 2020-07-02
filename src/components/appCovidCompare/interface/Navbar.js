import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    ClickAwayListener,
    Drawer,
    Divider,
    Menu,
    Tooltip,
    useMediaQuery,
} from "@material-ui/core";
import clsx from "clsx";

// components
import { BatchSelect, Dashboard, ParamPicker } from "../pickers";
import { Settings } from "../../Settings";
import { ChartPicker } from "../../sharedComponents/ChartPicker";

// styles
import { Button, MenuList } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import AssessmentIcon from "@material-ui/icons/Assessment";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    appBar: {
        backgroundColor: theme.palette.background.dark,
        color: theme.palette.text.primary,
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
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.default,
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
	},
	navbarPickers: {
		width: 750,
		display: "flex",
		alignContent: "baseline",
		justifyContent: "space-between",
	}
}));

export const Navbar = props => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const theme = useTheme();
    const classes = useStyles();
    const mqSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOptions = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    const handleClickAway = e => {
        if (e.x > drawerWidth && e.y > 70 && open) {
            setOpen(false);
        }
    };

    const handleFilterMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="relative"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                        disableRipple
                    >
                        <MenuIcon className={classes.menuButton} />
                    </IconButton>
                    {mqSmall ? (
                        <>
                            <Tooltip title="Chart filters">
                                <IconButton
                                    id="filters-btn-cc"
                                    onClick={handleFilterMenu}
                                    className={classes.menuButton}
                                >
                                    <AssessmentIcon />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                open={
                                    anchorEl
                                        ? Boolean(
                                              anchorEl.id === "filters-btn-cc"
                                          )
                                        : false
                                }
                                onClose={handleFilterMenu}
                                style={{ textAlign: "center" }}
							>
								<ParamPicker
									chartParams={props.chartParams}
									setChartParams={props.setChartParams}
								/>
                                <BatchSelect
                                    handleFilterMenu={handleFilterMenu}
                                    {...props}
                                />
                            </Menu>
                        </>
                    ) : (
                        <span
							className={classes.navbarPickers}
                        >
							<ParamPicker
								chartParams={props.chartParams}
								setChartParams={props.setChartParams}
							/>
							<BatchSelect {...props} />
                        </span>
                    )}

                    <span style={{ marginLeft: "auto" }}>
                        <Button id="options-btn-cc" onClick={handleOptions}>
                            Options
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={
                                anchorEl
                                    ? Boolean(anchorEl.id === "options-btn-cc")
                                    : false
                            }
                            onClose={handleOptions}
                        >
                            <MenuList
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <ChartPicker />
                                <Settings />
                            </MenuList>
                        </Menu>
                    </span>
                </Toolbar>
            </AppBar>
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
                    <div className={classes.drawerHeader}>
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={handleDrawerClose}
                            style={{
                                color: theme.palette.primary.contrastText,
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Dashboard {...props} />
                </Drawer>
            </ClickAwayListener>
        </div>
    );
};
