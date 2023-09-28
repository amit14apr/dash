import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Router, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { history } from '../../_helpers';
import { PrivateRoute } from '../../_routeComponents';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '../../_icons/dashboard_icon.svg';
import WarehouseIcon from '../../_icons/warehouse_icon.svg';
import InventoryIcon from '../../_icons/inventory_icon.svg';
import ArticleIcon from '../../_icons/article_icon.svg';
import PhotoManagementIcon from '../../_icons/photo_mgmt.svg';
import Logo from '../../_icons/logo.png';
import { Dashboard } from '../Dashboard';
import { Warehouse } from '../Warehouse';
import { Inventory } from '../Inventory';
import { PhotoManagement } from '../PhotoManagement';
import { Article } from '../Article';
import { Profile } from './Profile';
import { Country } from './Country';
import { Breadcrumbs } from '../../Components';
import { userActions } from '../../_actions';

import './style.less';
const drawerWidth = 240;

function UserHome() {
    
    // const dispatch = useDispatch();

    useEffect(() => {
       // dispatch(userActions.getUserRoles());
    }, []);

    const [openWarehouse, setOpenWarehouse] = React.useState(true);
    const [openInventory, setOpenInventory] = React.useState(true);
    const [openUser, setOpenUser] = React.useState(true);

    const handleClickWarehouse = () => {
        setOpenWarehouse(!openWarehouse);
    };
    const handleClickInventory = () => {
        setOpenInventory(!openInventory);
    };
    const handleClickUser = () => {
        setOpenUser(!openUser);
    };
    const userRoles = useSelector(state => state.users.roles)
    const hasAccessToPhotoMgmtList = userRoles?.indexOf('PHOTO_MANG_LISTING') > -1;
    const hasAccessToUserist = true || userRoles?.indexOf('USERS_LIST') > -1;

    
    const listItemData = [
        { label: "Dashboard", link: "/dashboard", icon: DashboardIcon , expandMore: false, hasAccess: true},
        { label: "Task", secondLabel: "Task List", link: "/warehouse", icon: WarehouseIcon, expandMore: false, hasAccess:false },
        { label: "Contact", secondLabel: "Contact List", link: "/inventory", icon: InventoryIcon, expandMore: false, hasAccess:false },
        { label: "User", secondLabel: "User List", link: "/user",  thirdLabel: "Register", thirdlink: "/register", icon: ArticleIcon , expandMore: true, hasAccess:true},
        { label: "Photo Management", link: "/photomanagement", icon: PhotoManagementIcon , expandMore: false, hasAccess: true },
    ];

  
    return (
        <div className="dashboardLayout">
            <style>{'body { background-color: #F3F3F6; }'}</style>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <Toolbar className="dashboardTopbar">
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} >
                        </Typography>
                        <Country />
                        <Profile />

                    </Toolbar>
                </AppBar>
                <Drawer
                    className="SideMenu"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            color: "#fff",
                            backgroundColor: "#170F4F",
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                    style={{ backgroundColor: "#170F4F", color: "#fff" }}
                >   
                    <img className="logo" src={Logo} ></img>
                    <List>
                        {listItemData.map((item, i) => (
                         (item.hasAccess) &&  !item.expandMore && <ListItem className="navlinks" activeClassName="activeNavLinks" key={i}
                                to={item.link}
                                component={NavLink}
                            >
                                <ListItemIcon>
                                    <img width="30" height="30" src={item.icon}></img>
                                </ListItemIcon>
                               
                                <ListItemText primary={item.label} />
                            </ListItem> 
                        ))}
                        
                                                    
                          
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3 }}
                >
                    <Toolbar />

                    {/* <Breadcrumbs /> */}
                    <Warehouse />
                </Box>
            </Box>
        </div>
    );
}
export { UserHome };
