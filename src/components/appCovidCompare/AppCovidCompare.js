import React, { useState, useEffect, useContext } from "react";
import * as d3 from "d3";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// components
import { ChartUSCompare } from "./ChartUSCompare";
import { FilterBarCovidCompare } from './FilterBarCovidCompare';

// context
import { dataContext } from "../../context/dataContext";
import { statesContext } from "../../context/statesContext";
import { themeContext } from '../../context/themeContext';

// styles
import { makeStyles } from '@material-ui/core/styles';
import { themeDark, themeLight } from '../../styles/theme';

const useStyles = makeStyles((theme) => ({
	main: {
		backgroundColor: theme.palette.background.default, 
		paddingBottom: 40
	}
}))

export const AppCovidCompare = () => {
	const { dataStates } = useContext(dataContext);
	const { infoStates, setInfoStates } = useContext(statesContext);
	const { theme, setTheme } = useContext(themeContext);
	const classes = useStyles();

	const [selectedStates, setSelectedStates] = useState(infoStates);

	const handleSelectedStates = (e) => {
        setSelectedStates({
            ...selectedStates,
            [e.target.name]: {
                ...selectedStates[e.target.name],
                selected: e.target.checked
            }
        });
    };

    const handleSelectAllStates = (e) => {
        const revisedStates = {}
        Object.keys(selectedStates).forEach((s,i) => {
            revisedStates[s] = {
                ...selectedStates[s],
                selected: true
            }
        });
        setSelectedStates(revisedStates);
    };

    const handleDeselectAllStates = (e) => {
        const revisedStates = {}
        Object.keys(selectedStates).forEach((s,i) => {
            revisedStates[s] = {
                ...selectedStates[s],
                selected: false
            }
         });
        setSelectedStates(revisedStates);
    };

  return (
    <div className={classes.main}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
			<ThemeProvider theme={theme}>
				<FilterBarCovidCompare 
					className="header" 
					selectedStates={selectedStates} 
					setSelectedStates={setSelectedStates}
					handleSelectedStates={handleSelectedStates}
					handleSelectAllStates={handleSelectAllStates}
					handleDeselectAllStates={handleDeselectAllStates} 
				/>
				<ChartUSCompare selectedStates={selectedStates} setSelectedStates={setSelectedStates} />
			</ThemeProvider>
      </MuiPickersUtilsProvider>
    </div>
  );
}
