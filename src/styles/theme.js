import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      background: {
        default: "#29293d",
      },
      text: {
        primary: "#fff",
        secondary: "#f2ffcc",
      },
      contrastThreshold: 3,
    },
    typography: {
      fontFamily: "Raleway, Arial",
    },
    overrides: {
      MuiMenu: {
        paper: {
          backgroundColor: "#29293d"
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

export { theme };