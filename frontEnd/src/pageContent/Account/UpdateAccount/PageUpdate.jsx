import { Box, Button, CardMedia, MenuItem, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useState } from "react"

function PageUpdate() {

    const [images, setImages] = useState('http://localhost:8081/images/img_avatar.png')
    const handleImages = (e)=>{
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setImages(file.preview)
    }

    const removeImages = ()=>{
        URL.revokeObjectURL(images)
        setImages('http://localhost:8081/images/img_avatar.png')
    }
    const inputValue = [
        { nameInput: 'imagesAccount', labelInput: 'Ảnh đại diện', typeInput: 'file', width: 12 },
        { nameInput: 'nameAccount', placehoder: 'Vui lòng nhập tên', labelInput: 'Họ Tên', typeInput: 'text', width: 6 },
        { nameInput: 'passAccount', placehoder: 'Vui lòng nhập mật khẩu', labelInput: 'Mật khẩu', typeInput: 'password', width: 6 },
        { nameInput: 'emailAccount', placehoder: 'Vui lòng nhập email', labelInput: 'Email', typeInput: 'text', width: 6 },
        { nameInput: 'sexAccount', placehoder: 'Chọn giới tính', labelInput: 'Giới Tính', typeInput: 'select', width: 6 },
        { nameInput: 'phoneAccount', placehoder: 'Vui lòng nhập số điện thoại', labelInput: 'Điện Thoại', typeInput: 'text', width: 6 },
        { nameInput: 'dateAccount', placehoder: 'Vui lòng nhập năm sinh', labelInput: '', typeInput: 'date', width: 6 }
    ] /* Thông tin input */
    const sexAccount = [

        { valueInput: 2, label: 'Vui lòng chọn giới tính' },
        { valueInput: 0, label: 'Nam' },
        { valueInput: 1, label: 'Nữ' }
      ] /* Menu giới tính */

    return (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {
                inputValue.map((value,key) => (
                    <Grid key={key} xs={value.width}>
                    {
                    value.typeInput == "file" ?
                        <Box sx={{ display: "flex"}}>
                            <img style={{ marginRight: "30px", borderRadius:"8px" }} height="120" width="120px" src={images} />
                            <Box>
                                <Box sx={{marginBottom:"20px"}}>
                                    <Button variant="contained" component="label" sx={{ width: "200px", marginRight:"20px"}}>
                                        <TextField
                                            label={value.labelInput}
                                            placeholder={value.placehoder}
                                            name={value.nameInput}
                                            fullWidth
                                            hidden
                                            type={value.typeInput}
                                            onChange={handleImages}
                                        />
                                        {value.labelInput}
                                    </Button>
                                    <Button variant="outlined" component="label" sx={{ width: "100px"}} onClick={removeImages}>Đặt lại</Button>
                                </Box>
                                <Typography variant="p" sx={{color:"#3a3541ad"}}>Allowed PNG or JPEG. Max size of 800K.</Typography>
                            </Box> 
                        </Box> /* Hình ảnh, Upload, Đặt lại */
                        :
                        <TextField
                            label={value.labelInput}
                            placeholder={value.placehoder}
                            name={value.nameInput}
                            fullWidth
                            type={value.typeInput}
                            select={value.typeInput =="select"?true:false}
                            defaultValue={value.typeInput =="select"?"2":null}
                        >
                            {
                                value.typeInput =="select"?
                                sexAccount.map((value) => (
                                <MenuItem key={value.valueInput} value={value.valueInput}>
                                    {value.label}
                                </MenuItem>
                                )):""
                            }
                        </TextField> /* Input */
                    }
                    </Grid>
                )) /* Vòng lặp load ra input/grid */
            }
            <Grid>
                <Box>
                    <Button variant="contained" component="label" sx={{ marginRight: "10px"}}>Cập nhật</Button>
                    <Button variant="outlined" component="label" sx={{ width: "100px"}}>Đặt lại</Button>
                </Box>
            </Grid> {/* dsfsdfdsf */}
        </Grid >
    )
}

export default PageUpdate