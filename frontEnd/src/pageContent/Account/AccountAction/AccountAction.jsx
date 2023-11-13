import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deleteAccount } from '../../../Service/Account/AccountService';
import { useContext } from 'react';
import Context from '../../../Context';

function AccountAction({ userID }) {
    const { setAlert, setMessage, setChange } = useContext(Context)
    const listAction = [
        {name: "preview", title: "Xem chi tiết tài khoản", icon: <Preview /> }, 
        {name: "update", title: "Cập nhật tài khoản [" + userID + "]", icon: <Edit/> },
        {name: "delete", title: "Xóa ID ["+ userID +"]", icon: <Delete/>}
    ]

    const actionButton = (user, action) => {
        if (action == "delete") {
            deleteAccount(user).then((value) => {
                setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                setMessage(value.message)
                setChange(true)
            })
        }
    }
    return (
        <Box>
            {listAction.map((value, index) => (
                <Tooltip key={index} title={value.title}>
                    {
                        value.name == "update" ?
                        <Link to={"/account/edit/" + userID}>
                            <IconButton color='primary'>
                                {value.icon}
                            </IconButton>
                        </Link>
                        :
                        <IconButton color='primary' onClick={()=>actionButton(userID, value.name)}>
                                {value.icon}
                        </IconButton>
                    }
                    
                </Tooltip>
            ))}
            

        </Box>
    )

}

export default AccountAction;