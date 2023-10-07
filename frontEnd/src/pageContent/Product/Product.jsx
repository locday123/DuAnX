import { Box, IconButton, Switch, TextField, Tooltip } from "@mui/material"
import { getProduct } from "../../Service/Product/ProductService"
import { useEffect, useState } from "react"
import { Input, Table, TreeSelect } from "antd";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {TreeCategory, getParent,getCategoryByProduct} from "../../Hook/Hook"

function Product() {
    const [data, setData] = useState([])
    const [test, setTest] = useState([])
    const [dataSearch, setSearch] = useState({ nameSearch: "" })

    const columns = [
        {dataIndex:"status", key: 'status', title: 'Ẩn | Hiện', width: 20, align: "center", headerAlign: 'center',
            render: (value) => { 
                return (
                    <Switch />
                    
                )
            }
        },
        {
            dataIndex: "nameProduct", key: 'nameProduct', title: 'Tên sản phẩm', width: 250, height: 200,
            filteredValue: [dataSearch.nameSearch],
            onFilter: (value, record) => {
                return String(record.nameProduct.nameProduct).toLowerCase().includes(value.toLowerCase())
            },
            render: (value) => {
                return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: "bold", fontSize: "15px" }}>{value.nameProduct}</span>
                        <span style={{ fontSize: "12px", color: "#5c5c66" }}>ID: {value.idProduct}</span>
                        <span style={{ fontSize: "12px", color: "#5c5c66" }}>Link: {value.linkProduct}</span>
                        <span>{getCategoryByProduct(getParent(test, value.idCategory))}</span>
                    </Box>
                )
            }
        },
        {dataIndex:"price", key: 'price', title: 'Giá', width: 70, type:"number", align: "center", headerAlign: 'center',
            render: (value) => {
                return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px", textAlign: "center" }}>{new Intl.NumberFormat().format(value.priceProduct)}</span>
                        <TextField
                            label="Giá thị trường"
                            InputLabelProps={{ style: {fontSize: "13px", color: "#5c5c66" } }}
                            name="priceThrough"
                            defaultValue={new Intl.NumberFormat().format(value.priceThrough)}
                            size="small"
                            inputProps={{ style: { textAlign: "center", height: "15px", fontSize: "14px" } }}
                        />
                    </Box>
                )
            }
        },
        {dataIndex:"update", key: 'update', title: 'Hình ảnh | Cấu hình ',width:120, align: "center", headerAlign: 'center',
            render: () => { 
                return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <span> Hình phụ | màu sắc</span>
                        <span>Cập nhật cấu hình</span>
                    </Box>
                )
            }
        },
        {dataIndex:"action", key: 'action', title: 'Hành động', width: 30,
            render: (value) => { 
                return (
                    <Box sx={{ display: "flex", flexDirection: "rows" }}>
                        <Tooltip title={'Xem chi tiết sản phẩm [ ' + value.idProduct + ' ]'}>
                            <IconButton color='primary'>
                                <Preview />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Cập nhật tài khoản [ ' + value.idProduct + ' ]'}>
                            <Link to={"/account/edit/" + value.idProduct}>
                                <IconButton color='primary'>
                                    <Edit color='white' />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title={'Xóa ID [ ' + value.idProduct + ' ]'}>
                            <IconButton color='primary'>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        },
    ]
    const rows = data.listProduct?.map((row) => ({
        key:row.idProduct,
        nameProduct: row,
        price: row,
        action:row
    }))
    useEffect(() => {
        getProduct().then((value) => {
            setData({ ...data, listProduct: value[1], listCategory: TreeCategory(value[0], null) })
            setTest(value[0])
        });
    }, [])
    return (
        <Box sx={{ padding: "10px", backgroundColor: "white", borderRadius: "10px" }}>
            <Box>
            <TreeSelect
                fieldNames={{
                children: 'childCategory',
                label: 'nameCategory',
                value: 'idCategory',
                }}
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Chọn danh mục"
                allowClear
                loading={data.listCategory?false:true}
                treeData={data.listCategory}
                size="large"
                />
                <Input.Search
                    placeholder="Tên sản phẩm"
                    size="large"
                    onSearch={(value) => {
                        setSearch({...dataSearch, "nameSearch":value})
                    }}
                />
            </Box>
            <Box>
                <Table
                    columns={columns}
                    dataSource={rows}
                    loading={data.listProduct?false:true}
                />
            </Box>    
        </Box>
    )
}

export default Product
