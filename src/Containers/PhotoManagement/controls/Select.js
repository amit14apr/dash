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
        <div className="select-article">
            <FormControl variant="filled" size="small" sx={{ m : 1 , minWidth: 120}} error>
                <label>{label}</label>
                <Select className={value &&'bgColor'}
                    labelId="simple-select-label"
                    id="simple-select"
                    error={!!error}
                    value={value}
                    name={name}
                    inputProps={{ 'aria-label': 'Without label' }}
                    defaultValue={''}
                    onChange={(e) => { e.persist = () => { }; onChange(e) }}                   
                >
                    {options.map(val=> <MenuItem value={val}>{val}</MenuItem>)}
                </Select>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </div>
    )
}