import { createMuiTheme } from "@material-ui/core/styles";

const darkPrimary = "#000018";
const darkSecondary = "#1c847f";
const darkText = "#fff";
const darkBackground = "#29293d";

const lightPrimary = "#1c847f";
const lightText = "#29293d";
const lightBackground = "#fff";


export const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#000018",
            contrastText: "#fff",
        },
        secondary: {
            main: darkSecondary,
            contrastText: darkText,
        },
        text: {
            primary: "#fff",
            secondary: "#fff",
		},
		background: {
			default: darkBackground,
		},
        contrastThreshold: 3,
    },
    typography: {
        fontFamily: ["ralewaymedium", "Helvetica", "Arial", "sans-serif"].join(
            ","
        ),
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

export const getTheme = (theme, darkMode) => {
	if (darkMode) {
 		return createMuiTheme({
			...theme,
			palette: {
				...theme.palette,
				type: "dark",
				primary: {
					main: "#000018",
					contrastText: "#fff",
				},
				background: {
					default: "#29293d",
				},
				text: {
					primary: "#fff",
					secondary: "#fff",
				},
			},
			overrides: {
				...theme.overrides,
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
			}
		});		
	} else {
		return createMuiTheme({
			...theme,
			palette: {
				...theme.palette,
				type: "light",
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
			},
			overrides: {
				...theme.overrides,
				MuiButton: {
					root: {
						color: "#29293d",
					},
					label: {
						color: "#29293d",
					},
					text: {
						color: "#29293d",
					},
				},
				MuiInputBase: {
					input: {
						color: "#29293d",
					}
				}
			}
		});
	}
  }