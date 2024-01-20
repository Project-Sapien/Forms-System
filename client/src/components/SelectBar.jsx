import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';

const SelectBar = ({isSwitchOn, setIsSwitchOn,  selectedValue, setSelectedValue}) => {



  const regions = ['None','Princeton', 'CMU', 'Berkeley'];
  const questionSets = ['None','Question Set 1', 'Question Set 2', 'Question Set 3'];

  const handleSwitchChange = (event) => {
    setIsSwitchOn(event.target.checked);
    setSelectedValue(''); // Reset selection when switch changes
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value == "None"? "" : event.target.value );
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={2}>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={isSwitchOn} onChange={handleSwitchChange} />}
            label={isSwitchOn? "Editing Forms" : "Editing Question Sets"}
          />
        </FormGroup>
      </Grid>

      <Grid item  xs={4}>
        <FormControl variant="outlined" size="larges" style={{width: '100%'}}>
          <InputLabel id="demo-simple-select-label">Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedValue}
            label="Select"
            onChange={handleSelectChange}
          >
            {isSwitchOn
              ? regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))
              : questionSets.map((set) => (
                  <MenuItem key={set} value={set}>
                    {set}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SelectBar;
