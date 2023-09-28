import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useDispatch, useSelector } from 'react-redux';
import { articleAction } from '../../../_actions';

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let rowData = props;
  
  const dispatch = useDispatch();

  const handleMenuItemClick = (option, rowData) => {
    let actionData = [option, rowData.onClick]
    console.log(rowData);
    dispatch(articleAction.commonProps(actionData))
    
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
const userRoles = useSelector(state => state.users.roles)
    const hasAccessToUploadPhoto = userRoles?.indexOf('PHOTO_MANG_UPLOAD') > -1;
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '15ch',
          },
        }}
      >
           <MenuItem value={'View Images'}  onClick={e => handleMenuItemClick('View Images', rowData)} >{"View Images"}</MenuItem>
           { hasAccessToUploadPhoto &&
            <MenuItem value={'Edit Images'} onClick={e => handleMenuItemClick('Edit Images', rowData)}>{"Edit Images"}</MenuItem>
            } 
      </Menu>
    </div>
  );
}
