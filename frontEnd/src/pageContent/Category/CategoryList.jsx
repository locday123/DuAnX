import { Box } from "@mui/material"

function CategoryList({ value }) {

    return (
        <Box sx={{ display: "flex" }}>
            <Box>{value.nameCategory}</Box>
            <Box>{value.idCategory}</Box>
            <Box>{value.linkCategory}</Box>
        </Box>
    )
}

export default CategoryList