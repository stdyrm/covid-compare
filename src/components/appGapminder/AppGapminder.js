import React, { useState, useEffect, useContext } from "react";

// params
import { chartParams, cParamCategories } from "./appParams";

// components
import { ChartGapminder } from "./chart/ChartGapminder";
import { Navbar } from "./interface/Navbar";

// context
import { dataContext } from "../../context/dataContext";
import { selectionContext } from "../../context/selectionContext";

// data
import stateInfo from "../../data/stateInfo.json";
import { gapminderData } from "./gapminderData";

// style
import { wrapper, bounds } from "./styles/dimensions";
import { makeStyles } from "@material-ui/core/styles";

const AppGapminder = props => {
    const { darkMode, setDarkMode } = props;
    const { margin } = wrapper;
    const { width } = bounds;

    const { dataStates } = useContext(dataContext);
    const [data, setData] = useState(null);
    const [selector, setSelector] = useState({
        xParam: chartParams.xParam,
        yParam: chartParams.yParam,
        zParam: chartParams.zParam,
        cParam: chartParams.cParam,
    });
    const [selectedCircles, setSelectedCircles] = useState({
        selected: [],
        notSelected: Object.keys(stateInfo),
        all: Object.keys(stateInfo),
    });

    // style
    const useStyles = makeStyles(theme => ({
        navbar: {
            width: width,
            marginLeft: margin.left,
            display: "flex",
            justifyContent: "flex-start",
        },
    }));
    const classes = useStyles();

    const handleSelector = e => {
        const param = e.target.name;

        setSelector({
            ...selector,
            [param]: {
                ...selector[param],
                selected: e.target.value,
            },
        });
    };

    useEffect(() => {
        if (dataStates.length > 0) {
            gapminderData(dataStates, stateInfo, chartParams).then(res =>
                setData(res)
            );
        }
    }, [dataStates]);

    return (
        <selectionContext.Provider
            value={{ selectedCircles, setSelectedCircles }}
        >
            <Navbar
                data={data}
                selector={selector}
                handleSelector={handleSelector}
                className={classes.navbar}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <div transform={`translate(${margin.left}, ${margin.top})`}>
                {data && (
                    <ChartGapminder
                        cParamCategories={cParamCategories}
                        selector={selector}
                        data={data}
                        wrapper={wrapper}
                        bounds={bounds}
                    />
                )}
            </div>
        </selectionContext.Provider>
    );
};

export default AppGapminder;