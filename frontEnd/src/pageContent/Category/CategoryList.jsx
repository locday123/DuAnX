import { Box, IconButton, Switch, Tooltip } from "@mui/material"
import { Table } from "antd"
import { deleteCategory, updateCategory } from "../../Service/Category/CategoryService"
import { useContext, useEffect, useState } from "react"
import Context from "../../Context"
import { Delete, Edit } from "@mui/icons-material"
import ModalSystem from "../../components/ModalSystem"
import UpdateCategory from "./UpdateCategory"
import Column from "antd/es/table/Column"
function CategoryList({ value }) {
    const { setAlert, setMessage, setChange } = useContext(Context)
    const [open, setOpen] = useState(false)
    const [infoCategory, setInfo] = useState([])

    const showModal = (record) => {
        setInfo(record)
        setOpen(true);
        console.log(infoCategory);
        
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const columnCategory = [

        { title: "Tên danh mục", dataIndex: "nameCategory", key: "nameCategory"},        
        { title: "Đường dẫn", dataIndex: "linkCategory", key: "linkCategory", align: "left" },
        {
            title: "Trạng thái", dataIndex: "statusCategory", key: "statusCategory", align: "center",
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
            title: "Hành động", dataIndex: "actionCategory", key: "actionCategory", width: '15%', align: "center",
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
                        <IconButton color='primary' onClick={() =>{ showModal(record)}}>
                            <Edit color='white' />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ]

    return (
        <>
            <Table
                columns={columnCategory}
                dataSource={value}
                rowKey="idCategory"
                key="idCategory"
                childrenColumnName="childCategory"
            />
            <ModalSystem open={open} title="CẬP NHẬT" onCancel={handleCancel}>
                <UpdateCategory category={value} info={infoCategory} />
            </ModalSystem >
        </>
    )
}

export default CategoryList