import { createMuiTheme } from "@material-ui/core/styles";

const themeDark = createMuiTheme({
  palette: {
    primary: {
	  main: "#000018",
      contrastText: "#fff",
    },
    background: {
      default: "#29293d",
    },
    text: {
      primary: "#f2ffcc",
      secondary: "#fff",
    },
    contrastThreshold: 3,
  },
  typography: {
    fontFamily: "Raleway, Arial",
  },
  overrides: {
    MuiMenu: {
		root: {
			color: "#fff"
		},
      paper: {
		backgroundColor: "#29293d",
		textColor: "#fff"
      },
	},
	MuiMenuItem: {
		root: {
		  backgroundColor: "#29293d",
		  color: "#fff"
		},
	},
	MuiButton: {
		root: {
		  color: "#fff",
		},
	},
	MuiInputBase: {
		root: {
		  color: "#fff",
		  maxWidth: 100,
		  paddingLeft: 10,
		},
	  },
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: "#29293d",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#29293d",
      },
      daySelected: {
        backgroundColor: "#29293d",
      },
      dayDisabled: {
        color: "#29293d",
      },
      current: {
        color: "#29293d",
      },
    },
  },
});

const themeLight = createMuiTheme({
	palette: {
	  primary: {
		main: "#80deea",
		contrastText: "#fff",
	  },
	  background: {
		default: "#fff",
	  },
	  text: {
		primary: "#29293d",
		secondary: "#000018",
	  },
	  contrastThreshold: 3,
	},
	typography: {
	  fontFamily: "Raleway, Arial",
	},
	overrides: {
	  MuiMenu: {
		paper: {
		  backgroundColor: "#29293d",
		},
	  },
	  MuiPickersCalendarHeader: {
		switchHeader: {
		  color: "#29293d",
		},
	  },
	  MuiPickersDay: {
		day: {
		  color: "#29293d",
		},
		daySelected: {
		  backgroundColor: "#29293d",
		},
		dayDisabled: {
		  color: "#29293d",
		},
		current: {
		  color: "#29293d",
		},
	  },
	},
  });

export { themeDark, themeLight };
