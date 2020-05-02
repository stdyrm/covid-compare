import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as d3 from "d3";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// data
import USStates from "./data/us-states.csv";
import stateInfo from "./data/stateInfo.json";

// components
import { ChartUSCompare } from "./components/chart/ChartUSCompare";
import { FilterBar } from "./components/dataParams/FilterBar";
import { Footnotes } from "./components/chart/Footnotes";
import { AppGapminder } from './components/appGapminder/AppGapminder';

// context
import { dataContext } from "./context/dataContext";
import { statesContext } from "./context/statesContext";
import { themeContext } from './context/themeContext';

// styles
// import './styles/styles.css';
import { themeDark, themeLight } from './styles/theme';

function App() {
	const [dataStates, setDataStates] = useState([]);
	const [selectedStates, setSelectedStates] = useState([]);
	const [theme, setTheme] = useState(themeDark);
	const [darkTheme, setDarkTheme] = useState(true);

	const changeTheme = () => {
		setDarkTheme(!darkTheme);
		if (!darkTheme) {
			setTheme(themeDark);
			console.log('setting to dark')
		} else {
			setTheme(themeLight);
			console.log('setting to light')
		}		
	};

  useEffect(() => {
    // get COVID-19 state data
    d3.csv(USStates).then((data) => {
      // clean data
      const dateParser = d3.timeParse("%Y-%m-%d");

      data.forEach((d) => {
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
        (d) =>
          d.date > new Date(2020, 1, 26) &&
          Object.keys(stateInfo).includes(d.state)
      );

      // Normalize data:
      // Add "dayOfOutbreak" to show elapsed time
      // Add state population
      // Add "casesPerThousand", "deathsPerThousand", "mortalityRate"
      Object.keys(stateInfo).forEach((state) => {
        const stateData = data.filter((d) => d.state === state);
        stateData.forEach((d) => {
          d.dayOfOutbreak =
            (d.date - stateData[0].date) / (24 * 60 * 60 * 10 * 10 * 10) + 1; // day - day one, convert ms to days
          d.casesPerThousand = (d.cases / stateInfo[state].population) * 1000;
		  d.deathsPerThousand = (d.deaths / stateInfo[state].population) * 1000;
		  d.mortalityRate = (d.deaths / d.cases) * 100;
        });
      });
      setDataStates(data);
      console.log("imported dataset");
    });
  }, []);

  return (
    <div style={{backgroundColor: theme.palette.background.default, paddingBottom: 40}}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <dataContext.Provider value={{ dataStates, setDataStates }}>
          <statesContext.Provider value={{ selectedStates, setSelectedStates }}>
			<themeContext.Provider value={{ theme, setTheme }}>
				<ThemeProvider theme={theme}>
				<Router>
					<FilterBar className="header" />
					<Route path="/covidcompare" className="covid-chart" component={ChartUSCompare} />
					<Route path="/gapminder" component={AppGapminder} />
					<Footnotes changeTheme={changeTheme} />
				</Router>
				</ThemeProvider>
            </themeContext.Provider>
          </statesContext.Provider>
        </dataContext.Provider>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
