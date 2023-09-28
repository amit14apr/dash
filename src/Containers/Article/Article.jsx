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
import { alertActions } from '../../_actions';

import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, BoxLoader } from '../../Components';
import { ArticleList } from './ArticleList';
import { CreateArticleForm } from "./CreateArticleForm";
import { LocaliseArticleForm } from "./LocaliseArticle";
import { ArticleDetails } from "./ArticleDetails";
import { articleAction } from '../../_actions';
import './style.less';
import { CompressOutlined } from "@mui/icons-material";
import Stack from '@mui/material/Stack';
import { ExportIcon } from "./controls/ExportArticleButton";
import { CreateArticleButton } from "./controls/CreateArticleButton";
import {  userActions } from "../../_actions";


function Article() {
    const [open, setOpen] = React.useState(false);
    const [openLocalise, setOpenLocalise] = React.useState(false);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [LocaliseSKU, setLocaliseSKU] = React.useState('');
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenLocalise(false);
       // dispatch(articleAction.listWarehouse());
    };

    // adding this to show create article button without refreshing the page
    useEffect(() => {
      //dispatch(userActions.getUserRoles());
    }, []);

    const alert = useSelector(state => state.alert)
    const actionProps = useSelector(state => state.commonProps.propsData)
    const userRoles = useSelector(state => state.users.roles)
    const hasAccess = userRoles?.indexOf('USER_CREATE') > -1;
    const descriptionElementRef = React.useRef(null);
    const dispatch = useDispatch();

    const handleExport = () => {
       dispatch(alertActions.success('User export is in-progress.'));
       dispatch(articleAction.exportArticles());
    }
    
    useEffect(() => {
        if (actionProps && actionProps[0] === "View") {
            console.log("data",actionProps)
          //  dispatch(articleAction.listArticle(`?pageNumber=1&limit=10&filterFields=&filterValues=&sort=ASC&orderBy=description.code`));
          //  dispatch(articleAction.getMappedAccessoriesBySKU(actionProps[1].sku))
           // dispatch(articleAction.getSuggestedRetailPrice(actionProps[1].sku))
           // dispatch(articleAction.getArticleSystemConfiguration(actionProps[1].sku))
            
            setOpenDetails(true);
        }
        if (actionProps && actionProps[0] === "Localise") {
            setOpenLocalise(true);
            setLocaliseSKU({'sku':actionProps[1].sku,"id": actionProps[1].id})
        } else {
            setOpenLocalise(false);
        }
    }, [actionProps]);

    useLayoutEffect(() => {
        return () => {
            dispatch(articleAction.commonProps(["", actionProps[1]]))
        }
    }, [])

    

    useEffect(() => {
        if (alert && alert.type === "alert-success") {
            setOpenLocalise(false); 
            setOpen(false);
            setOpenDetails(false);
          //  dispatch(articleAction.listArticle(`?pageNumber=1&limit=10&filterFields=&filterValues=&sort=ASC&orderBy=description.code`));
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
        <div className="ArticleLayout">
            <Dialog
                    open={open}
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
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '30ch', my: 1 },
                                }}
                            >
                                   <BoxLoader />
                                   <CreateArticleForm onCloseModal={handleClose} />
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openLocalise}
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
                                <LocaliseArticleForm onCloseModal={handleClose} data={LocaliseSKU} />
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                {!openDetails ? <Box sx={{ display: 'flex', padding: "5px" }}>
                <Typography className="componentTitle" style={{ flex: 1 }}>
                    <h4>User List</h4>
                </Typography>
                <Stack spacing={1} direction="row">
               
                <a style={{cursor: 'pointer',}} onClick={handleExport} ><ExportIcon /></a>
               {hasAccess && <a style={{cursor: 'pointer',}} onClick={handleClickOpen('paper')}><CreateArticleButton /></a>}
              
                </Stack>
                <Box   
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }} style={{
                        position: "absolute",
                        marginTop: "60px"
                    }}
                    noValidate
                    autoComplete="off">
                    <ArticleList />
                </Box>

            </Box>  : <Box   
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"><ArticleDetails data = {actionProps} /></Box> }
        </div>
    );
}
export { Article };
