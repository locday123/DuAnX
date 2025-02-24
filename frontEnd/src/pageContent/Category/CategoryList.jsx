import { Box, IconButton, Switch, Tooltip } from "@mui/material"
import { Table, notification } from "antd"
import { deleteCategory, updateCategory } from "../../Service/Category/CategoryService"
import { useContext, useState } from "react"
import Context from "../../Context"
import { Delete, Edit } from "@mui/icons-material"
import ModalSystem from "../../components/ModalSystem"
import AddUpdateCategory from "./AddUpdateCategory"
function CategoryList({ value }) {
    const { setChange } = useContext(Context)
    const [open, setOpen] = useState(false)
    const [infoCategory, setInfo] = useState([])
    const [api, contextHolder] = notification.useNotification()
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: 'Thông báo hệ thống',
            description: message,
            placement: "bottomRight",
            showProgress: true,
            pauseOnHover:false
        });
    };

    const showModal = (record) => {
        setInfo(record)
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const columnCategory = [
        
        {
            title: "Tên danh mục", dataIndex: "nameCategory", key: "nameCategory",
            sorter: (a, b) => a.nameCategory.length - b.nameCategory.length,
            sortDirections: ['descend'],
        },        
        { title: "Đường dẫn", dataIndex: "linkCategory", key: "linkCategory", align: "left" },
        {
            title: "Ẩn / Hiện", dataIndex: "statusCategory", key: "statusCategory", align: "center",
            render: (text, record, index) => (
                <Switch
                    defaultChecked={record.statusCategory}
                    onClick={(e) => {
                        updateCategory(record.idCategory, { statusCategory: e.target.checked }).then((value) => {
                            openNotificationWithIcon('success', e.target.checked?"Danh mục hiện":"Danh mục ẩn")
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
                            deleteCategory(record.linkCategory).then((value) => {
                                setChange(true)
                                openNotificationWithIcon('success', "Xóa danh mục [ "+record.nameCategory+" ] hoàn thành")
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
            {contextHolder}
            <Table
                columns={columnCategory}
                dataSource={value[0]?value[0].childCategory:[]}
                rowKey="idCategory"
                key="idCategory"
                childrenColumnName="childCategory"  
            />
            <ModalSystem open={open} onCancel={handleCancel} width={1000}>
                <AddUpdateCategory action={"editCategory"} info={infoCategory} category={value}/>
            </ModalSystem >
        </>
    )
}

export default CategoryList