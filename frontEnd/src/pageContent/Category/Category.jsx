import { useEffect, useState } from "react";
import { TreeSelect } from 'antd';

import { getCategory } from '../../Service/Category/CategoryService'
function Category() {
  const { SHOW_PARENT } = TreeSelect;
  const [category, setCategory] = useState([])
  const [value, setValue] = useState([]);

  useEffect(() => {
    getCategory().then((value) => {
      setCategory(value.category)
    });
  }, [])
  const onChange = (newValue) => {
    console.log('onChange', value);
    setValue(newValue);
  };


  return (
    <div>
      <TreeSelect
        fieldNames={{
          children: 'childCategory',
          label: 'nameCategory',
          value: 'idCategory',
          link: 'linkCategory'
        }}
        showSearch
        style={{ width: '20%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        multiple

        onChange={onChange}
        treeData={category}

      />
    </div>
  )
}

export default Category;