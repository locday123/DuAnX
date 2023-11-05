import { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { getCategory } from '../../Service/Category/CategoryService'
import CategoryList from './CategoryList'
import Context from "../../Context";
import AddUpdateCategory from "./AddUpdateCategory";

function Category() {
  const { dataChange } = useContext(Context)
  const [category, setCategory] = useState([])

  useEffect(() => {
    getCategory().then((value) => {
      setCategory(value.category)
    });
  }, [dataChange == true])

  return (
    <Grid container rowSpacing={5} sx={{ backgroundColor: "white", borderRadius: "10px", padding: "15px" }}>
      <AddUpdateCategory action={"addCategory"} category={category} info={null} />
      <Grid xs={12}>
        <CategoryList value={category} />
      </Grid>
    </Grid >
  )
}

export default Category;