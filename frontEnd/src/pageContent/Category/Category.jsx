import { useEffect, useState } from "react";
import { getCategory } from '../../Service/Category/CategoryService'

import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MenuItem, TextField } from "@mui/material";
function Category() {
  const [category, setCategory] = useState([])

  const renderTree = (nodes) => (
    <ul style={{ display: "flex" }}>
      <MenuItem key={nodes.idCategory} >
        {nodes.nameCategory}
        {Array.isArray(nodes.childCategory)
          ? nodes.childCategory.map((node) => renderTree(node))
          : null}
      </MenuItem>
    </ul>

  );

  useEffect(() => {
    getCategory().then((value) => {
      setCategory(value.category[0])
    });
  }, [])
  return (



    renderTree(category)
  )
}

export default Category;