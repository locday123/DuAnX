import { Button } from "@mui/material"
import { Table } from "antd"
import { deleteCategory } from "../../Service/Category/CategoryService"
import { useContext, useEffect, useState } from "react"
import Context from "../../Context"
function CategoryList({ value }) {
    const { setAlert, setMessage, setChange } = useContext(Context)
    const [data, setData] = useState([value])

    const columnCategory = [
        { title: "Tên danh mục", dataIndex: "nameCategory", key: "nameCategory" },
        { title: "ID Danh mục", dataIndex: "idCategory", key: "idCategory" },
        { title: "Đường dẫn", dataIndex: "linkCategory", key: "linkCategory" },
        {
            title: "Hành động",
            dataIndex: "actionCategory",
            key: "actionCategory",

            render: (text, record, index) =>(
                <>{record.rootCategory!=0?
                    <Button
                        variant="contained"
                        onClick={() => {
                            deleteCategory(record.linkCategory).then((value) => {
                                setChange(true)
                                setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                                setMessage(value.message)
                            })
                        }}
                    >
                        Xóa
                    </Button>
                :undefined}</>
            )
        }
    ]

    useEffect(() => {
        setData(value)
    }, [value])
    return (
        <Table
            columns={columnCategory}
            dataSource={data}
            rowKey="idCategory"
            key="idCategory"
            childrenColumnName="childCategory"
            size="large"
            bordered
        />
    )
}

export default CategoryList