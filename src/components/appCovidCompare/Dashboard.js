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

export const Dashboard = (props) => {
	const { selectedStates, handleSelectedStates, handleSelectAllStates, handleDeselectAllStates } = props;

    const {dataStates} = useContext(dataContext);
	const {theme} = useContext(themeContext);

    return (
        <div>
            <FormGroup style={{alignItems: 'left', backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary}}>
                <FormControlLabel
                id="select-all"
                label="Select All"
                name="Select All"
                onClick={handleSelectAllStates} 
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
                    onClick={handleDeselectAllStates}  
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
                                    onChange={handleSelectedStates}
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
                                    onChange={handleSelectedStates}
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