import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material'
import "./style.less";

function WidgetBottom(props) {
  const [TitleName, viewData] = props.data || [];
  return (
    <div className="widgetBottom">
        <h3 className="widgetLgTitle"> {TitleName}</h3>
      {
        viewData.map((val) => {
          return <Box width='180px' style={{ display: "inline-flex" }}>
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
export { WidgetBottom }
