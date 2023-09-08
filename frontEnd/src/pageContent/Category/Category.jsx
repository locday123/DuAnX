import { useEffect, useState } from "react";
import { getCategory } from '../../Service/Category/CategoryService'
import TreeSelect from 'mui-tree-select'
function Category() {
  const [category, setCategory] = useState([])

  useEffect(() => {
    getCategory().then((value) => {
      setCategory(value.category.at(0))
    });
  }, [])
  console.log(category);
  return (
    <div>
      abc
    </div>
  )
}

export default Category;