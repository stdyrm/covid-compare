import React, { useState, useEffect, useContext } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// components
import ChartCovidCompare from "./chart/ChartCovidCompare";
import { Navbar } from "./interface/Navbar";

// params
import { CHART_PARAMS } from "./appParams";

// context
import { statesContext } from "../../context/statesContext";

// styles
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const AppCovidCompare = ({ wrapper, bounds }) => {
    const { infoStates } = useContext(statesContext);

    const [selectedStates, setSelectedStates] = useState(null);
	const [chartParams, setChartParams] = useState(CHART_PARAMS);

    const useStyles = makeStyles(theme => ({
        container: {
            padding: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
        },
        item: {
            width: "100%",
            flexBasis: "100%",
        },
    }));

    const classes = useStyles();

    const handleSelectedStates = e => {
        setSelectedStates({
            ...selectedStates,
            [e.target.name]: {
                ...selectedStates[e.target.name],
                selected: e.target.checked,
            },
        });
    };

    const handleSelectAllStates = e => {
        const revisedStates = {};
        Object.keys(selectedStates).forEach((s, i) => {
            revisedStates[s] = {
                ...selectedStates[s],
                selected: true,
            };
        });
        setSelectedStates(revisedStates);
    };

    const handleDeselectAllStates = e => {
        const revisedStates = {};
        Object.keys(selectedStates).forEach((s, i) => {
            revisedStates[s] = {
                ...selectedStates[s],
                selected: false,
            };
        });
        setSelectedStates(revisedStates);
    };

    useEffect(() => {
        if (infoStates) {
            setSelectedStates(infoStates);
		};

		return () => {
			setSelectedStates(null);
		};
    }, [infoStates]);

    return (
        <Grid className={classes.container}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Grid item className={classes.item}>
					<Navbar
						style={{ width: "100%" }}
						chartParams={chartParams}
						setChartParams={setChartParams}
						selectedStates={selectedStates}
						setSelectedStates={setSelectedStates}
						handleSelectedStates={handleSelectedStates}
						handleSelectAllStates={handleSelectAllStates}
						handleDeselectAllStates={handleDeselectAllStates}
					/>
					<ChartCovidCompare
						chartParams={chartParams}
						selectedStates={selectedStates}
						setSelectedStates={setSelectedStates}
						wrapper={wrapper}
						bounds={bounds}
					/>
                </Grid>
            </MuiPickersUtilsProvider>
        </Grid>
    );
};

export default AppCovidCompare;