import { Box, Button, FormControlLabel, List, ListItem, Switch, TextField } from "@mui/material"

function AddProduct() {
    const inputCloumn_1 = [
        { nameInput: 'urlProduct', placehoder: 'Vui lòng nhập URL Sản phẩm', labelInput: 'URL Sản phẩm', typeInput: 'text' },
        { nameInput: 'metaTitle', placehoder: 'Vui lòng nhập Meta Title', labelInput: 'Meta Title', typeInput: 'text' },
        { nameInput: 'metaDescription', placehoder: 'Vui lòng nhập Meta Description', labelInput: 'Meta Description', typeInput: 'text' },
        { nameInput: 'metaKeyword', placehoder: 'Vui lòng nhập từ khóa', labelInput: 'Meta Keyword', typeInput: 'text' },
    ]

    const inputCloumn_2 = [
        { nameInput: 'nameProduct', placehoder: 'Vui lòng nhập tên Sản phẩm', labelInput: 'Tên Sản phẩm', typeInput: 'text' },
        { nameInput: 'priceProduct', placehoder: 'Vui lòng nhập Giá sản phẩm', labelInput: 'Giá Sản phẩm', typeInput: 'text' },
        { nameInput: 'priceThrough', placehoder: 'Vui lòng nhập Giá thị trường', labelInput: 'Giá thị trường', typeInput: 'text' },
    ]
    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "60%", borderRadius: "10px", marginRight: "10px" }}>
                <Box sx={{ backgroundColor: "white", borderRadius: "10px" }}>
                    <List>
                        <ListItem>
                            <Box sx={{ display: "flex" }}>
                            <img style={{ marginRight: "30px", borderRadius: "8px" }} height="120" width="120px" src="http://localhost:8081/images/img_avatar.png" />
                            <Box>
                                <Button variant="contained" component="label" sx={{ width: "200px", marginRight: "10px" }}>
                                    <TextField
                                        label={""}
                                        placeholder={"value.placehoder"}
                                        name={"value.nameInput"}
                                        type="file"
                                        fullWidth
                                        hidden
                                    />
                                    {"value.labelInput"}
                                </Button> {/* Thêm hình ảnh */}
                            </Box>
                            </Box>
                        </ListItem>
                    
                    {
                        inputCloumn_2.map((value, index) => (
                        <ListItem>
                            <TextField
                                label={value.labelInput}
                                placeholder={value.placehoder}
                                name={value.nameInput}
                                size="small"
                                fullWidth
                                    />
                        </ListItem>
                        ))
                        
                    }
                    </List>
                </Box>
            </Box>
            <Box sx={{ width: "40%"}}>
                <Box sx={{backgroundColor: "white", borderRadius: "10px" }}>
                    <List>
                    {
                        inputCloumn_1.map((value, index) => (
                        <ListItem>
                            <TextField
                                label={value.labelInput}
                                placeholder={value.placehoder}
                                name={value.nameInput}
                                size="medium"
                                fullWidth
                                    />
                        </ListItem>
                        ))
                        
                    }
                        <ListItem>
                            <Box>
                                <FormControlLabel
                                    value="start"
                                    control={<Switch color="primary" />}
                                    label="Ẩn / Hiện Sản phẩm"
                                
                                    labelPlacement="start"
                                />
                            </Box>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Box>
    )
}

export default AddProduct