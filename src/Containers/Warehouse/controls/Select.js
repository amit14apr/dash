import React from 'react'
import AppBar from '@mui/material/AppBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select  from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function SelectDropoDown(props) {

    const { name, label, value,error=null, onChange, options } = props;

    return (
        <FormControl variant="filled"  size="small"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <Select 
                label={label}
                name={name}
                defaultValue= {''}
                value={value}
                onChange={onChange}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="External">External</MenuItem>
                <MenuItem value="Internal">Internal</MenuItem>
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
