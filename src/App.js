import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import * as d3 from "d3";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// data
import USStates from "./data/us-states.csv";
import stateInfo from "./data/stateInfo.json";

// components
import { Footnotes } from "./components/Footnotes";
import { AppGapminder } from "./components/appGapminder/AppGapminder";
import { AppCovidCompare } from "./components/appCovidCompare/AppCovidCompare";

// context
import { dataContext } from "./context/dataContext";
import { statesContext } from "./context/statesContext";

// styles
import { wrapper, bounds } from "./styles/dimensions";
import { theme, getTheme } from "./styles/theme";
import { colors } from "./styles/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
    const [dataStates, setDataStates] = useState([]);
    const [infoStates, setInfoStates] = useState(null);
	const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        // clean stateInfo data and assign selectedStates
        const dateParser = d3.timeParse("%m-%d-%y");
        const revisedStates = {};

        Object.keys(stateInfo).forEach((s, i) => {
            revisedStates[s] = {
                ...stateInfo[s],
                lockdown: stateInfo[s].lockdown.startsWith("none")
                    ? stateInfo[s].lockdown
                    : dateParser(stateInfo[s].lockdown),
                lockdownEnd: stateInfo[s].lockdownEnd.startsWith("none")
                    ? stateInfo[s].lockdownEnd
                    : dateParser(stateInfo[s].lockdownEnd),
                color: colors[i],
            };
        });

        const nested = d3
            .nest()
            .key(d => d.state)
            .entries(dataStates);

        Object.keys(nested).forEach(i => {
            const s = nested[i].key;

            const lastIndex = nested[i].values.length - 1;
            const latestCaseCount = nested[i].values[lastIndex].cases;
            const latestCaseCountPerThou =
                (nested[i].values[lastIndex].cases / stateInfo[s].population) *
                1000;

            revisedStates[s] = {
                ...revisedStates[s],
                latestCaseCount: latestCaseCount,
                latestCaseCountPerThou: latestCaseCountPerThou,
            };
        });
        setInfoStates(revisedStates);
    }, [dataStates]);

    useEffect(() => {
        // get COVID-19 state data
        d3.csv(USStates).then(data => {
            // clean data
            const dateParser = d3.timeParse("%Y-%m-%d");

            data.forEach(d => {
                d.date = dateParser(d.date);
                d.fips = parseInt(d.fips);
                d.cases = parseInt(d.cases);
                d.deaths = parseInt(d.deaths);
            });

            // Filter data:
            // Prior to 02-27-20, Washington had 1 or 2 cases from January.
            // However, these were isolated cases and this graph is trying to track Covid-19 spread
            // Also filter out territories Guam, Puerto Rico, etc.
            data = data.filter(
                d =>
                    d.date > new Date(2020, 1, 26) &&
                    Object.keys(stateInfo).includes(d.state)
            );

            // Normalize data:
            // Add "dayOfOutbreak" to show elapsed time
            // Add state population
            // Add "casesPerThousand", "deathsPerThousand", "mortalityRate"
            Object.keys(stateInfo).forEach(state => {
                const stateData = data.filter(d => d.state === state);
                stateData.forEach(d => {
                    d.dayOfOutbreak =
                        (d.date - stateData[0].date) /
                            (24 * 60 * 60 * 10 * 10 * 10) +
                        1; // day - day one, convert ms to days
                    d.casesPerThousand =
                        (d.cases / stateInfo[state].population) * 1000;
                    d.deathsPerThousand =
                        (d.deaths / stateInfo[state].population) * 1000;
                    d.mortalityRate = (d.deaths / d.cases) * 100;
                });
            });
            setDataStates(data);
            console.log("imported dataset");
        });
    }, []);

    return (
        <>
            <ThemeProvider theme={getTheme(theme, darkMode)}>
                <CssBaseline />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <dataContext.Provider value={{ dataStates, setDataStates }}>
                        <statesContext.Provider
                            value={{ infoStates, setInfoStates }}
                        >
							<Route
								path="/line-app"
								className="line-app"
								render={() => <AppCovidCompare wrapper={wrapper} bounds={bounds} />}
							/>
							<Route
								path="/gapminder-app"
								className="gapminder-app"
								render={() => <AppGapminder />}
							/>
							<Switch>
								<Redirect exact from="/" to="/gapminder-app" />
							</Switch>
							<Footnotes
								darkMode={darkMode}
								setDarkMode={setDarkMode}
								wrapper={wrapper}
								bounds={bounds}
							/>
                        </statesContext.Provider>
                    </dataContext.Provider>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
