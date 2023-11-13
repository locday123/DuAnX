import momen from 'moment'

import { Box, Button, CardMedia, MenuItem, TextField } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useContext, useEffect, useState } from "react"
import { updateAccount } from "../../../Service/Account/AccountService"
import Context from '../../../Context'


function PageUpdate({ dataID }) {
    const [images, setImages] = useState('')
    const [userUpdate, setUser] = useState([])
    const [imagesUpload, setIMGUpload] = useState([])
    const { setAlert, setMessage } = useContext(Context)
    const handleImages = (e) => {
        URL.revokeObjectURL(images)
        const img = e.target.files[0];
        img.preview = URL.createObjectURL(img)
        setImages(img.preview)
        setIMGUpload({ ...imagesUpload, ['imagesAccount']: e.target.files[0] })
        setUser({ ...userUpdate, ['imagesAccount']: "user_" + dataID.idAccount + ".jpg" })
    }
    const inputValue = [
        { nameInput: 'imagesAccount', labelInput: 'Chọn Ảnh đại diện', typeInput: 'file', width: 12 },
        { nameInput: 'nameAccount', placehoder: 'Vui lòng nhập tên', labelInput: 'Họ Tên', typeInput: 'text', width: 6 },
        { nameInput: 'emailAccount', placehoder: 'Vui lòng nhập email', labelInput: 'Email', typeInput: 'text', width: 6 },
        { nameInput: 'sexAccount', placehoder: 'Chọn giới tính', labelInput: 'Giới Tính', typeInput: 'select', width: 6 },
        { nameInput: 'phoneAccount', placehoder: 'Vui lòng nhập số điện thoại', labelInput: 'Điện Thoại', typeInput: 'text', width: 6 },
        { nameInput: 'dateAccount', placehoder: 'Vui lòng nhập năm sinh', labelInput: '', typeInput: 'date', width: 6 }
    ]
    const sexAccount = [
        { valueInput: 2, label: 'Chưa cập nhật' },
        { valueInput: 1, label: 'Nam' },
        { valueInput: 0, label: 'Nữ' }
    ]
    useEffect(() => {
        
        setImages("http://localhost:8081/images/" + (dataID['imagesAccount'] != null ? dataID['imagesAccount'] : "img_avatar.png"))
        return () => {
            URL.revokeObjectURL(images)
        }
    }, [dataID])
    return (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {
                inputValue.map((value, key) => (
                    <Grid key={key} xs={value.width}>
                        {
                            value.typeInput == "file" ?
                                <Box sx={{ display: "flex" }}>
                                    <img style={{ marginRight: "30px", borderRadius: "8px" }} height="120" width="120px" src={images} />
                                    <Box>
                                        <Button variant="contained" component="label" sx={{ width: "200px", marginRight: "10px" }}>
                                            <TextField
                                                label={value.labelInput}
                                                placeholder={value.placehoder}
                                                name={value.nameInput}
                                                type={value.typeInput}
                                                onChange={handleImages}
                                                fullWidth
                                                hidden
                                            />
                                            {value.labelInput}
                                        </Button> {/* Thêm hình ảnh */}
                                    </Box>
                                </Box>
                                :
                                <TextField
                                    label={value.labelInput}
                                    placeholder={value.placehoder}
                                    name={value.nameInput}
                                    type={value.typeInput}
                                    select={value.typeInput == "select" ? true : false}
                                    onChange={(e) => setUser({ ...userUpdate, [value.nameInput]: e.target.value })}
                                    fullWidth
                                    defaultValue={dataID[value.nameInput] != null ?
                                        value.typeInput == "date" ?
                                            momen(dataID[value.nameInput]).format('YYYY-MM-DD') :
                                            dataID[value.nameInput] :
                                        ""}

                                >
                                    {
                                        value.typeInput == "select" &&
                                        sexAccount.map((value) => (
                                            <MenuItem key={value.valueInput} value={value.valueInput}>
                                                {value.label}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField> /* Load input */
                        }
                    </Grid>
                )) /* Vòng lặp load ra input/grid */
            }

            <Grid>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ marginRight: "10px" }}
                    onClick={() => updateAccount(dataID.idAccount, imagesUpload, userUpdate).then((value) => {
                        setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                        setMessage(value.message)
                    })}
                >
                    CẬP NHẬT
                </Button> {/* Cập nhật */}
            </Grid>
        </Grid >
    )
}

export default PageUpdate