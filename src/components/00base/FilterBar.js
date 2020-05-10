// WRAPPER COMPONENT

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  ClickAwayListener,
  Drawer,
  Divider,
  Menu,
  MenuItem,
} from "@material-ui/core";
import clsx from "clsx";

// styles
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

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
	color: theme.palette.primary.contrastText,
	'&:hover': {
		backgroundColor: 'transparent'
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

export const FilterBarCovidCompare = (props) => {
	const [open, setOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const theme = useTheme();
	const classes = useStyles();

	const handleDrawer = () => {
		setOpen(!open);
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
			style={{
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
			}}
		>
			<Toolbar>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClick={handleMenuClickAway}
					MenuListProps={{ onMouseLeave: handleMenuClickAway }}
				>
					{props.children}
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
				style={{ color: theme.palette.text.primary }}
			>
				<div
				className={classes.drawerHeader}
				style={{ backgroundColor: theme.palette.primary.main }}
				>
					<IconButton
						color="inherit"
						edge="end"
						onClick={handleDrawer}
						style={{ color: theme.palette.primary.contrastText }}
					>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
			</Drawer>
		</ClickAwayListener>
    </div>
  );
};
