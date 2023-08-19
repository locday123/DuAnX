import { useContext } from 'react';
import { Snackbar } from '@mui/material';
import Context from '../Context';

function AlertMessage(){
    const {alert, message, handleClose} = useContext(Context)
    const { vertical, horizontal, open } = alert;

    return(
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            key={vertical + horizontal}
        />
    )
}

export default AlertMessage;