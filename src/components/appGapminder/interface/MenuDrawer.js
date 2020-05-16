import React from "react";

// components
import { FilterDashboard } from "./FilterDashboard";

// style
import { IconButton, Drawer, ClickAwayListener } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 1,
    },
    drawerPaper: {
        width: drawerWidth,
        alignItems: "left",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        paddingLeft: "1rem",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
        backgroundColor: theme.palette.primary.main,
    },
}));

export const MenuDrawer = props => {
    const { data, handleDrawer, open, handleClickAway } = props;
    const classes = useStyles();
    const theme = useTheme();

    return (
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
    );
};