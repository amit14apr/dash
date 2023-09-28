import React from 'react'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function Input(props) {

    const { name, label, value,error=null, onChange, ...other } = props;
    return (
        <div className="input-search">
            <FormControl variant="outlined" sx={{ minWidth: 90 }} error>
        <label style={{ paddingLeft: "16px"}}>{label}</label>
        <TextField  
            variant="outlined"
            fullWidth={false}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
        </FormControl>
        </div>
    )
}
