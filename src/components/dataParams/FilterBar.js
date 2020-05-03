import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  ClickAwayListener,
  Drawer,
  Divider,
  Menu,
  MenuItem
} from "@material-ui/core";
import clsx from "clsx";

// components
import { BatchSelect } from "./BatchSelect";
import { Dashboard } from "./Dashboard";

// context
import { themeContext } from '../../context/themeContext';

// styles
import { makeStyles } from "@material-ui/core/styles";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AssessmentIcon from '@material-ui/icons/Assessment';
import TimelineIcon from '@material-ui/icons/Timeline';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';


const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
	display: "flex",
	backgroundColor: theme.palette.primary.main,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
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

const FilterBar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const {theme, setTheme} = useContext(themeContext);
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickAway = (e) => {
    if (e.x > drawerWidth && e.y > 70 && open) {
      setOpen(false);
    }
  };

  const handleMenuClick = (e) => {
	  setAnchorEl(e.currentTarget);
  };

  const handleMenuClickAway = () => {
	setAnchorEl(null);
};

  return (
    <div className={classes.root}>
      <AppBar
        position="relative"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
		})}
		style={{backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}}
      >
        <Toolbar>
          <IconButton
			onClick={handleDrawerOpen}
            edge="start"
			className={clsx(classes.menuButton, open && classes.hide)}
			style={{color: theme.palette.text.primary}}
          >
            <MenuOutlinedIcon style={{color: theme.palette.primary.contrastText}} />
          </IconButton>
          <BatchSelect />
		  <IconButton
			aria-controls="viz-menu"
			aria-haspopup="true"
			onMouseOver={handleMenuClick}
			className={classes.tab}
		  >
			  <AssessmentIcon style={{color: theme.palette.primary.contrastText}} />
		  </IconButton>
		  <Menu
			id="viz-menu"
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClick={handleMenuClickAway}
			MenuListProps={{ onMouseLeave: handleMenuClickAway }}
			>
				<MenuItem component="a" href="/covidcompare">
					<TimelineIcon />
					Line chart
				</MenuItem>
				<MenuItem component="a" href="/gapminder">
					<BubbleChartIcon />
					Gapminder chart
				</MenuItem>
		  </Menu>
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
		  style={{color: theme.palette.text.primary}}
        >
          <div className={classes.drawerHeader} style={{backgroundColor: theme.palette.primary.main}}>
            <IconButton color="inherit" edge="end" onClick={handleDrawerClose} style={{color: theme.palette.primary.contrastText}}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Dashboard />
        </Drawer>
      </ClickAwayListener>
    </div>
  );
};

export { FilterBar };
