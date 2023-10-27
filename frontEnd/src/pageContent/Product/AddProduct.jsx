import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { Box, Button, FormControlLabel, List, ListItem, MenuItem, Switch, TextField } from "@mui/material"

function AddProduct() {
    const inputCloumn_1 = [
        { nameInput: 'urlProduct', placehoder: 'Vui lòng nhập URL Sản phẩm', labelInput: 'URL Sản phẩm', typeInput: 'text' },
        { nameInput: 'metaTitle', placehoder: 'Vui lòng nhập Meta Title', labelInput: 'Meta Title', typeInput: 'text' },
        { nameInput: 'metaDescription', placehoder: 'Vui lòng nhập Meta Description', labelInput: 'Meta Description', typeInput: 'text' },
        { nameInput: 'metaKeyword', placehoder: 'Vui lòng nhập từ khóa', labelInput: 'Meta Keyword', typeInput: 'text' },
    ]
    const sexAccount = [
        { valueInput: 2, label: 'Vui lòng chọn giới tính' },
        { valueInput: 0, label: 'Nam' },
        { valueInput: 1, label: 'Nữ' }
      ]
    const inputCloumn_2 = [
        { nameInput: 'nameProduct', placehoder: 'Vui lòng nhập tên Sản phẩm', labelInput: 'Tên Sản phẩm', typeInput: 'text' },
        { nameInput: 'idCategory', placehoder: 'Vui lòng chọn danh mục', labelInput: 'Danh mục', typeInput: 'select' },
        { nameInput: 'idStorage', placehoder: 'Vui lòng chọn dung lượng', labelInput: 'Dung lượng', typeInput: 'select' },
        { nameInput: 'priceProduct', placehoder: 'Vui lòng nhập Giá sản phẩm', labelInput: 'Giá Sản phẩm', typeInput: 'number' },
        { nameInput: 'priceThrough', placehoder: 'Vui lòng nhập Giá thị trường', labelInput: 'Giá thị trường', typeInput: 'number' },
    ]
    const inputCKEEditor = [
        { nameInput: 'productBox', placehoder: 'Thông tin của máy Box / Unbox', labelInput: 'Sản phẩm có gì ?', typeInput: 'text' },
        { nameInput: 'shortDescription', placehoder: 'Vui lòng nhập Mô rả ngắn', labelInput: 'Mô tả ngắn', typeInput: 'text' },
        { nameInput: 'reviewArticle', placehoder: 'Vui lòng soạn bài viết đánh giá', labelInput: 'Bài viết đánh giá', typeInput: 'text' },
    ]
    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "60%", marginRight: "10px" }}>
                <Box sx={{ backgroundColor: "white", borderRadius: "10px", width:"100%" }}>
                    <List>
                        <ListItem>
                            <Box sx={{ display: "flex" }}>
                                <img style={{ marginRight: "30px", borderRadius: "8px" }} height="120" width="120px" src="http://localhost:8081/images/img_avatar.png" />
                                <Box>
                                    <Button variant="contained" component="label" sx={{ width: "250px", marginRight: "10px" }}>
                                        <TextField
                                            name="imageProduct"
                                            type="file"
                                            fullWidth
                                            hidden
                                        />
                                        {"THÊM HÌNH ẢNH SẢN PHẨM"}
                                    </Button> {/* Thêm hình ảnh */}
                                </Box>
                            </Box>
                        </ListItem>
                    
                    {
                    inputCloumn_2.map((value, index) => (
                        value.typeInput == "select" ?
                        <ListItem key={index}>
                            <TextField
                                label={value.labelInput}
                                placeholder={value.placehoder}
                                type={value.typeInput}
                                name={value.nameInput}
                                size="medium"
                                select
                                fullWidth
                            >
                                {
                                    sexAccount.map((value) => (
                                        <MenuItem key={value.valueInput} value={value.valueInput}>
                                            {value.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </ListItem>
                        :
                        <ListItem>
                            <TextField
                                label={value.labelInput}
                                placeholder={value.placehoder}
                                type={value.typeInput}
                                name={value.nameInput}
                                size="medium"
                                fullWidth
                            />
                        </ListItem>
                    ))}
                    {
                    inputCKEEditor.map((value, index) => (
                        <ListItem key={index} >
                            <div style={{width:"100%"}}>
                            <CKEditor
                                editor={ClassicEditor}
                                onReady={(editor)=>{
                                    editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                       //use max-height(for scroll) or min-height(static)
                                       "height", 
                                       "200px",
                                       editor.editing.view.document.getRoot()
                                    );
                                 });
                                 }}
                            />
                            </div>
                        </ListItem>
                    ))}
                    </List>
                </Box>
            </Box>
            <Box sx={{ width: "40%"}}>
                <Box sx={{backgroundColor: "white", borderRadius: "10px" }}>
                    <List>
                    {
                    inputCloumn_1.map((value, index) => (
                        <ListItem key={index}>
                            <TextField
                                label={value.labelInput}
                                placeholder={value.placehoder}
                                name={value.nameInput}
                                size="medium"
                                fullWidth
                            />
                        </ListItem>
                    ))}
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