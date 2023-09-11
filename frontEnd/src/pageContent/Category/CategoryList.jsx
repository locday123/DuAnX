import { Button } from "@mui/material"
import { Table } from "antd"

function CategoryList({ value }) {
    const columnCategory = [
        {title: "Tên danh mục", dataIndex: "nameCategory", key: "nameCategory"},
        {title: "ID Danh mục", dataIndex: "idCategory", key: "idCategory"},
        {title: "Đường dẫn", dataIndex: "linkCategory", key: "linkCategory"},
        {
            title: "Hành động", 
            dataIndex: "actionCategory", 
            key: "actionCategory",
            render: ()=>(<Button variant="contained">Xóa</Button>)

        }
        
    ]
    return (
        <Table
            columns={columnCategory}
            dataSource={value}
            childrenColumnName="childCategory"
            size="large"
            bordered
        />
    )
}

export default CategoryList