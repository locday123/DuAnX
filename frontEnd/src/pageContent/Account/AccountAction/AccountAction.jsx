import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deleteAccount } from '../../../Service/Account/AccountService';
import { useContext } from 'react';
import Context from '../../../Context';

function AccountAction({ userID }) {
    const { setAlert, setMessage, setChange } = useContext(Context)

    return (
        <Box>
            <Tooltip title="Xem chi tiết tài khoản">
                <IconButton color='primary'>
                    <Preview />
                </IconButton>
            </Tooltip>
            <Tooltip title={'Cập nhật tài khoản [ ' + userID + ' ]'}>
                <Link to={"/account/edit/" + userID}>
                    <IconButton color='primary'>
                        <Edit color='white' />
                    </IconButton>
                </Link>
            </Tooltip>
            <Tooltip title={'Xóa ID [ ' + userID + ' ]'}>
                <IconButton color='primary' onClick={() =>
                    deleteAccount(userID).then((value) => {
                        setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                        setMessage(value.message)
                        setChange(true)
                    })}>
                    <Delete />
                </IconButton>
            </Tooltip>

        </Box>
    )

}

export default AccountAction;