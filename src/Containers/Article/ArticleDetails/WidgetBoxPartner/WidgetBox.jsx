import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material'
import "./style.less";

function WidgetBox(props) {
  const [TitleIcon,TitleName, viewData, localiseForPartner] = props.data || [];

  return (
    <div className={localiseForPartner == true ? "widgetBox FullWidthBox" : "widgetBox"}>
        <div className="titleContainer"><span className='ttileIcon'><img src={TitleIcon} /></span><h3 className="widgetLgTitle"> {TitleName}</h3></div>
        {
        viewData.map((val) => {
      return <Box width='50%' style={{ display: "inline-flex", padding: "10px" }}>
              <Card elevation={0}>
                <CardContent>
                  <Typography gutterBottom color={'text.secondary'} className="listTitle" component={'div'}>
                  {Object.keys(val)}
                  </Typography>
                  <Typography variant='body2'  className="listValue">
                  {Object.values(val)  == '' ?  '-': Object.keys(val) == "HEX Code" ?  <HexColorComponent data={Object.values(val)} WrapperWidth={true} /> : Object.values(val) }
                  </Typography>
                </CardContent>
              </Card>

            </Box>
        })}
    </div>
  );
}
export { WidgetBox }
