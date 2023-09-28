import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CreateInventoryForm } from './CreateInventoryForm';
import { Button, BoxLoader } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import './style.less';

function Inventory() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const inventory = useSelector(state => state.inventory)
    const userRoles = useSelector(state => state.users.roles)
    const hasAccess = userRoles?.indexOf('INVENTORY_CREATE') > -1;
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    useEffect(() => {
        if (inventory && inventory.inventoryCreated) {
            setOpen(false);
        }
    },[inventory]);

    return (
        <div className="InventoryLayout">
            <Box sx={{ display: 'flex', padding: "5px" }}>
                <Typography style={{ flex: 1 }}>
                    <h4>Inventory List</h4>
                </Typography>
                { hasAccess && <Button size="large" label="Create Inventory" onClick={handleClickOpen('paper')}></Button> }
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"

                >
                    <DialogTitle id="scroll-dialog-title">New Inventory</DialogTitle>
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
                            <CreateInventoryForm />
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" label="Cancel" onClick={handleClose}></Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}
export { Inventory };
