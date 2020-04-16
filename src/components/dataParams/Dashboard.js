import React, { useContext, useEffect } from 'react';
import { timeParse, nest } from 'd3';
import { IconButton, FormControlLabel, FormGroup, Checkbox, Typography, Divider } from '@material-ui/core';

// context
import { dataContext } from '../../context/dataContext';
import { statesContext } from '../../context/statesContext';
import { themeContext } from '../../context/themeContext';

// data
import stateInfo from '../../data/stateInfo.json';

// styles
import { colors } from '../../styles/colors';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const Dashboard = () => {
    const {dataStates} = useContext(dataContext);
    const {selectedStates, setSelectedStates} = useContext(statesContext);
	const {theme} = useContext(themeContext);

    const handleChange = (e) => {
        setSelectedStates({
            ...selectedStates,
            [e.target.name]: {
                ...selectedStates[e.target.name],
                selected: e.target.checked
            }
        });
    };

    const handleSelectAll = (e) => {
        const revisedStates = {}
        Object.keys(selectedStates).forEach((s,i) => {
            revisedStates[s] = {
                ...selectedStates[s],
                selected: true
            }
        });
        setSelectedStates(revisedStates);
    };

    const handleDeselectAll = (e) => {
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
        // clean stateInfo data and assign selectedStates
        const dateParser = timeParse('%m-%d-%y');
        const revisedStates = {};

        Object.keys(stateInfo).forEach((s,i) => {
            revisedStates[s] = {
                ...stateInfo[s],
                lockdown: stateInfo[s].lockdown.startsWith("none") ? stateInfo[s].lockdown : dateParser(stateInfo[s].lockdown),
                color: colors[i],
            }
        });

        const nested = nest()
            .key(d => d.state)
            .entries(dataStates);

        Object.keys(nested).forEach(i => {
            const s = nested[i].key;

            const lastIndex = nested[i].values.length - 1;
            const latestCaseCount = nested[i].values[lastIndex].cases;
            revisedStates[s] = {
                ...revisedStates[s],
                latestCaseCount: latestCaseCount
            };
        });
        setSelectedStates(revisedStates);
    }, [dataStates]);

    return (
        <div>
            <FormGroup style={{alignItems: 'left', backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary}}>
                <FormControlLabel
                id="select-all"
                label="Select All"
                name="Select All"
                onClick={handleSelectAll} 
                control={
                    <IconButton 
                        id='selector-all' 
                        name="select-all"
                        style={{color: 'green'}}
                    >
                        <CheckIcon />
                    </IconButton>
                }
                />
                <FormControlLabel
                    id="deselect-all"
                    label="Deselect All"
                    name="Deselect All"
                    onClick={handleDeselectAll}  
                    control={
                        <IconButton 
                            id='deselector-all' 
                            name="deselect-all"
                            style={{color: 'red'}}
                        >
                            <ClearIcon />
                        </IconButton>
                    }
                /><br />
                <Typography variant="h6" style={{color: theme.palette.primary.contrastText}}>Selected</Typography>
                <Divider style={{backgroundColor: theme.palette.primary.contrastText}} />
                {selectedStates
                    ? Object.keys(selectedStates).sort()
                        .filter(s => selectedStates[s].selected === true)
                        .map((state, i) => {
                            return (
                                <FormControlLabel
                                    key={i} 
                                    id={selectedStates[state].htmlFormat}
                                    name={state}
                                    checked={selectedStates[state].selected}
                                    onChange={handleChange}
                                    control={<Checkbox name={state} style={{color: selectedStates[state].color}}/>}
                                    label={`${state} (${selectedStates[state].abbreviation})`} 
                                />
                            )
                        })
                    : <div />
                }<br />
                <Typography variant="h6" style={{color: theme.palette.primary.contrastText}} >Not Selected</Typography>
                <Divider style={{backgroundColor: theme.palette.primary.contrastText}} />
                {selectedStates
                    ? Object.keys(selectedStates).sort()
                        .filter(s => selectedStates[s].selected === false)
                        .map((state, i) => {
                            return (
                                <FormControlLabel
                                    key={i} 
                                    id={selectedStates[state].htmlFormat}
                                    name={state}
                                    checked={selectedStates[state].selected}
                                    onChange={handleChange}
                                    control={<Checkbox name={state} style={{color: selectedStates[state].color}}/>}
                                    label={`${state} (${selectedStates[state].abbreviation})`} 
                                />
                            )
                        })
                    : <div />
                }
            </FormGroup>
        </div>
    )
};

export { Dashboard };