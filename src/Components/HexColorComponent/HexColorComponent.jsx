import React from "react";
import Typography from '@mui/material/Typography';
import './style.less';


const HexColorComponent = (props) => {
  return (
    <div className="HexColorContainer" >
      <span className={props.WrapperWidth ? "HexColorWidth" : ""}> <span className="colorElement" style={{ backgroundColor: props.data || '' }} disabled /> </span> 
      {props.WrapperWidth && props.data }
    </div>
  );
};

export { HexColorComponent };
