import React, { useState, useContext } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    ClickAwayListener,
    Drawer,
    Divider,
    Menu,
	MenuItem,
	Tooltip
} from "@material-ui/core";
import clsx from "clsx";

// components
import { BatchSelect } from "./BatchSelect";
import { Dashboard } from "./Dashboard";

// styles
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import AssessmentIcon from "@material-ui/icons/Assessment";
import TimelineIcon from "@material-ui/icons/Timeline";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        backgroundColor: theme.palette.primary.main,
    },
    appBar: {
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
    },
}));

export const FilterBarCovidCompare = props => {
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
	
	const theme = useTheme();
    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClickAway = e => {
        if (e.x > drawerWidth && e.y > 70 && open) {
            setOpen(false);
        }
    };

    const handleMenu = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="relative"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                }}
            >
                <Toolbar>
                    <IconButton
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                        style={{ color: theme.palette.text.primary }}
                        disableRipple
                    >
                        <MenuIcon className={classes.menuButton} />
                    </IconButton>
                    <BatchSelect {...props} />
					<span style={{marginLeft: "auto"}}>
						<Tooltip title="Line chart">
							<IconButton component="a" href="/covidcompare" className={classes.menuButton}>
								<TimelineIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Gapminder chart">
							<IconButton component="a" href="/gapminder" className={classes.menuButton}>
								<BubbleChartIcon />
							</IconButton>
						</Tooltip>
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
                    style={{ color: theme.palette.text.primary }}
                >
                    <div
                        className={classes.drawerHeader}
                        style={{ backgroundColor: theme.palette.primary.main }}
                    >
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
