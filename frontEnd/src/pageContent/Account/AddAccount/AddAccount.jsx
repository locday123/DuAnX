import { useState, Fragment, useContext } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { List, ListItem, TextField, MenuItem } from '@mui/material';
import { addAccount } from '../../../Service/Account/AccountService';
import Context from '../../../Context';

export default function AddAccount() {
  const [state, setState] = useState({
    right: false,
  });

  const { setAlert, setMessage, setAcc_ischange } = useContext(Context)
  const [dataAccount, setAccount] = useState([])


  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });

  };
  const inputValue = [
    { nameInput: 'nameAccount', placehoder: 'Vui lòng nhập tên', labelInput: 'Họ Tên', typeInput: 'text' },
    { nameInput: 'passAccount', placehoder: 'Vui lòng nhập mật khẩu', labelInput: 'Mật khẩu', typeInput: 'password' },
    { nameInput: 'emailAccount', placehoder: 'Vui lòng nhập email', labelInput: 'Email', typeInput: 'text' },
    { nameInput: 'sexAccount', placehoder: 'Chọn giới tính', labelInput: 'Giới Tính', typeInput: 'select' },
    { nameInput: 'phoneAccount', placehoder: 'Vui lòng nhập số điện thoại', labelInput: 'Điện Thoại', typeInput: 'text' },
    { nameInput: 'dateAccount', placehoder: 'Vui lòng nhập năm sinh', labelInput: '', typeInput: 'date' }
  ]
  const sexAccount = [
    { valueInput: 2, label: 'Vui lòng chọn giới tính' },
    { valueInput: 1, label: 'Nam' },
    { valueInput: 0, label: 'Nữ' }
  ]

  const list = (anchor) => (
    <Box sx={{ width: 350, height: 50, backgroundColor: '#f5f5f9', padding: 2, marginBottom: 2 }}>
      THÊM TÀI KHOẢN
      <List sx={{ marginTop: 2 }}>
        {
          inputValue.map((value, index) => (
            <ListItem key={index}>
              <TextField
                label={value.labelInput}
                placeholder={value.placehoder}
                name={value.nameInput}
                type={value.typeInput}
                defaultValue={value.typeInput == "select" ? 2 : ""}
                onChange={(e) => setAccount({ ...dataAccount, [value.nameInput]: e.target.value })}
                select={value.typeInput == "select" ? true : false}
                fullWidth

              >
                {
                  value.typeInput == "select" ?
                    sexAccount.map((value) => (
                      <MenuItem key={value.valueInput} value={value.valueInput}>
                        {value.label}
                      </MenuItem>
                    )) : ""
                }
              </TextField>
            </ListItem>
          ))
        }
        <ListItem >
          <Button variant="contained"
            sx={{ marginRight: 2 }}
            onClick={() =>
              addAccount(dataAccount).
                then((value) => {
                  setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                  setMessage(value.message)
                  setAcc_ischange(true)
                })
            }
          >Thêm tài khoản</Button>
          <Button variant="contained">Hủy</Button>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <div>
      {['right'].map((anchor) => (
        <Fragment key={anchor}>
          <Button variant="contained" onClick={toggleDrawer(anchor, true)}>THÊM TÀI KHOẢN</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
}