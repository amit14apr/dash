import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { inventoryActions } from '../../../_actions';
import { useDispatch, useSelector } from 'react-redux';

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let rowData = props;

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (option, rowData) => {
    let actionData = [option, rowData.onClick]
    dispatch(inventoryActions.commonProps(actionData))
    
  };
  const payloadPagingAndIndex = () => {
    let payloadData = `offset=${page}&limit=${rowsPerPage}`;
    return payloadData;
    // return stableSort(filterFn.fn(records), getComparator(order, orderBy))
    //     .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
}
const userRoles = useSelector(state => state.users.roles)
    const hasAccess = userRoles?.indexOf('WAREHOUSE_CREATE') > -1;
  
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
            width: '10ch',
          },
        }}
      >
           <MenuItem value={'View'}  onClick={e => handleMenuItemClick('View', rowData)} >View</MenuItem>
          {hasAccess && <MenuItem value={'Edit'}  onClick={e => handleMenuItemClick('Edit', rowData)}>Edit</MenuItem>} 
      </Menu>
    </div>
  );
}
