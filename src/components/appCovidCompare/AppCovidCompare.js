import React, { useState, useEffect, useContext } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// components
import { ChartCovidCompare } from "./chart/ChartCovidCompare";
import { Navbar } from './interface/Navbar';

// params
import { chartParams, labelParams } from "./appParams";

// context
import { statesContext } from "../../context/statesContext";

export const AppCovidCompare = ({ wrapper, bounds }) => {
	const { infoStates } = useContext(statesContext);
	
	// assign
	const [selectedStates, setSelectedStates] = useState(null);

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
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Navbar 
				chartParams={chartParams}
				selectedStates={selectedStates} 
				setSelectedStates={setSelectedStates}
				handleSelectedStates={handleSelectedStates}
				handleSelectAllStates={handleSelectAllStates}
				handleDeselectAllStates={handleDeselectAllStates}
			/>
			<ChartCovidCompare
				chartParams={chartParams}
				labelParams={labelParams}
				selectedStates={selectedStates} 
				setSelectedStates={setSelectedStates}
				wrapper={wrapper}
				bounds={bounds}
			/>
		</MuiPickersUtilsProvider>
    </>
  );
};