import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './style.less'

function PrButton ({label, ...rest}){
    return (
        <div className="button-cont">
            <Button disableRipple variant="contained" {...rest} >{label}</Button>
        </div>
    );
};

export default PrButton;