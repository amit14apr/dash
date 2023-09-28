import React ,{ useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";

function AlertMessage() {
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);
  const [snackbarOpen , setSnackbarOpen] = useState(false);
  const [severityVal , setSeverity] = useState('success');
  const [colorVal , setColor] = useState('info');
  let snackbarMessage = alert.message; 
  const handleClose = (event, reason) => {
    setSnackbarOpen(false);
    if (reason === 'clickaway') {
      return;
    }
  };
  useEffect(() => {
    if (alert.message) {
      if(alert.type == 'alert-danger') {
        setSeverity('error');
        setColor('error');
    } else {
      setSeverity('success');
      setColor('info');
    }
     setSnackbarOpen(true);
  }
   
},[alert]);

  const vertical = "top";
  const horizontal = "center";
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity={severityVal} color ={colorVal} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export { AlertMessage };
