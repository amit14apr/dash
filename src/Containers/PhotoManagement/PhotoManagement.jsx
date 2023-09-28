import React, { useState, useEffect, useLayoutEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { articleAction } from '../../_actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BoxLoader } from '../../Components';
import './style.less';
import { PhotoManagementList } from "./PhotoManagementList";
import { ViewImageModule } from './ViewImageModule';
import { UploadImageModule } from "./UploadImageModule";


function PhotoManagement() {
    const [open, setOpen] = React.useState(false);
    const [openUploadImage, setOpenUploadImage] = React.useState(false);
    const [openViewImage, setOpenViewImage] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [UploadImageForSKU, setUploadImageForSKU] = React.useState('');
    const [ViewImageForSKU, setViewImageForSKU] = React.useState('');

    const alert = useSelector(state => state.alert)
    const actionProps = useSelector(state => state.commonProps.propsData)
    const userRoles = useSelector(state => state.users.roles)
    const hasAccess = userRoles?.indexOf('GLOBAL_ARTICLE_CREATE') > -1;

    const descriptionElementRef = React.useRef(null);
    const dispatch = useDispatch();



    useEffect(() => {
        if (actionProps && actionProps[0] === "View Images") {
            setOpenViewImage(true);
            setViewImageForSKU({ 'sku': actionProps[1].sku, "id": actionProps[1].id });
        }
        else if (actionProps && actionProps[0] === "Edit Images") {
            setOpenUploadImage(true);
            setUploadImageForSKU({ 'sku': actionProps[1].sku, "id": actionProps[1].id })
        } else {
            setOpenUploadImage(false);
            setOpenViewImage(false);
        }
    }, [actionProps]);

    useLayoutEffect(() => {
        return () => {
            dispatch(articleAction.commonProps(["", actionProps[1]]))
        }
    }, [])

    const handleClose = () => {
        setOpen(false);
        setOpenUploadImage(false);
        setOpenViewImage(false);
    };

    useEffect(() => {
        if (alert && alert.type === "alert-success") {
            setOpenUploadImage(false);
            setOpenViewImage(false);
            setOpen(false);
            dispatch(articleAction.listArticle(`?pageNumber=1&limit=10&filterFields=&filterValues=&sort=ASC&orderBy=description.code`));
        }
    }, [alert]);

    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div className="PhotoManagementLayout">
            <Dialog
                open={openUploadImage}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Box>
                            <BoxLoader />
                            <UploadImageModule onCloseModal={handleClose} data={UploadImageForSKU} />
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openViewImage}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"

            >
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Box>
                            <BoxLoader />
                            <ViewImageModule onCloseModal={handleClose} data={ViewImageForSKU} />
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Box sx={{ display: 'flex', padding: "5px" }}>
                <Typography className="componentTitle" style={{ flex: 1 }}>
                    <h4>{"Photo Management"}</h4>
                </Typography>

                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }} style={{
                        position: "absolute",
                        marginTop: "60px"
                    }}
                    noValidate
                    autoComplete="off">
                    <PhotoManagementList />
                </Box>

            </Box>
        </div>
    );
}
export { PhotoManagement };
