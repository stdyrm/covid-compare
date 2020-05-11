import React, { useState, useEffect, useContext } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// components
import { ChartUSCompare } from "./ChartUSCompare";
import { FilterBarCovidCompare } from './FilterBarCovidCompare';
import { ResponsiveDesign } from "../util/ResponsiveDesign";

// context
import { statesContext } from "../../context/statesContext";

// styles
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Chart params: define params for drawing axes and chart
const chartParams = {
	chartType: "line",
	toTimestamp: null,
	multiple: true,
	normalize: true,
	xParam: { // x-axis
		type: 'linear',
		format: 'number',
		selected: 'dayOfOutbreak',
		alt1: null,
		options: [
			"dayOfOutbreak",
		]
	},
	yParam: { // y-axis
		type: 'linear',
		format: 'number',
		selected: 'casesPerThousand',
		alt1: 'deathsPerThousand',
		options: [ 
			"casesPerThousand",
			"cases",
			"deathsPerThousand",
			"deaths"
		],
	},
	zParam: {// z-axis (3rd dimension) (eg. size)
		type: null,
		format: null,
		selected: null,
		options: [ 
			null
		]
	},
	cParam: { // color axis (categorical/ordinal data) (eg. gender, birthplace, etc.)
		type: "categorical",
		selected: "region",
		options: [ 
			"region",
			"division",
			"governor"
		],
	},
	tParam: { // time axis (4th dimension) (ie. for animated charts)
		type: null,
		selected: null,
		options: [
			null
		]
	},
};

// Label params:
const labelParams = {
	chartTitle: "COVID-19 State Comparison",
	xLabel: "Cases per Thousand",
	yLabel: "Deaths per Thousand"
};

export const AppCovidCompare = () => {
	const { infoStates, setInfoStates } = useContext(statesContext);
	const [wrapperDim, setWrapperDim] = useState();
	const [boundedDim, setBoundedDim] = useState();
	
	// assign
	const [selectedStates, setSelectedStates] = useState(null);

	// style
	const theme = useTheme();

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
	
	useEffect(() => {
		if (infoStates) {
			setSelectedStates(infoStates);
		}
	 }, [infoStates]);

  return (
    <>
		<ResponsiveDesign wrapperDim={wrapperDim} setWrapperDim={setWrapperDim} setBoundedDim={setBoundedDim} />
      		<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<ThemeProvider theme={theme}>
					{wrapperDim &&
						<>
							<FilterBarCovidCompare 
								chartParams={chartParams}
								selectedStates={selectedStates} 
								setSelectedStates={setSelectedStates}
								handleSelectedStates={handleSelectedStates}
								handleSelectAllStates={handleSelectAllStates}
								handleDeselectAllStates={handleDeselectAllStates}
							/>
							<ChartUSCompare 
								chartParams={chartParams}
								labelParams={labelParams}
								selectedStates={selectedStates} 
								setSelectedStates={setSelectedStates}
								wrapperDim={wrapperDim}
								boundedDim={boundedDim}
							/>
						</>
					}
				</ThemeProvider>
      		</MuiPickersUtilsProvider>
    </>
  );
};