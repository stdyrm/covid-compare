import React from "react";

// styles
import { Toolbar, Hidden, Drawer, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  componentWrapper: {},
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  drawerTitle: {
    paddingTop: theme.spacing(3),
  },
  appMenuListButtons: {
    marginLeft: theme.spacing(3),
  },
}));

export const ParamDrawer = props => {
  const { mobileOpen, handleDrawer, persistent } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.componentWrapper}>
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
    </div>
  );
};
