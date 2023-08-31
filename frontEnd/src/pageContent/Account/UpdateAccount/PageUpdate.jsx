import { useLocation } from 'react-router-dom';
import momen from 'moment'

import { Box, Button, CardMedia, MenuItem, TextField } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { useEffect, useState } from "react"
import { getAccountID } from "../../../Service/Account/AccountService"


function PageUpdate() {
    const location = useLocation()
    const idUser = location.pathname.split('/').filter(crumbs => crumbs !== '')[2]
    const [images, setImages] = useState('')
    const [dataID, setdataID] = useState([])
    const [updateData, setData] = useState([])
    const handleImages = (e) => {
        URL.revokeObjectURL(images)
        const img = e.target.files[0];
        img.preview = URL.createObjectURL(img)
        setImages(img.preview)
    }
    const inputValue = [
        { nameInput: 'imagesAccount', labelInput: 'Ảnh đại diện', typeInput: 'file', width: 12 },
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
        getAccountID(idUser).then((value) => {
            if (value.getStatus === "SUCCESS") {
                setdataID(value.info);
                setImages("http://localhost:8081/images/" + (value.info.imagesAccount != null ? value.info.imagesAccount : "img_avatar.png"))
            }


        })
    }, [])

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
                                    value={
                                        dataID[value.nameInput] != null ?
                                            value.typeInput == "date" ?
                                                momen(dataID[value.nameInput]).format('YYYY-MM-DD') :
                                                dataID[value.nameInput] :
                                            ""}
                                    type={value.typeInput}
                                    select={value.typeInput == "select" ? true : false}
                                    fullWidth

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
                ))
            }

            <Grid>
                <Button variant="contained" component="label" sx={{ marginRight: "10px" }}>
                    CẬP NHẬT
                </Button> {/* Thêm hình ảnh */}
                <Button variant="outlined" component="label" sx={{ width: "120px" }}>
                    ĐẶT LẠI
                </Button>
            </Grid>
        </Grid >
    )
}

export default PageUpdate