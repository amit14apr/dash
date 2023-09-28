import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { WidgetTop } from "./widgetTop";
import { WidgetBottom } from "./widgetBottom";

import { Button } from '../../../Components';
import { useDispatch, useSelector } from 'react-redux';

import { inventoryActions } from '../../../_actions';
import './style.less';

function WarehouseDetails(props) {
    const [actionType,ViewData] = props.data || "";
    const actionProps = useSelector(state => state.commonProps.propsData)
    const userRoles = useSelector(state => state.users.roles)
    const hasAccess = userRoles?.indexOf('WAREHOUSE_CREATE') > -1;
    const facilityInfoData = [
        {"Facility Name": ViewData.name},
        {"Facility Type": ViewData.type},
        {"Facility Code": ViewData.code},
        ];
     const companyInfoData = [
        {"Attention Name": ViewData.companyDetails.attentionName},
        {"Compnay Name": ViewData.companyDetails.companyName},
        {"Owner Name": ViewData.companyDetails.ownerName},
        {"Business Nature": ViewData.companyDetails.businessNature},
        {"Tax Code":ViewData.companyDetails.taxCode},
        {"Tin No.": ViewData.companyDetails.tinNo},
     ];
     const locationInfoData = [
        {"Address":ViewData.addressDetails.addressLine1},
        {"City": ViewData.addressDetails.city},
        {"State": ViewData.addressDetails.state},
        {"Country": ViewData.addressDetails.country},
        {"Zip Code":ViewData.addressDetails.pinCode},
     ];
     const contactInfoData = [
        {"Phone Number": ViewData.contactDetails.phoneNumber},
        {"Mobile Number": ViewData.contactDetails.mobileNumber},
        {"Email": ViewData.contactDetails.emailId},
     ]
     const dispatch = useDispatch();
    const handleEdit= ()=>{
        dispatch(inventoryActions.commonProps(["Edit",ViewData]));
    }
    
     
    return (
        <div className="dashboardLayout">
            <Box >
                <div  style={{ display: 'flex'}}>
                <Typography  style={{ flex: 1 }}>
                    <h4>Warehouse Details</h4>
                </Typography>
                {hasAccess && <Button size="medium" label="Edit" onClick={handleEdit}></Button> }
                </div>
            
                <WidgetTop data = { [ "Facility Info", facilityInfoData ] }/>
                <br/>
                <WidgetTop data = { [ "Company Info", companyInfoData ] } />
                <br/>
                <div className="widgetBottomGroup">
                    <WidgetBottom data = { [ "Location Info", locationInfoData  ]} />
                    <WidgetBottom data = { [ "Contact Info", contactInfoData  ]} />
                </div>
            </Box>
        </div>
    );
}
export { WarehouseDetails };
