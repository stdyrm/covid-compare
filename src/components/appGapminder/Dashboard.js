import React, { useContext } from 'react';
import { IconButton, FormControlLabel, FormGroup, Checkbox, Typography, Divider } from '@material-ui/core';

// context
import { themeContext } from '../../context/themeContext';
import { selectionContext } from '../../context/selectionContext';

// styles
import ClearIcon from '@material-ui/icons/Clear';

export const Dashboard = () => {
	const { selectedCircles, setSelectedCircles } = useContext(selectionContext);
	const { theme } = useContext(themeContext);

    const handleChange = (e) => {
		const state = e.target.name;

		if (selectedCircles.selected.includes(state)) {
			setSelectedCircles({
				...selectedCircles,
				selected: selectedCircles.selected.filter(d => d !== state),
				notSelected: [...selectedCircles.notSelected, state]
			})

		} else {
			setSelectedCircles({
				...selectedCircles,
				selected: [...selectedCircles.selected, state],
				notSelected: selectedCircles.notSelected.filter(d => d !== state)
			})
		}
	};

	const handleDeselectAll = () => {
		setSelectedCircles({
			...selectedCircles, 
			selected: [], 
			notSelected: selectedCircles.all
		});
	};

    return (
        <div>
            <FormGroup style={{alignItems: 'left', backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary}}>
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
                {selectedCircles.selected
                    ? selectedCircles.selected.sort()
                        .map((state, i) => {
                            return (
                                <FormControlLabel
                                    key={i} 
                                    name={state}
                                    checked={selectedCircles.selected.includes(state)}
                                    onChange={handleChange}
                                    control={<Checkbox name={state} />}
                                    label={state} 
                                />
                            )
                        })
                    : <div />
                }<br />
                <Typography variant="h6" style={{color: theme.palette.primary.contrastText}} >Not Selected</Typography>
                <Divider style={{backgroundColor: theme.palette.primary.contrastText}} />
                {selectedCircles.notSelected
                    ? selectedCircles.notSelected.sort()
                        .map((state, i) => {
                            return (
                                <FormControlLabel
                                    key={i} 
                                    name={state}
                                    checked={selectedCircles.selected.includes(state)}
                                    onChange={handleChange}
                                    control={<Checkbox name={state} />}
                                    label={state} 
                                />
                            )
                        })
                    : <div />
                }
            </FormGroup>
        </div>
    )
};