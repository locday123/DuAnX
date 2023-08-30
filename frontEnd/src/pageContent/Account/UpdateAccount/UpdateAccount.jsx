import { Box, Paper, Tab, Tabs } from "@mui/material"


function UpdateAccount (){
    const inputValue = [
        { nameInput: 'imagesAccount', labelInput: 'Ảnh đại diện', typeInput: 'file' },
        { nameInput: 'nameAccount', placehoder: 'Vui lòng nhập tên', labelInput: 'Họ Tên', typeInput: 'text' },
        { nameInput: 'passAccount', placehoder: 'Vui lòng nhập mật khẩu', labelInput: 'Mật khẩu', typeInput: 'password' },
        { nameInput: 'emailAccount', placehoder: 'Vui lòng nhập email', labelInput: 'Email', typeInput: 'text' },
        { nameInput: 'sexAccount', placehoder: 'Chọn giới tính', labelInput: 'Giới Tính', typeInput: 'select' },
        { nameInput: 'phoneAccount', placehoder: 'Vui lòng nhập số điện thoại', labelInput: 'Điện Thoại', typeInput: 'text' },
        { nameInput: 'dateAccount', placehoder: 'Vui lòng nhập năm sinh', labelInput: '', typeInput: 'date' }
      ]
    return (
        <Box>
            <Paper elevation={3} sx={{borderRadius:'10px'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs>
                        <Tab label="Item One" />
                        <Tab label="Item Two"/>
                        <Tab label="Item Three"/>
                    </Tabs>
                </Box>
                abc
            </Paper>
        </Box>
    )
}

export default UpdateAccount