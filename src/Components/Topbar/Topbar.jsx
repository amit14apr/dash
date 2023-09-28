import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import logo from '../../_icons/logo.png';
import './style.less';
import { EnglishIcon } from '../../Containers/UserHome/Country/EnglishIcon';
import { authToken } from '../../_helpers';

function PrTopbar({ defaultLang = 'en', onLangChange }) {
    return (
        <AppBar position="static">
            <Toolbar className="SelectDropDown">
            {!authToken().token && <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img src={logo} alt="logo" style={{ m: 1, maxWidth: 124 }} />
                </Typography>}
                {true && <FormControl variant="outlined" sx={{ m: 1, minWidth: 90 }}>
                    <Select
                        IconComponent={ExpandMoreIcon}
                        labelId="simple-select-label"
                        id="demo-simple-select"
                        value={defaultLang}
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={(e) => onLangChange(e.target.value)}
                    >
                        <MenuItem value={'en'}><EnglishIcon/> <div style={{ margin: "0 20px 0 6px", display:"inline-flex" }}>English</div></MenuItem>
                    </Select>
                </FormControl>}
            </Toolbar>
        </AppBar>
    );
};

export default PrTopbar;