import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material'
import "./style.less";
import { HexColorComponent } from '../../../../Components';
function Widget_FullWidth(props) {
  const [TitleIcon,TitleName, viewData] = props.data || [];

  return (
    <div className="widgetTopBox">
      {/* <div className="titleContainer"><span className='ttileIcon'><img src={TitleIcon} /></span><h3 className="widgetLgTitle"> {TitleName}</h3></div> */}
      
      <div className="titleContainer"><span className='ttileIcon'><img src={TitleIcon} /></span><h3 className="widgetLgTitle"> {TitleName}</h3></div>
      {
        viewData.map((val) => {
          return <Box width='25%' style={{ display: "inline-flex", padding: "10px" }}>
            <Card elevation={0}>
              <CardContent>
                <Typography gutterBottom color={'text.secondary'} className="listTitle" component={'div'}>
                  {Object.keys(val)}
                </Typography>
                <Typography variant='body2' className="listValue"  >
                  {Object.values(val)  == '' ?  '-': Object.keys(val) == "HEX Code" ?  <HexColorComponent data={Object.values(val)} WrapperWidth={true} /> : Object.values(val) }
                </Typography>
              </CardContent>
            </Card>

          </Box>
        })}
    </div>
  );
}

export { Widget_FullWidth }
