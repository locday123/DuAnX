import {Alert, Box, IconButton, Tooltip, Grid, Button, Snackbar} from '@mui/material';
import {Delete, Edit, Preview} from '@mui/icons-material';
import { deleteAccount } from '../../../Service/Account/AccountService';
import { useState } from 'react';

function AccountAction({userID}){
    return(
        <Box>
            <Tooltip title="Xem chi tiết tài khoản">
                <IconButton color='primary'>
                    <Preview/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Xem chi tiết tài khoản">
                <IconButton color='primary'>
                    <Edit color='white'/>
                </IconButton>
            </Tooltip>
            <Tooltip title={'Xóa ID [ ' + userID+' ]'}>
                <IconButton color='primary' onClick={()=>
                    deleteAccount(userID).then((value)=>{
                       value
                    })}>
                    <Delete />
                </IconButton>
            </Tooltip>
            
        </Box>
        

    )
    
}

export default AccountAction;