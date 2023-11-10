import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { Box, Button, FormControlLabel, InputAdornment, List, ListItem, MenuItem, Switch, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { addProduct, getProduct } from "../../Service/Product/ProductService";
import { NumericFormatCustom, TreeCategory, slugify } from "../../Hook/Hook";
import { Tree } from "antd";
import {Product_INFO, Product_SEO, Product_REVIEW, Product_CHECKVALIDATION} from './ProductTextField';
import ModalSystem from "../../components/ModalSystem";
import AddUpdateCategory from "../Category/AddUpdateCategory";
import Context from "../../Context";

function AddProduct() {
    const { dataChange, setAlert, setMessage, setChange } = useContext(Context)
    const [dataProduct, setDataProduct] = useState([])
    const [data, setData] = useState([])
    const [onFocus, setFocus] = useState([])
    const [open, setOpen] = useState(false)
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const actionProduct = () => {
        addProduct(dataProduct).then((value) => {
            setChange(true)
            setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
            setMessage(value.message)
        })
    }
    useEffect(() => {
        getProduct().then((value) => {
            setData({ ...data, 
                listCategory: TreeCategory(value[0], null),
                listStorage: value[2]
            })
        });
    }, [dataChange])
    return (
    <> 
        <Box sx={{ display: "flex" }} component={"form"} noValidate>
            <Box sx={{ width: "35%" }}>
                <Box sx={{ backgroundColor: "white", borderRadius: "10px", marginRight: "10px" }}>
                    <List>
                    {Product_SEO.map((value, index) => (
                        <ListItem key={index}>
                            <TextField
                                label={value.labelInput}
                                required={value.nameInput=="urlProduct"?true:false}
                                placeholder={value.labelInput}
                                name={value.nameInput}
                                size="medium"
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }}
                                onFocus={() => setFocus({ ...focus, "focus": value.nameInput })}
                                value={onFocus[value.nameInput]}
                                onChange={(e) => setDataProduct({ ...dataProduct, [value.nameInput]: e.target.value })} />
                        </ListItem>
                    ))}
                        <ListItem>
                            <Box>
                                <FormControlLabel
                                    value="start"
                                    control={<Switch color="primary" />}
                                    label="Ẩn / Hiện Sản phẩm"
                                    labelPlacement="start" />
                            </Box>
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Box sx={{ width: "65%" }}>
                <Box sx={{ backgroundColor: "white", borderRadius: "10px", width: "100%" }}>
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
                                            hidden />
                                        {"THÊM HÌNH ẢNH SẢN PHẨM"}
                                    </Button> {/* Thêm hình ảnh */}
                                </Box>
                            </Box>
                        </ListItem>
                        <ListItem sx={{ display: "flex" }}>
                            <Button onClick={() => { showModal() }} variant="contained" size="large" sx={{ width: "45%", marginRight: "10px" }}>
                                THÊM DANH MỤC
                            </Button>
                            
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
                                onSelect={(idCategory, category) => { setDataProduct({ ...dataProduct, ["idCategory"]: category.node.idCategory }); } } 
                            />
                        </ListItem>
                        {Product_INFO.map((value, index) => (
                            <ListItem key={index}>
                                <TextField
                                    required={value.nameInput == "nameProduct" ? true : value.nameInput == "idStorage" ? true : false}
                                    label={value.labelInput}
                                    placeholder={value.placehoder}
                                    name={value.nameInput}
                                    size="medium"
                                    select={value.typeInput == "select" ? true : false}
                                    fullWidth
                                    InputProps={
                                        {
                                            inputComponent: value.typeInput == "number" ? NumericFormatCustom : null,
                                            startAdornment: <InputAdornment position="start" />
                                        }
                                    }
                                    onFocus={() => setFocus({ ...focus, "focus": value.nameInput })}
                                    onChange={(e) => {
                                        setDataProduct({ ...dataProduct, [value.nameInput]: e.target.value });
                                        if (value.nameInput == "nameProduct") {
                                            setFocus({
                                                ...focus,
                                                ["urlProduct"]: slugify(e.target.value),
                                                ["metaTitle"]: e.target.value,
                                                ["metaDescription"]: e.target.value
                                            });
                                            setDataProduct({
                                                ...dataProduct,
                                                [value.nameInput]: e.target.value,
                                                ["urlProduct"]: slugify(e.target.value),
                                                ["metaTitle"]: e.target.value,
                                                ["metaDescription"]: e.target.value
                                            });
                                        }
                                    }}
                                >
                                    {data.listStorage?.map((content) => (
                                        <MenuItem key={content.idStorage} value={content.idStorage}>
                                            {content.nameSpace}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </ListItem>
                                
                        ))}
                        {Product_REVIEW.map((value, index) => (
                            <ListItem key={index}>
                                <div style={{ width: "100%" }}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{ placeholder: value.placehoder }}
                                        onReady={(editor) => {
                                            editor.editing.view.change((writer) => {
                                                writer.setStyle(
                                                    //use max-height(for scroll) or min-height(static)
                                                    "height",
                                                    "150px",
                                                    editor.editing.view.document.getRoot()
                                                );
                                            });
                                        } }
                                        onChange={(event, editor) => setDataProduct({ ...dataProduct, [value.nameInput]: editor.getData() })} />
                                </div>
                            </ListItem>
                        ))}
                        <ListItem>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => Product_CHECKVALIDATION(dataProduct) == false? null
                                    : actionProduct()
                                }
                            >
                                TẠO SẢN PHẨM
                            </Button> {/* Cập nhật */}
                        </ListItem>
                    </List>
                </Box>
            </Box>
            
        </Box>
        <ModalSystem open={open} onCancel={handleCancel}>
            <AddUpdateCategory action={"addCategory"} info={null} category={data.listCategory} />
        </ModalSystem>
    </>
    )
}

export default AddProduct