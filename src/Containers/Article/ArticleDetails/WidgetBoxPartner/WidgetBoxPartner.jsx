import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material'
import "./style.less";
import Date_icon from '../../../../_icons/Date_range.svg';
import typesOfServices_icon from '../../../../_icons/typesOfServices.svg';

function WidgetBoxPartner(props) {
  const [viewData, totalPartner] = props.data || [];
  const [partnerName, LiveDate, LaunchDate, TypesOfServices] = viewData;
  const ServiceData = TypesOfServices.Services.filter(e=> e);
  console.log("partnerName", partnerName, "LiveDate", LiveDate, "LaunchDate", LaunchDate, "TypesOfServices", ServiceData, "Total Partner", totalPartner)
  return (
    <div className={totalPartner && "col-md py-2"} key={1}>
    <div className="card card-body">
  <div className="partnerBOX">
    <div className={totalPartner == 1 ? " FullWidthBox" : "partnerWrapper"}>
      <div style={{padding: "20px 24px 20px"}}><label className="PartnerLabelTitle">{partnerName}</label></div>
      <div className="titleContainer"><span className='ttileIcon'><img src={Date_icon} /></span><h3 className="widgetLgTitle"> {"Live and Launch"}</h3></div>
      {
        <><Box style={{ display: "inline-flex", padding: "10px", width: "50%" }}>
          <Card elevation={0}>
            <CardContent>
              <Typography gutterBottom color={'text.secondary'} className="listTitle" component={'div'}>
                {"Live Date"}
              </Typography>
              <Typography variant='body2' className="listValue">
                {LiveDate}
              </Typography>
            </CardContent>
          </Card>
        </Box>
          <Box  style={{ display: "inline-flex", padding: "10px" }}>
            <Card elevation={0}>
              <CardContent>
                <Typography gutterBottom color={'text.secondary'} className="listTitle" component={'div'}>
                  {"Launch Date"}
                </Typography>
                <Typography variant='body2' className="listValue">
                  {LaunchDate}
                </Typography>
              </CardContent>
            </Card>
          </Box>    </>
}
<div style={{padding: "24px 24px 20px"}} className="titleContainer"><span className='ttileIcon'><img src={typesOfServices_icon} /></span><h3 className="widgetLgTitle"> {"Type of Services"}</h3></div>
{
  ServiceData.map((item,idx) =>{
    return <Box width='max-content' style={{ display: "inline-flex", padding: "10px" }}>
    <Card elevation={0}>
      <CardContent>
        <Typography gutterBottom color={'text.secondary'} className="listTitle" component={'div'}>
          {`Service ${idx+1}`}
        </Typography>
        <Typography variant='body2' className="listValue">
          {item}
        </Typography>
      </CardContent>
    </Card>
  </Box>
  })  
  }
    </div>
    </div>
  </div>
</div>
    
  );
}
export { WidgetBoxPartner }
