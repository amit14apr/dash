import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './style.less';

function PrSelecr({ label, value, name, error, fullWidth = true, list, onChange,options }) {
    return (
        <div className="select-cont">
            <FormControl variant="filled"  sx={{ m: 1, minWidth: 430 }} error>
                <label>{label}</label>
                <Select  className={value &&'bgColor'}
                    labelId="simple-select-label"
                    id="simple-select"
                    error={!!error}
                    value={value}
                    name={name}
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) => { e.persist = () => { }; onChange(e) }}
                    displayEmpty
                >
                     {options && options.map(val=> val ? 
                     <MenuItem value={val}>{val}</MenuItem> 
                     : 
                     <MenuItem disabled value={''}>{<span className='disabledField'>{label}</span>}</MenuItem>)}
                </Select>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </div>
    );
};

export default PrSelecr;