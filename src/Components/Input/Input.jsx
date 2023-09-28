import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './style.less';

function PrInput({ label, id, name, error, type = 'text', placeholder, fullWidth = true, onChange }) {
    return (
        <div className="input-cont">
            <label>{label}</label>
            <TextField className={error && 'error-after'} name={name} inputProps={{ maxLength: 30, className : error && "error-border" }} InputLabelProps={{ shrink: false }} type={type} id={id} fullWidth={fullWidth} placeholder={placeholder} variant="filled" error={!!error} helperText={error} onChange={(e) => onChange(e)} />
        </div>
    );
};

export default PrInput;