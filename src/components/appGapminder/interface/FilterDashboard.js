import React, { useState, useContext } from "react";
import { FormGroup } from "@material-ui/core";

// components
import { SectionTitle } from "../../sharedComponents/SectionTitle";
import { FilterBatch } from "../pickers/FilterBatch";
import { SelectedStatus } from "../pickers/SelectedStatus";
import { NumberPicker } from "../pickers/NumberPicker";

// context
import { selectionContext } from "../../../context/selectionContext";

// styles
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    deselectAll: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(2),
    },
    filterBatch: {
        justifyContent: "flex-start",
        color: theme.palette.text.primary,
    },
    selectedStatus: {
        marginTop: "100",
    },
    filterBody: {
        paddingLeft: theme.spacing(3),
        marginBottom: theme.spacing(4),
    },
}));

const FilterDashboard = props => {
    const { handleSelector } = props;
    const { selectedCircles, setSelectedCircles } = useContext(
        selectionContext
    );
    const classes = useStyles();
    const theme = useTheme();

    const [filters, setFilters] = useState([]);
    const [nStates, setNStates] = useState(12);

    const handleChange = e => {
        const state = e.target.name;

        if (selectedCircles.selected.includes(state)) {
            setSelectedCircles({
                ...selectedCircles,
                selected: selectedCircles.selected.filter(d => d !== state),
                notSelected: [...selectedCircles.notSelected, state],
            });
        } else {
            setSelectedCircles({
                ...selectedCircles,
                selected: [...selectedCircles.selected, state],
                notSelected: selectedCircles.notSelected.filter(
                    d => d !== state
                ),
            });
        }
    };

    const handleFilter = newFilter => {
        if (filters.length > 0) {
            setFilters(prevState => [...prevState, newFilter]);
        } else setFilters([newFilter]);
    };

    const handleDeleteFilter = deletedFilter => {
        const newFilterList = filters.filter(f => f.id !== deletedFilter.id);
        setFilters(newFilterList);
    };

    const handleDeselectAll = () => {
        setFilters([]);
        setSelectedCircles(prevState => ({
            ...prevState,
            selected: [],
            notSelected: prevState.all,
        }));
    };

    return (
        <>
            <FormGroup>
                <SectionTitle divider>Filters</SectionTitle>
                <div className={classes.filterBody}>
                    <NumberPicker nStates={nStates} setNStates={setNStates} />
                    <FilterBatch
                        nStates={nStates}
                        setNStates={setNStates}
                        filters={filters}
                        setFilters={setFilters}
                        handleDeleteFilter={handleDeleteFilter}
                        handleFilter={handleFilter}
                        handleSelector={handleSelector}
                    />
                </div>
                <SectionTitle divider>Selections</SectionTitle>
                <div className={classes.filterBody}>
                    <SelectedStatus
                        handleChange={handleChange}
                        handleDeselectAll={handleDeselectAll}
                    />
                </div>
            </FormGroup>
        </>
    );
};

export default FilterDashboard;