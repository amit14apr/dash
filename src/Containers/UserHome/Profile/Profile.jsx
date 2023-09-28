import React, { useEffect, useState, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu'; 
import profileImage from '../../../_icons/profileImage.svg'
import Divider from '@mui/material/Divider'; 

import './style.less';

import { authToken } from '../../../_helpers';
import { userActions } from '../../../_actions';
import DescIcon from '../../Article/controls/DescIcon';
import AscIcon from '../../Article/controls/AscIcon';

function Profile() {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(false);

    const dispatch = useDispatch();

    let history = useHistory();
    const users = useSelector(state => state)

    const handleClick = () => {
        dispatch(userActions.logout())
        setAnchorEl(false);
    };

    const handleArrowMenu = (event) => {
        setAnchorEl(!anchorEl);
      };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [userRole, setUserRole] = React.useState('');
    const [userFullName, setUserFullName] = React.useState('');
    const memuContainer = useRef(null);

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        setUserRole("Admin");
        setUserFullName("Amit Singh");
    }
    useEffect(() => {
        parseJwt(authToken().token);
    }, []);
   

    return (
        <div className="ProfileContainer" onClick={handleArrowMenu}> <span style={{paddingRight : 16}}>
            {/* <IconButton sx={{display : "inline-flex"}}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
               
                color="inherit"
            >
                <AccountCircle /> 
                
            </IconButton> */}
            <img src={profileImage} />
             </span>
           
            <span>
            <div className='UserRole'>{"Admin" }</div>
            <div className='UserName'>{"Amit Singh"}</div>
            </span>
           
            <span className="ArrowProfile">
            <IconButton sx={{display : "inline-flex"}}
                size="large"
                disableRipple
                aria-label="account of current user"
                aria-controls="demo-positioned-menu"
                aria-haspopup="true"
                onClick={handleArrowMenu}
                color="inherit"
                ref={memuContainer}
            >
              { Boolean(anchorEl) ?  <AscIcon /> : <DescIcon/> }
                
            </IconButton>
                
                </span>
                <span className='MenuItems'>
                <Menu
                    id="demo-positioned-menu"
                    anchorEl={memuContainer.current}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
            >
                <MenuItem style={{'fontWeight': 700, 'lineHeight': '11px', 'fontSize': '9px', 'color': '#A29FB9', 'textTransform': 'uppercase'}}> {userRole }</MenuItem>
               
                <Divider style={{ padding: "0px 0px 0px 97.92px" }}/>
                
                <MenuItem onClick={handleClick} style={{ 'textTransform': 'capitalize' }}>Logout</MenuItem>
            </Menu>
            </span>

        </div>
    );
}
export { Profile };
