import React, {useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import './style.less'
const Loader = () => {
    
  const message = useSelector(state => state.loading);
  console.log(">>>>>>>Loader msg",message.isLoading);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
      if(message.isLoading){
        setOpen(true);
      } else {
        setOpen(false);
      }
},[message]);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div className="box"></div>
        <div className="box"></div>
      </Backdrop>
    </div>
  );
}
export { Loader };
