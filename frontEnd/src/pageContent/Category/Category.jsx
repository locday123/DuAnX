import { useEffect, useState } from "react";
import { TreeSelect } from 'antd';

import { getCategory } from '../../Service/Category/CategoryService'
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
function Category() {
  const { SHOW_PARENT } = TreeSelect;
  const [category, setCategory] = useState([])
  const [value, setValue] = useState({category:[1]});
  const inputValue = [
    { nameInput: 'nameCategory', placehoder: 'Tên danh mục', labelInput: 'Tên danh mục', typeInput: 'text', width: 3 },
    { nameInput: 'linkCategory', placehoder: 'Đường dẫn danh mục', labelInput: 'Đường dẫn danh mục', typeInput: 'text', width: 3 }
  ]
  useEffect(() => {
    getCategory().then((value) => {
      setCategory(value.category)
    });
  }, [])
  const onChange = (newValue) => {
    setValue({...value, category: newValue});
    
  };

  return (
    <Grid container rowSpacing={5} sx={{backgroundColor:"white", borderRadius:"10px", padding:"0px 15px 0px 15px  "}}>
      <Grid container rowSpacing={3} xs={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={4}>
          <TreeSelect
            fieldNames={{
              children: 'childCategory',
              label: 'nameCategory',
              value: 'idCategory',
              link: 'linkCategory'
            }}
            showSearch
            style={{ width: '100%'}}
            value={value.category}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Chọn danh mục"
            allowClear
            onChange={onChange}
            treeData={category}
            size="large"
          />
        </Grid>
        {
        inputValue.map((value, key)=>(
          <Grid key={key} xs={value.width}>
            <TextField
                label={value.labelInput}
                placeholder={value.placehoder}
                name={value.nameInput}
                type={value.typeInput}
                fullWidth
                size="small"
            />
          </Grid>
        ))
        }
        <Grid xs={2}>
            <Button
                variant="contained"
                component="label"
                fullWidth
            >
                TẠO TÀI KHOẢN
            </Button> {/* Cập nhật */}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Category;