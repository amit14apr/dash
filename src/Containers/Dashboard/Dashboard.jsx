import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { WidgetLg } from "../Dashboard/widgetLg";
import { WidgetSm } from "../Dashboard/widgetSm";
import './style.less';

const drawerWidth = 240;

function Dashboard() {
    return (
        <div className="dashboardLayout">
            <Box >
            <Typography style={{ flex: 1 }}>
                    <h4>Dashboard</h4>
                </Typography>
                <WidgetLg />
                <br/>
                <div className="homeWidgets">
                    <WidgetSm />
                    <WidgetLg />
                </div>
            </Box>
        </div>
    );
}
export { Dashboard };
