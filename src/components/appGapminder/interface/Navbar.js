import React, { useState } from "react";

// components
import ParamDashboard from "./ParamDashboard";
import FilterDashboard from "./FilterDashboard";
import { ChartPicker } from "../../sharedComponents/ChartPicker";
import { MenuDrawer } from "./MenuDrawer";
import { Settings } from "../../Settings";

// style
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Menu,
    MenuList,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    appBar: {
        backgroundColor: theme.palette.background.dark,
        color: theme.palette.text.primary,
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
}));

export const Navbar = props => {
    const { data, selector, handleSelector } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();

    const handleOptions = e => {
        !anchorEl ? setAnchorEl(e.currentTarget) : setAnchorEl(null);
    };

    const handleDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AppBar position="relative" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        onClick={handleDrawer}
                        edge="start"
                        disableRipple
                        className={classes.menuButton}
                    >
                        <MenuIcon className={classes.menuButton} />
                    </IconButton>
                    <span style={{ marginLeft: "auto" }}>
                        <Button onClick={handleOptions}>Options</Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
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
            <MenuDrawer
                mobileOpen={mobileOpen}
                handleDrawer={handleDrawer}
                persistent
            >
                <div>
                    <ParamDashboard
                        flexDirection="column"
                        data={data}
                        selector={selector}
                        handleSelector={handleSelector}
                    />
                </div>
                <div>
                    <FilterDashboard handleSelector={handleSelector} />
                </div>
            </MenuDrawer>
        </>
    );
};
