import { createMuiTheme } from "@material-ui/core/styles";

const darkPrimary = "#000018";
const darkSecondary = "#1c847f"; 
const darkText = "#fff";
const darkBackground = "#29293d";

const lightPrimary = "#1c847f";
const lightText = "#29293d";
const lightBackground = "#fff";

const themeDark = createMuiTheme({
  palette: {
	  type: 'dark',
    primary: {
      main: "#000018",
      contrastText: "#fff",
	},
	secondary: {
		main: darkSecondary,
		contrastText: darkText,
	},
    background: {
      default: "#29293d",
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
    contrastThreshold: 3,
  },
  typography: {
    fontFamily: ["ralewaymedium", "Helvetica", "Arial", "sans-serif"].join(","),
  },
  overrides: {
    MuiFormControlLabel: {
      root: {
        color: "#fff",
        textColor: "#fff",
      },
      label: {
        color: "#fff",
        textColor: "#fff",
      },
    },
    MuiTypography: {
      root: {
        color: "#fff",
        textColor: "#fff",
      },
    },
    MuiMenu: {
      root: {
        color: "#fff",
      },
      paper: {
        backgroundColor: "#29293d",
        textColor: "#fff",
      },
    },
    MuiMenuItem: {
      root: {
        backgroundColor: "#29293d",
        color: "#fff",
      },
    },
    MuiButton: {
      raisedPrimary: {
        color: "#fff",
      },
      root: {
        color: "#fff",
      },
      label: {
        color: "#fff",
      },
      text: {
        color: "#fff",
      },
    },
    MuiBase: {
      root: {
        color: "#fff",
      },
    },
    MuiInputBase: {
      root: {
        color: "#fff",
        maxWidth: 115,
        paddingLeft: 10,
      },
	},
    MuiPickersCalendarHeader: {
      switchHeader: {
		backgroundColor: darkPrimary,
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
      main: "#1c847f",
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
    fontFamily: ["ralewaymedium", "Helvetica", "Arial", "sans-serif"].join(","),
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        color: "#fff",
      },
    },
    MuiTypography: {
      root: {
        color: "#29293d",
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: "#fff",
        textColor: "#29293d",
      },
    },
    MuiMenuItem: {
      root: {
        backgroundColor: "#fff",
        color: "#29293d",
      },
    },
    MuiButton: {
      root: {
        color: "#fff",
      },
      label: {
        color: "#fff",
      },
      text: {
        color: "#fff",
      },
	},
	MuiInputBase: {
		root: {
		  color: "#29293d",
		  maxWidth: 115,
		  paddingLeft: 10,
		},
	},
    MuiPickersCalendarHeader: {
      switchHeader: {
		color: "#fff",
        // backgroundColor: lightPrimary,
      },
    },
    MuiPickersDay: {
      day: {
        color: lightPrimary,
      },
      daySelected: {
        backgroundColor: lightPrimary,
      },
      dayDisabled: {
        color: lightPrimary,
      },
      current: {
        color: lightPrimary,
      },
    },
  },
});

export { themeDark, themeLight };
