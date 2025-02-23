
import { Button, InputAdornment, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { TreeSelect } from "antd";
import React, { useContext, useState } from "react";
import { slugify } from "../../Hook/Hook";
import { addCategory, updateCategory } from "../../Service/Category/CategoryService";
import Context from "../../Context";

function AddUpdateCategory({category, info, action }) {
    const {setAlert, setMessage, setChange} = useContext(Context)
    const [onFocus, setFocus] = useState([])
    const [dataCategory, setData] = useState([]);
    const [meta, setMeta] = useState({ title:0, description:0})
    const inputValue = [
        { nameInput: 'nameCategory', placehoder: 'Tên danh mục', labelInput: 'Tên danh mục', typeInput: 'text', width: 4},
        { nameInput: 'linkCategory', placehoder: 'Đường dẫn danh mục', labelInput: 'Đường dẫn danh mục', typeInput: 'text', width: 4},
        { nameInput: 'metaTitle', placehoder: 'Meta Title', labelInput: 'Meta Title '+meta.title+'/70 ký tự', typeInput: 'text', width: 4, size: "large"},
        { nameInput: 'metaDescription', placehoder: 'Meta Description', labelInput: 'Meta Description '+meta.description+'/300 ký tự', typeInput: 'text', width: 8, size: "large"}
    ]
    console.log(dataCategory);
    const actionCategory = (event) => {
        event.preventDefault();
        if (action == "editCategory" && dataCategory!="" && dataCategory.rootCategory != info.idCategory) {
            updateCategory(info.idCategory, dataCategory).then((value) => {
                setChange(true)
                setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                setMessage(value.message)
            })
        }
        else {
            setChange(true)
            setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
            setMessage("Danh mục cha không đúng, hoặc không có dữ liệu để cập nhật")
        }
        if (action == "addCategory") {
            addCategory(dataCategory).then((value) => {
                setChange(true)
                setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                setMessage(value.message)

              })
        }
        
    }

    const onChange = (newValue) => {
        setData({ ...dataCategory, rootCategory: newValue == undefined ? null : newValue });

    };
    return (
        <form onSubmit={actionCategory}>
            <Grid container width={'100%'} rowSpacing={3} xs={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={4}>
                   <TreeSelect
                        fieldNames={{
                            children: 'childCategory',
                            label: 'nameCategory',
                            value: 'idCategory',
                        }}
                        showSearch
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Chọn danh mục"
                        onChange={onChange}
                        treeData={category}
                        aria-required={"A"}
                        defaultValue={action=="editCategory"?info.rootCategory:null}
                        size="large"
                    />
                </Grid>
                {
                inputValue.map((value, key) => (
                <Grid key={key} xs={value.width}>
                    <TextField
                        label={value.labelInput}
                        defaultValue={action=="editCategory"?info[value.nameInput]:null}
                        placeholder={value.placehoder}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                        }}
                        required={
                            value.nameInput == "metaTitle" ? false
                            : value.nameInput == "metaDescription" ? false
                            : true
                        }
                        type={value.typeInput}
                        size={value.size ? value.size : "small"}
                        value={
                            value.nameInput == "linkCategory" ? onFocus.slug
                            : undefined
                        }
                        name={value.nameInput}
                        inputProps={
                            value.nameInput == "metaTitle" ? { "maxLength": "70" }
                            : value.nameInput == "metaDescription" ? { "maxLength": "300" }
                            : undefined
                        }
                        onFocus={() => setFocus({ ...focus, "focus": value.nameInput })}
                        onChange={(e) => {
                            if (e.target.value !=null) {
                                setData({ ...dataCategory, [value.nameInput]: e.target.value })
                            }
                            if (value.nameInput == "metaTitle") {
                                setMeta({ ...meta, "title": e.target.value.length })
                            }
                            if (value.nameInput == "metaDescription") {
                                setMeta({ ...meta, "description": e.target.value.length })
                            }
                            if (value.nameInput == "nameCategory") {
                                setFocus({ ...focus, "slug": slugify(e.target.value) })
                                setData({ ...dataCategory, [value.nameInput]: e.target.value, linkCategory: slugify(e.target.value) })
                            }
                        }}
                    />
                </Grid>
                ))
                }
                <Grid xs={4}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        {action=="addCategory"?"TẠO DANH MỤC":"CẬP NHẬT"}
                    </Button> {/* Cập nhật */}
                </Grid>
            </Grid>
        </form>
    )
}

export default AddUpdateCategory