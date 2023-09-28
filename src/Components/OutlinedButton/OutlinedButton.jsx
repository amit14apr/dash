import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './style.less'

const OutlinedButton = ({label, ...rest})=>{
    return (
        <div className="button-Outlined">
            <Button disableRipple size="large" variant="outlined" {...rest} >{label}</Button>
        </div>
    );
};

export { OutlinedButton };