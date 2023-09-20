import { Box, IconButton, Switch, Tooltip } from "@mui/material"
import { Table } from "antd"
import { deleteCategory, updateCategory } from "../../Service/Category/CategoryService"
import { useContext, useEffect, useState } from "react"
import Context from "../../Context"
import { Delete, Edit } from "@mui/icons-material"
import { Link } from "react-router-dom"
function CategoryList({ value }) {
    const { setAlert, setMessage, setChange } = useContext(Context)
    const [data, setData] = useState([value])
    const columnCategory = [
        { title: "Tên danh mục", dataIndex: "nameCategory", key: "nameCategory", width: '15%' },
        { title: "ID", dataIndex: "idCategory", key: "idCategory", width: '4%', align: "center" },
        {
            title: "Meta Title - Description", dataIndex: "tagMeta", key: "tagMeta",
            render: (text, record, index) => (
                <>
                    <Box sx={{ color: "#681da8", fontSize: "15px" }}>{record.metaTitle}</Box>
                    <Box sx={{ color: "#4d5156", fontSize: "14px" }}>{record.metaDescription}</Box>
                </>
            )
        },
        { title: "Đường dẫn", dataIndex: "linkCategory", key: "linkCategory", width: '7%', align: "center" },
        {
            title: "Trạng thái", dataIndex: "statusCategory", key: "statusCategory", width: '7%', align: "center",
            render: (text, record, index) => (
                <Switch
                    defaultChecked={record.statusCategory}
                    onClick={(e) => {
                        updateCategory(record.idCategory, { statusCategory: e.target.checked }).then((value) => {
                            setChange(true)
                            setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                            setMessage(value.message)
                        })
                    }}
                />
            )
        },
        {
            title: "Hành động", dataIndex: "actionCategory", key: "actionCategory", width: '10%', align: "center",
            render: (text, record, index) => (

                <Box>
                    <Tooltip title={'Xóa danh mục [ ' + record.nameCategory + ' ]'}>
                        <IconButton color='primary' onClick={() => {
                            deleteCategory(record.idCategory).then((value) => {
                                setChange(true)
                                setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true })
                                setMessage(value.message)
                            })
                        }}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Cập nhật danh mục [ ' + record.nameCategory + ' ]'}>
                        <Link to={"/category/" + record.idCategory}>
                            <IconButton color='primary'>
                                <Edit color='white' />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Box>
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