import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '../../_icons/visibility_black_24dp.svg'
import VisibilityOff from '../../_icons/visibility_off_black_24dp.svg'
import './style.less';

function PrPasswordInput({ label, id, name, error, placeholder, fullWidth = true, onChange, onFocus, onBlur }) {
    const [visibility, setVisibility] = useState(false);
    const toggleVisibility = () => {
        setVisibility(!visibility);
    }
    return (
        <div className="input-cont">
            <label>{label}</label>
            <TextField className={error && 'error-after'} inputProps={{ maxLength: 30, className : error && "error-border" }} id={id} name={name} type={visibility ? 'text' : 'password'} fullWidth={fullWidth} placeholder={placeholder} variant="filled" error={!!error} helperText={error} onChange={(e) => onChange(e)} onBlur={(e) => onBlur(e)} onFocus={(e) => onFocus(e)} />
            {visibility && <span className="material-icons-outlined visibility-icon"><img src={VisibilityOff} onClick={toggleVisibility} /></span>}
            {!visibility && <span className="material-icons-outlined visibility-icon"><img src={Visibility} onClick={toggleVisibility} /></span>}
        </div>
    );
};

export default PrPasswordInput;