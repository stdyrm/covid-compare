import { createMuiTheme } from "@material-ui/core/styles";

const lightTheme = {
    palette: {
        type: "light",
        primary: {
            main: "#03a9f4",
            contrastText: "#29293d",
        },
        secondary: {
            main: "#ff9800",
        },
        background: {
            default: "#fff",
            paper: "#fff",
            light: "#fff",
            dark: "#fff",
        },
        text: {
            primary: "#29293d",
        },
    },
};

const darkTheme = {
    palette: {
        type: "dark",
        primary: {
            main: "#4db6ac",
        },
        secondary: {
            main: "#ffa07a",
        },
        background: {
            default: "#29293d",
            paper: "#29293d",
            light: "#493f5e",
            dark: "#000018",
        },
        text: {
            primary: "#fff",
        },
    },
};

export const theme = createMuiTheme({
    typography: {
        fontFamily: ["ralewaymedium", "Helvetica", "Arial", "sans-serif"].join(
            ","
        ),
    },
    overrides: {
        MuiInputBase: {
            root: {
                color: "#fff",
                maxWidth: 115,
                paddingLeft: 10,
            },
        },
    },
});

export const getTheme = (theme, darkMode) => {
    if (darkMode) {
        return createMuiTheme({
            ...theme,
            palette: {
                ...darkTheme.palette,
            },
        });
    } else {
        return createMuiTheme({
            ...theme,
            palette: {
                ...lightTheme.palette,
            },
        });
    }
};
