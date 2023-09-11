import { useEffect, useState } from "react";
import { TreeSelect, Tree, Table } from 'antd';
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { getCategory } from '../../Service/Category/CategoryService'
import CategoryList from './CategoryList'
function Category() {
  const { SHOW_PARENT } = TreeSelect;
  const [category, setCategory] = useState([])
  const [dataCategory, setData] = useState({ rootCategory: [1] });
  const inputValue = [
    { nameInput: 'nameCategory', placehoder: 'Tên danh mục', labelInput: 'Tên danh mục', typeInput: 'text', width: 4 },
    { nameInput: 'linkCategory', placehoder: 'Đường dẫn danh mục', labelInput: 'Đường dẫn danh mục', typeInput: 'text', width: 4},
    { nameInput: 'metaTitle', placehoder: 'Meta Title', labelInput: 'Mô tả ngắn (55-60 ký tự)', typeInput: 'text', width: 4, size: "large" },
    { nameInput: 'metaDescription', placehoder: 'Meta Description', labelInput: 'Mô tả ngắn (55-60 ký tự)', typeInput: 'text', width: 8, size: "large" }
  ]
  useEffect(() => {
    getCategory().then((value) => {
      setCategory(value.category)
    });
  }, [])
  const onChange = (newValue) => {
    setData({ ...dataCategory, rootCategory: newValue });

  };
  console.log(dataCategory);
  return (
    <Grid container rowSpacing={5} sx={{ backgroundColor: "white", borderRadius: "10px", padding: "0px 15px 0px 15px" }}>
      <Grid container rowSpacing={3} xs={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ borderBottom: "1px solid red" }}>
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
                label={value.labelInput}
                placeholder={value.placehoder}
                name={value.nameInput}
                type={value.typeInput}
                fullWidth
                onChange={(e)=>{setData({...dataCategory, [value.nameInput]: e.target.value})}}
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
          >
            TẠO DANH MỤC
          </Button> {/* Cập nhật */}
        </Grid>
      </Grid>
      <Grid xs={12}>
        <CategoryList value={category}/>
      </Grid>
    </Grid>
  )
}

export default Category;