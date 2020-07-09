import React from "react";

// style
import { Drawer, Hidden, Toolbar, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 1,
  },
  drawerPaper: {
    width: drawerWidth,
    alignItems: "left",
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
  const { mobileOpen, handleDrawer, persistent } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawer}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          <Toolbar />
          <Grid item style={{ marginBottom: "auto" }}>
            {props.children}
          </Grid>
        </Drawer>
      </Hidden>
      {persistent && (
        <Hidden smDown>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            open
          >
            <Toolbar />
            <div className={classes.drawerContainer}>{props.children}</div>
          </Drawer>
        </Hidden>
      )}
    </>
  );
};
