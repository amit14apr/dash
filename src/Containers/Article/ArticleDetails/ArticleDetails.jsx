import React, { useState, useEffect, useLayoutEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import { Widget_FullWidth } from "./Widget_FullWidth";
import { WidgetBox } from "./WidgetBox";
import { WidgetBoxPartner } from './WidgetBoxPartner';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumbs } from '../../../Components'
import world_icon from '../../../_icons/world.svg';
import Location_icon from '../../../_icons/Location_icon.svg';
import price from '../../../_icons/Price.svg';
import Date_icon from '../../../_icons/Date_range.svg';
import List_alt from '../../../_icons/List_alt.svg';
import Edit_attributes from '../../../_icons/Edit_attributes.svg';
import './style.less';

function ArticleDetails(props) {
  const [actionType, ViewData] = props.data || "";
  const actionProps = useSelector(state => state.commonProps.propsData)
  const userRoles = useSelector(state => state.users.roles)
  const Accessories = useSelector(state => state.article.listMappedAccessoriesBySKU)
  const PriceInfo = useSelector(state => state.article.suggestedRetailPriceInfo)
  const systemConfigurationData = useSelector(state => state.article.articleSystemConfigurationInfo)
  const [AccessoriesList, setAccessoriesList] = useState([]);
  const [SRP_PriceInfo, setSRP_PriceInfo] = useState({});
  const [systemConfigurationList, setSystemConfigurationList] = useState({});
  const hasAccess = userRoles?.indexOf('GLOBAL_ARTICLE_DETAILS') > -1;
  useEffect(() => {
    setAccessoriesList(Accessories)
    console.log("Accessories List", AccessoriesList)
  }, [Accessories])
  
  useEffect(() => {
    setSRP_PriceInfo(PriceInfo);
    console.log("Price", PriceInfo)
  }, [PriceInfo])

  useEffect(() => {
      setSystemConfigurationList(systemConfigurationData);
  },[systemConfigurationData])

  const DeviceInfo = [
    { "SKU Type": ViewData?.serialized ? "Serialised" : "Non Serialised" },
    { "Article Type": ViewData?.type?.code },
    { "Article Description": ViewData?.description?.code },
    { "Front Image": "NA" },
    { "Back Image": "NA" },
    { "Manufacturer Name": ViewData?.manufacturer?.code },
    { "Series 1 (Family Name)": ViewData?.seriesOne?.code },
    { "Series 2 (No.)": ViewData?.seriesTwo?.code },
    { "Network Connection": ViewData?.attributes?.networkConnection?.value },
    { "Network Technology": ViewData?.attributes?.networkTechnology?.value },
    { "RAM": ViewData?.attributes?.ram?.value },
    { "Storage Size/ROM": ViewData?.attributes?.storageSize?.value },
    { "Color Name": ViewData?.color?.code },
    { "HEX Code": ViewData?.attributes?.hexCode?.value },
    { "Operating System": ViewData?.attributes?.operatingSystem?.value },
    { "Screen Size (inches)": ViewData?.attributes?.size?.value },
    { "Front Camera (MP)": ViewData?.attributes?.frontCamera?.value.EN },
    { "Rear Camera (MP)": ViewData?.attributes?.frontCamera?.value.EN },
    { "Battery size (maH)": ViewData?.attributes?.batterySize?.value.EN },
    { "Cable": ViewData?.attributes?.cable?.value },
    { "Charging Capacity (W)": ViewData?.attributes?.capacity?.value.EN }
  ];
  const GlobalAttributesSerialised = [
    { "SKU Type": "Serialised" },
    { "Article Type": ViewData?.type?.code },
    { "Article Description": ViewData?.description?.code },
    { "Manufacturer Name": ViewData?.manufacturer?.code },
    { "Series 1 (Family Name)": ViewData?.seriesOne?.code },
    { "Series 2 (No.)": ViewData?.seriesTwo?.code },
    { "Network Connection": ViewData?.attributes?.networkConnection?.value },
    { "Network Technology": ViewData?.attributes?.networkTechnology?.value },
    { "RAM": ViewData?.attributes?.ram?.value },
    { "Storage Size/ROM": ViewData?.attributes?.storageSize?.value },
    { "Color Name": ViewData?.color?.code },
    { "HEX Code": ViewData?.attributes?.hexCode?.value },
    { "Operating System": ViewData?.attributes?.operatingSystem?.value },
    { "Screen Size (inches)": ViewData?.attributes?.size?.value },
    { "Front Camera (MP)": ViewData?.attributes?.frontCamera?.value.EN },
    { "Rear Camera (MP)": ViewData?.attributes?.frontCamera?.value.EN },
    { "Battery size (maH)": ViewData?.attributes?.batterySize?.value.EN },
    { "Cable": ViewData?.attributes?.cable?.value },
    { "Charging Capacity (W)": ViewData?.attributes?.capacity?.value.EN }
  ];
  const GlobalAttributesNonSerialised = [
    { "SKU Type": "Non Serialised" },
    { "Article Type": ViewData?.type?.code },
    { "Article Description": ViewData?.description?.code },
    { "Manufacturer Name": ViewData?.manufacturer?.code },
    { "Series 1 (Family Name)": ViewData?.seriesOne?.code },
    { "Series 2 (No.)": ViewData?.seriesTwo?.code },
    { "Color Name": ViewData?.color?.code },
    { "HEX Code": ViewData?.attributes?.hexCode?.value },
    { "Screen Size (inches)": ViewData?.attributes?.size?.value },
    { "Front Camera (MP)": ViewData?.attributes?.frontCamera?.value.EN },
    { "Rear Camera (MP)": ViewData?.attributes?.frontCamera?.value.EN },
    { "Battery size (maH)": ViewData?.attributes?.batterySize?.value.EN },
    { "Cable": ViewData?.attributes?.cable?.value },
    { "Charging Capacity (W)": ViewData?.attributes?.capacity?.value.EN }
  ];
  const LocalAttributes = [
    { "Article Description": ViewData?.description?.name.zh_HK },
    { "Manufacturer Name": ViewData?.manufacturer?.name.zh_HK },
    { "Color Name": ViewData?.color?.name.zh_HK },
    { "Series 1 (Family Name)": ViewData?.seriesOne?.name.zh_HK },
    { "Series 2 (No.)": ViewData?.seriesTwo?.name.zh_HK },
    { "Sim Card Type": ViewData?.attributes?.simType?.value.HK },
    { "Model No.": ViewData?.attributes?.modelNumber?.value.HK },
    { "Front Camera (MP)": ViewData?.attributes?.frontCamera?.value.HK },
    { "Rear Camera (MP)": ViewData?.attributes?.frontCamera?.value.HK },
    { "Battery size (maH)": ViewData?.attributes?.batterySize?.value.HK },
    { "Charging Capacity (W)": ViewData?.attributes?.capacity?.value.HK },
    { "Language": "zh_HK" }
  ];
  const MappedAccessoriesData = [];
  AccessoriesList ? AccessoriesList.map((item,idx)=> MappedAccessoriesData.push({[`Accessories ${idx+1}`] : item})) : MappedAccessoriesData.push({})

  const CurrencyInfoData = [
    {"Currency" :  SRP_PriceInfo.currencyCode},
    {"SRP" : SRP_PriceInfo.amount}
  ];
 
  let SystemConfigData = [
    {"Live Date" :  systemConfigurationList ? systemConfigurationList.LiveDate : "-"},
    {"Launch Date" : systemConfigurationList ? systemConfigurationList.launchDate : "-"}
  ]
  const PartnerArr = [];
  let localiseForPartner = false;
  if(systemConfigurationList && systemConfigurationList.LiveDate === undefined){
    localiseForPartner = true;
    for (let i in systemConfigurationList) {
        console.log(i)
        console.log(systemConfigurationList[i].LiveDate)
        console.log(systemConfigurationList[i].LaunchDate)
        console.log(systemConfigurationList[i].Service.swap)
        console.log(systemConfigurationList[i].Service.swtich)
        console.log(systemConfigurationList[i].Service.D2C)
        PartnerArr.push(
          [ i ,
          systemConfigurationList[i].LiveDate,
          systemConfigurationList[i].LaunchDate,
            {"Services" : [systemConfigurationList[i].Service.swap && "Available for Swap ", 
                                    systemConfigurationList[i].Service.swtich && "Available for Switch ", 
                                    systemConfigurationList[i].Service.D2C && "Available for Direct To Customer (DTC)"]
            }]
        )
      }
    }

  const [value, setValue] = React.useState(ViewData.market ? '2' : '1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className="ArticleDetailsLayout">
      <Breadcrumbs module="Article" sku={ViewData.sku} pathName="article" />
      <Box sx={{ display: 'flex', paddingLeft: "10px" }}>
        <Typography style={{ display: "flex" }}>
          <label className='ArticleDetailsTitleText'>{`Article ${ViewData.sku}`}</label>
          {ViewData.market && <span className='MarketInfoContainer'><span className='localiseMarketText'>{"localised market:"}</span> {ViewData.market.map(item => <span className='marketList'>{item}</span>)}</span>}
        </Typography>
      </Box>
      <Box sx={{ width: '100%', paddingLeft: "15px", typography: 'body1' }}>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} aria-label="lab">
              <Tab style= {{
  labelStyle: { textTransform: 'none' }
}} disableRipple icon={<img src={world_icon} />} iconPosition="start" label="Global" value="1" />
              {ViewData.market ? ViewData?.market?.map(item => <Tab disableRipple icon={<img src={Location_icon} />} label={item} value="2" />) : <></>}
            </TabList>
          </Box>
          <TabPanel value="1"><Widget_FullWidth data={["","Device Info", DeviceInfo]} /></TabPanel>
          <TabPanel value="2">
            <div className="widgetBottomContainer">
              <WidgetBox data={[price,"Price", CurrencyInfoData, localiseForPartner]} />
             {localiseForPartner == false ? <WidgetBox data={[Date_icon,"Live and Launch", SystemConfigData, localiseForPartner]} /> :  <></> } 
            </div>
           
            <div className="container py-2 widgetPartnerContainer">
            <div className="row">
            {localiseForPartner == true ? PartnerArr.map((item)=><WidgetBoxPartner data={[item,PartnerArr.length]} />) : <></> }
            </div>
            </div>
            
            <Widget_FullWidth data={[List_alt,"Accessories", MappedAccessoriesData]} />
           
            <Widget_FullWidth data={[Edit_attributes,"Global Attributes", ViewData?.serialized ? GlobalAttributesSerialised : GlobalAttributesNonSerialised]} />
          
            <Widget_FullWidth data={[Edit_attributes,"Local Attributes", LocalAttributes]} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
export { ArticleDetails };
