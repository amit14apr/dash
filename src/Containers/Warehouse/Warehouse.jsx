import React, { useState, useEffect, useLayoutEffect } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '../../_icons/dashboard_icon.svg';
import Paper from '@mui/material/Paper'
import Logo from '../../_icons/msc_logo.svg';
import currentLang from '../../Lang';

import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, BoxLoader } from '../../Components';
import { WarehouseList } from './WarehouseList';
import { CreateWarehouseForm } from './CreateWarehouseForm';
import { EditWarehouseForm } from './EditWarehouseForm';
import { WarehouseDetails } from "./WarehouseDetails";
import { inventoryActions } from '../../_actions';
import './style.less';

function Warehouse() {
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenEdit(false);
        dispatch(inventoryActions.commonProps(["", actionProps[1]]))
        dispatch(inventoryActions.listWarehouse());
    };
    const alert = useSelector(state => state.alert)
    const actionProps = useSelector(state => state.commonProps.propsData)
    const userRoles = useSelector(state => state.users.roles)
    const hasAccess = userRoles?.indexOf('WAREHOUSE_CREATE') > -1;
    const descriptionElementRef = React.useRef(null);
    const dispatch = useDispatch();
   
    
    useEffect(() => {
        if (actionProps && actionProps[0] === "View") {
            setOpenDetails(true);
        }
        if (actionProps && actionProps[0] === "Edit") {
            setOpenEdit(true);
        } else {
            setOpenEdit(false);
        }
    }, [actionProps]);

    useLayoutEffect(() => {
        return () => {
            dispatch(inventoryActions.commonProps(["", actionProps[1]]))
        }
    }, [])

    useEffect(() => {
        if (alert && alert.type === "alert-success") {
            setOpenEdit(false); 
            setOpen(false);
            setOpenDetails(false);
            dispatch(inventoryActions.listWarehouse());
            dispatch(inventoryActions.commonProps(["", actionProps[1]]))
        }
    }, [alert]);

    useEffect(() => {
        dispatch(inventoryActions.listWarehouse());
    }, []);
   
 

    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]); 

    return (
        <div className="WarehouseLayout">
            <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"

                >
                    <DialogTitle id="scroll-dialog-title">New Warehouse</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '30ch', my: 1 },
                                }}
                            >
                                   <BoxLoader />
                                   <CreateWarehouseForm />
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" label="Cancel" onClick={handleClose}></Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openEdit}
                    onClose={handleClose}
                    scroll={'paper'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"

                >
                    <DialogTitle id="scroll-dialog-title">Edit Warehouse</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '30ch', my: 1 },
                                }}
                            >
                                   <BoxLoader />
                                   <EditWarehouseForm data={actionProps} />
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" label="Cancel" onClick={handleClose}></Button>
                    </DialogActions>
                </Dialog>
            {!openDetails ? <Box sx={{ display: 'flex', padding: "5px" }}>
                <Typography style={{ flex: 1 }}>
                    <h4>Warehouse List</h4>
                </Typography>
                {hasAccess &&  <Button size="large" label="Create Warehouse" onClick={handleClickOpen('paper')}></Button> }
                <Box   
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }} style={{
                        position: "absolute",
                        marginTop: "60px"
                    }}
                    noValidate
                    autoComplete="off">
                    <WarehouseList />
                </Box>

            </Box> : <WarehouseDetails data = {actionProps} /> }
        </div>
    );
}
export { Warehouse };
