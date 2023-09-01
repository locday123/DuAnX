import { Box, Button, CardMedia, TextField } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

function PageUpdate() {
    const inputValue = [
        { nameInput: 'imagesAccount', labelInput: 'Ảnh đại diện', typeInput: 'file', width: 12 },
        { nameInput: 'nameAccount', placehoder: 'Vui lòng nhập tên', labelInput: 'Họ Tên', typeInput: 'text', width: 6 },
        { nameInput: 'emailAccount', placehoder: 'Vui lòng nhập email', labelInput: 'Email', typeInput: 'text', width: 6 },
        { nameInput: 'sexAccount', placehoder: 'Chọn giới tính', labelInput: 'Giới Tính', typeInput: 'select', width: 6 },
        { nameInput: 'phoneAccount', placehoder: 'Vui lòng nhập số điện thoại', labelInput: 'Điện Thoại', typeInput: 'text', width: 6 },
        { nameInput: 'dateAccount', placehoder: 'Vui lòng nhập năm sinh', labelInput: '', typeInput: 'date', width: 6 }
    ]

    return (
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {
                inputValue.map((value) => (
                    <Grid xs={value.width}>
                        {
                            value.typeInput == "file" ?
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img style={{ marginRight: "30px" }} height="120" width="120px" src="http://localhost:8081/images/user_S001.jpg" />
                                    <Box>
                                        <Button variant="contained" component="label" sx={{ width: "200px", align }}>
                                            <TextField
                                                label={value.labelInput}
                                                placeholder={value.placehoder}
                                                name={value.nameInput}
                                                fullWidth
                                                hidden
                                                type={value.typeInput}
                                            />
                                            {value.labelInput}
                                        </Button>
                                    </Box>
                                </Box>
                                :
                                <TextField
                                    label={value.labelInput}
                                    placeholder={value.placehoder}
                                    name={value.nameInput}
                                    fullWidth
                                    type={value.typeInput}
                                />
                        }

                    </Grid>
                )) /* Vòng lặp load ra input/grid */
            }
        </Grid >
    )
}

export default PageUpdate