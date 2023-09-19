import { IconButton, Switch, Tooltip } from "@mui/material"
import { Table } from "antd"
import { deleteCategory, updateCategory } from "../../Service/Category/CategoryService"
import { useContext, useEffect, useState } from "react"
import Context from "../../Context"
import { Delete } from "@mui/icons-material"
function CategoryList({ value }) {
    const { setAlert, setMessage, setChange } = useContext(Context)
    const [data, setData] = useState([value])
    const [swichData, setSwitch] = useState()
    const columnCategory = [
        { title: "Tên danh mục", dataIndex: "nameCategory", key: "nameCategory" },
        { title: "ID Danh mục", dataIndex: "idCategory", key: "idCategory" },
        { title: "Đường dẫn", dataIndex: "linkCategory", key: "linkCategory" },
        {
            title: "Trạng thái", dataIndex: "statusCategory", key: "statusCategory",
            render: (text, record, index) => (
                <Switch
                    defaultChecked={record.statusCategory}
                    onChange={(e) => {
                        setSwitch({...swichData, statusCategory:e.target.checked})
                        swichData&&
                        updateCategory(record.idCategory, swichData).then((value) => {
                            setChange(true)
                            setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                            setMessage(value.message)
                        })
                    }}
                />
            )
        },
        {
            title: "Hành động", dataIndex: "actionCategory", key: "actionCategory",
            render: (text, record, index) => (

                <Tooltip title={'Xóa danh mục [ ' + record.nameCategory + ' ]'}>
                    <IconButton color='primary' onClick={() => {
                        deleteCategory(record.idCategory).then((value) => {
                            setChange(true)
                            setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                            setMessage(value.message)
                        })
                    }}>
                        <Delete />
                    </IconButton>
                </Tooltip>
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