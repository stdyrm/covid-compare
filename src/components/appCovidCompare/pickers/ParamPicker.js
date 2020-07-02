import React from "react";

// styles
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 200,
	},
	selectInput: {
		color: theme.palette.text.primary
	}
}))

const ParamPicker = ({ chartParams, setChartParams }) => {
	const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
			<Select
				id="parameter-picker-menu"
				autoWidth={true}
                value={chartParams.yParam.selected}
				onChange={e => setChartParams(prevState => ({
					...prevState,
					yParam: {
						...prevState.yParam,
						type: e.target.value === "cases" ? "log" : "linear",
						selected: e.target.value 
					}
				}))}
				label="y-axis"
				className={classes.selectInput}
            >
                <MenuItem id="y-param-cases-100" value="casesPerThousand">
                    Cases/1000
                </MenuItem>
				<MenuItem id="y-param-cases-total" value="cases">
                    Total cases (log scale)
                </MenuItem>
                <MenuItem id="y-param-new-cases" value="newCases">
                    New cases
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export { ParamPicker };
