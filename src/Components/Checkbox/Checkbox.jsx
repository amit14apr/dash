import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function PrCheckbox({ label, onChange }) {
    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox />} label={label} />
        </FormGroup>
    );
};

export default PrCheckbox;