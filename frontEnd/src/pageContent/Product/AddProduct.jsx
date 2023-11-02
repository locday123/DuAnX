import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { Box, Button, FormControlLabel, InputAdornment, List, ListItem, ListSubheader, MenuItem, Switch, TextField } from "@mui/material"
import { forwardRef, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import PropTypes from 'prop-types';
import { getProduct } from "../../Service/Product/ProductService";
import { TreeCategory, slugify } from "../../Hook/Hook";
import { Tree } from "antd";
const NumericFormatCustom = forwardRef(function NumericFormatCustom(
    props,
    ref,
  ) {
    const { onChange, ...other } = props;
  
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator={"."}
        decimalSeparator={","}
        valueIsNumericString
      />
    );
  });
  
  NumericFormatCustom.propTypeses = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
function AddProduct() {
    const [dataProduct, setDataProduct] = useState([])
    const [data, setData] = useState([])
    const [onFocus, setFocus] = useState([])
    const inputCloumn_1 = [
        { nameInput: 'urlProduct', placehoder: 'Vui lòng nhập URL Sản phẩm', labelInput: 'URL Sản phẩm', typeInput: 'text' },
        { nameInput: 'metaTitle', placehoder: 'Vui lòng nhập Meta Title', labelInput: 'Meta Title', typeInput: 'text' },
        { nameInput: 'metaDescription', placehoder: 'Vui lòng nhập Meta Description', labelInput: 'Meta Description', typeInput: 'text' },
        { nameInput: 'metaKeyword', placehoder: 'Vui lòng nhập từ khóa', labelInput: 'Meta Keyword', typeInput: 'text' },
    ]
    const inputCloumn_2 = [
        { nameInput: 'nameProduct', placehoder: 'Vui lòng nhập tên Sản phẩm', labelInput: 'Tên Sản phẩm', typeInput: 'text' },
        { nameInput: 'idStorage', placehoder: 'Vui lòng chọn dung lượng', labelInput: 'Dung lượng', typeInput: 'select' },
        { nameInput: 'priceProduct', placehoder: 'Vui lòng nhập Giá sản phẩm', labelInput: 'Giá Sản phẩm', typeInput: 'number' },
        { nameInput: 'priceThrough', placehoder: 'Vui lòng nhập Giá thị trường', labelInput: 'Giá thị trường', typeInput: 'number' },
    ]
    const inputCKEEditor = [
        { nameInput: 'productBox', placehoder: 'Thông tin của máy Box / Unbox', labelInput: 'Sản phẩm có gì ?', typeInput: 'text' },
        { nameInput: 'shortDescription', placehoder: 'Vui lòng nhập Mô rả ngắn', labelInput: 'Mô tả ngắn', typeInput: 'text' },
        { nameInput: 'reviewArticle', placehoder: 'Vui lòng soạn bài viết đánh giá', labelInput: 'Bài viết đánh giá', typeInput: 'text' },
    ]
    console.log(dataProduct);
    useEffect(() => {
        getProduct().then((value) => {
            setData({ ...data, 
                listCategory: TreeCategory(value[0], null),
                listStorage: value[2]
            })
        });
    }, [])
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
                        <ListItem sx={{ display: "flex" }}>
                            <Button variant="contained" size="large" sx={{width:"45%", marginRight:"10px"}}> THÊM DANH MỤC </Button>
                            <Tree
                                showLine
                                fieldNames={{
                                    children: 'childCategory',
                                    title: 'nameCategory',
                                    value: 'idCategory',
                                }}
                                rootStyle={{
                                    width: '100%',
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 150,
                                    fontSize: "16px",
                                    border: "1px solid #c4c4c4",
                                    borderRadius: "5px",
                                    padding: "8px",
                                }}
                                treeData={data.listCategory}
                                onSelect={(idCategory,category)=>{setDataProduct({...dataProduct, ["idCategory"]: category.node.idCategory})}}
                            />
                            
                        </ListItem>
                    {
                    inputCloumn_2.map((value, index) => (
                        value.typeInput == "select" ?
                        <ListItem key={index}>
                            <TextField
                                label={value.labelInput}
                                placeholder={value.placehoder}
                                name={value.nameInput}
                                defaultValue={0}
                                size="medium"
                                select
                                fullWidth
                                onFocus={() => setFocus({ ...focus, "focus": value.nameInput })}
                                onChange={(e)=>setDataProduct({...dataProduct, [value.nameInput]:e.target.value})}
                            >
                                <MenuItem key={0} value={0}>
                                       {value.placehoder}
                                </MenuItem>
                                {
                                   data.listStorage?.map((content) => (
                                        <MenuItem key={content.idStorage} value={content.idStorage}>
                                            {content.nameSpace}
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
                                name={value.nameInput}
                                size="medium"
                                fullWidth
                                InputProps={
                                    { inputComponent: value.typeInput == "number" ? NumericFormatCustom : null }
                                }
                                onFocus={() => setFocus({ ...focus, "focus": value.nameInput })}
                                onChange={(e) =>
                                    {
                                        setDataProduct({...dataProduct, [value.nameInput]:e.target.value})
                                        if(value.nameInput=="nameProduct"){
                                            setFocus({
                                                ...focus,
                                                ["urlProduct"]: slugify(e.target.value),
                                                ["metaTitle"]: e.target.value,
                                                ["metaDescription"]: e.target.value
                                            })
                                            setDataProduct(
                                                {
                                                    ...dataProduct,
                                                    [value.nameInput]: e.target.value,
                                                    ["urlProduct"]: slugify(e.target.value),
                                                    ["metaTitle"]: e.target.value,
                                                    ["metaDescription"]: e.target.value
                                                }
                                            )
                                        }
                                    }  
                                }
                            />
                        </ListItem>
                    ))}
                    {
                    inputCKEEditor.map((value, index) => (
                        <ListItem key={index} >
                            <div style={{width:"100%"}}>
                            <CKEditor
                                editor={ClassicEditor}
                                config={{placeholder: value.placehoder}} 
                                onReady={(editor)=>{
                                    editor.editing.view.change((writer) => {
                                        writer.setStyle(
                                        //use max-height(for scroll) or min-height(static)
                                        "height", 
                                        "150px",
                                        editor.editing.view.document.getRoot()
                                        );
                                    });
                                }}
                                onChange={(event, editor)=>setDataProduct({...dataProduct, [value.nameInput]:editor.getData()})}
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
                                
                                placeholder={value.labelInput}
                                name={value.nameInput}
                                size="medium"
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"/>,
                                  }}
                                onFocus={() => setFocus({ ...focus, "focus": value.nameInput })}
                                value={
                                    onFocus[value.nameInput]
                                }
                                onChange={(e)=>setDataProduct({...dataProduct, [value.nameInput]:e.target.value})}
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