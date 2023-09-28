import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './style.less';
const PasswordStrengthIndicator = ({
    validity: { minChar, upperCase, lowerCase, number, specialChar }
}) => {
    return (
        <div className="password-meter text-left mb-4">
           <Typography><label>Password must:</label></Typography>
            <Grid container sx={{ color: 'text.primary' }}>
                <PasswordStrengthIndicatorItem
                    isValid={upperCase}
                    text="Contain an uppercase letter"
                />
                <PasswordStrengthIndicatorItem
                    isValid={minChar}
                    text="Have at least 8 characters"
                />
                <PasswordStrengthIndicatorItem
                    isValid={lowerCase}
                    text="Contain an lowercase letter"
                />
                <PasswordStrengthIndicatorItem
                    isValid={number || specialChar}
                    text="Have a number or symbol"
                />
            </Grid>
        </div>
    );
};

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
    const highlightClass = isValid
        ? "text-success"
        : "text-secondary";
    return <Grid item xs={8}>
                <Typography> {isValid ? <CheckIcon className={highlightClass} /> : <FiberManualRecordIcon className={highlightClass} />}{text}</Typography>
            </Grid>
};

export default PasswordStrengthIndicator;