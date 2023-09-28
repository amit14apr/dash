import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material'
import "./style.less";

function WidgetTop(props) {
  const [TitleName, viewData] = props.data || [];

  return (
    <div className="widgetTop">
      <h3 className="widgetLgTitle"> {TitleName}</h3>
      {
        viewData.map((val) => {
          return <Box width='300px' style={{ display: "inline-flex", padding: "10px" }}>
            <Card elevation={0}>
              <CardContent>
                <Typography gutterBottom color={'text.secondary'} component={'div'}>
                  {Object.keys(val)}
                </Typography>
                <Typography variant='body2' >
                  {Object.values(val)}
                </Typography>
              </CardContent>
            </Card>

          </Box>
        })}
    </div>
  );
}

export { WidgetTop }
