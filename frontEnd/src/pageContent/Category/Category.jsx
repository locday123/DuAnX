import { useEffect, useState, useContext } from "react";
import { TreeSelect, Tree, Table } from 'antd';
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { getCategory } from '../../Service/Category/CategoryService'
import CategoryList from './CategoryList'
import { addCategory } from "../../Service/Category/CategoryService";
import Context from "../../Context";

function Category() {
  const { SHOW_PARENT } = TreeSelect;
  const { setAlert, setMessage, dataChange, setChange } = useContext(Context)
  const [category, setCategory] = useState([])
  const [dataCategory, setData] = useState({ rootCategory: [1] });
  const [lengthMetaT, setLmetat] = useState(0)
  const [lengthMetaD, setLmetad] = useState(0)

  useEffect(() => {
    getCategory().then((value) => {
      setCategory(value.category)
    });
  }, [dataChange == true])

  const inputValue = [
    { nameInput: 'nameCategory', placehoder: 'Tên danh mục', labelInput: 'Tên danh mục', typeInput: 'text', width: 4 },
    { nameInput: 'linkCategory', placehoder: 'Đường dẫn danh mục', labelInput: 'Đường dẫn danh mục', typeInput: 'text', width: 4 },
    { nameInput: 'metaTitle', placehoder: 'Meta Title', labelInput: 'Meta Title (' + lengthMetaT + '/70) ký tự', typeInput: 'text', width: 4, size: "large" },
    { nameInput: 'metaDescription', placehoder: 'Meta Description', labelInput: 'Meta Description (' + lengthMetaD + '/155) ký tự', typeInput: 'text', width: 8, size: "large" }
  ]
  function slugify(str) {
    return String(str)
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
  }

  const checkForm = (data) => {
    if (data.nameCategory && data.linkCategory) {
      return true
    } else { return false }
  }


  const onChange = (newValue) => {
    setData({ ...dataCategory, rootCategory: newValue });

  };
  console.log(dataCategory);
  return (
    <Grid container rowSpacing={5} sx={{ backgroundColor: "white", borderRadius: "10px", padding: "0px 15px 0px 15px" }}>
      <Grid container rowSpacing={3} xs={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={4}>
          <TreeSelect
            fieldNames={{
              children: 'childCategory',
              label: 'nameCategory',
              value: 'idCategory',
            }}
            showSearch
            style={{ width: '100%' }}
            value={dataCategory.rootCategory}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Chọn danh mục"
            allowClear
            onChange={onChange}
            treeData={category}
            size="large"
          />
        </Grid>
        {
          inputValue.map((value, key) => (
            <Grid key={key} xs={value.width}>
              <TextField
                required
                label={value.labelInput}
                placeholder={value.placehoder}
                value={value.nameInput == "linkCategory" ? slugify(dataCategory.nameCategory) : undefined}
                name={value.nameInput}
                type={value.typeInput}
                inputProps={
                  value.nameInput == "metaTitle" ? { "maxLength": "70" } : value.nameInput == "metaDescription" ? { "maxLength": "155" } : undefined
                }
                fullWidth
                onChange={(e) => {
                  setData({ ...dataCategory, [value.nameInput]: e.target.value })
                  if (value.nameInput == "metaTitle") {
                    setLmetat(e.target.value.length)
                  }
                  if (value.nameInput == "metaDescription") {
                    setLmetad(e.target.value.length)
                  }
                }}
                size={value.size ? value.size : "small"}
              />
            </Grid>
          ))
        }
        <Grid xs={4}>
          <Button
            variant="contained"
            component="label"
            fullWidth
            onClick={
              () => {
                checkForm(dataCategory) ?
                  addCategory(dataCategory).then((value) => {
                    setChange(true)
                    setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                    setMessage(value.message)

                  }) :
                  setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                setMessage("Có lỗi xảy ra. Vui lòng kiểm tra lại")
              }
            }
          >
            TẠO DANH MỤC
          </Button> {/* Cập nhật */}
        </Grid>
      </Grid>
      <Grid xs={12}>
        <CategoryList value={category} />
      </Grid>
    </Grid >
  )
}

export default Category;