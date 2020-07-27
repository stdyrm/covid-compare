import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// data
import USStates from "./data/us-states.csv";
import STATE_INFO from "./data/stateInfo.json";

// util
import { cleanStateInfo, importCSV } from "./components/util";

// components
import AppGapminder from "./components/appGapminder/AppGapminder";
import AppCovidCompare from "./components/appCovidCompare/AppCovidCompare";
import Footer from "./components/sharedComponents/Footer";

import AppCounty from "./components/appCounty/AppCounty";

// context
import { dataContext } from "./context/dataContext";
import { statesContext } from "./context/statesContext";
import { ThemeContext } from "./context/ThemeContext";

// styles
import { wrapper, bounds } from "./styles/dimensions";
import { theme, getTheme } from "./styles/theme";
import { COLORS } from "./styles/colors";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

function App() {
  const [dataStates, setDataStates] = useState([]);
  const [infoStates, setInfoStates] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    cleanStateInfo(dataStates, STATE_INFO, COLORS).then(res =>
      setInfoStates(res)
    );
  }, [dataStates]);

  useEffect(() => {
    importCSV(USStates, STATE_INFO).then(res => setDataStates(res));
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <ThemeProvider theme={getTheme(theme, darkMode)}>
          <CssBaseline />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <dataContext.Provider value={{ dataStates, setDataStates }}>
							<statesContext.Provider value={{ infoStates, setInfoStates }}>
								{/* <AppCounty /> */}
                <Route
                  path="/line-app"
                  className="line-app"
                  component={() => (
                    <AppCovidCompare wrapper={wrapper} bounds={bounds} />
                  )}
                />
                <Route
                  path="/gapminder-app"
                  className="gapminder-app"
                  render={() => <AppGapminder />}
                />
                <Switch>
                  <Redirect exact from="/" to="/gapminder-app" />
                </Switch>
                <Footer />
              </statesContext.Provider>
            </dataContext.Provider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
