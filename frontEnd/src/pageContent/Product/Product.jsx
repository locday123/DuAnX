import { Box, Button, IconButton, Switch, TextField, Tooltip } from "@mui/material"
import { deleteProduct, getProduct, updateProduct } from "../../Service/Product/ProductService"
import { useContext, useEffect, useState } from "react"
import { Input, Table, TreeSelect } from "antd";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {TreeCategory, ProductCategory, NumericFormatCustom} from "../../Hook/Hook"
import moment from "moment";
import Context from "../../Context";

function Product() {
    const { dataChange, setAlert, setMessage, setChange } = useContext(Context)
    const [data, setData] = useState([])
    const [dataSearch, setSearch] = useState({ nameSearch: "", cateSearch: ["all"] })
    const columns = [
        {dataIndex:"status", key: 'status', title: 'Ẩn | Hiện', width: 100, align: "center", headerAlign: 'center',
            filteredValue: [dataSearch.cateSearch],
            onFilter: (value, record) => {
                return record.status.listCategory.find((id)=>id==value)
            },
            render: (value) => { 
                return (
                    <Switch
                        defaultChecked={value.statusProduct}
                        onClick={(e) => {
                            updateProduct(value.idProduct, { statusProduct: e.target.checked }).then((value) => {
                                setChange(true)
                                setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                                setMessage(value.message)
                            })
                        }}
                    />

                )
            }
        },
        {dataIndex: "imageProduct", key: 'imageProduct', title: 'Hình ảnh', align: "center", headerAlign: 'center',
            render: (value) => (
                <img width="100px" src="https://www.vienquangmobile.com/vnt_upload/product/iphone/iphone-15-series/iphone-15/thumbs/iphone-15-pink.png" />
            )
        },
        {dataIndex: "nameProduct", key: 'nameProduct', title: 'Tên sản phẩm',
            filteredValue: [dataSearch.nameSearch],
            onFilter: (value, record) => {
                return String(record.nameProduct.nameProduct).toLowerCase().includes(value.toLowerCase())
            },
            render: (value) => {
                
                return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: "bold", fontSize: "15px" }}>{value.nameProduct}</span>
                        <span style={{ fontSize: "12px",    color: "#5c5c66" }}>ID: {value.idProduct}</span>
                        <span style={{ fontSize: "12px", color: "#5c5c66" }}>Link: {value.urlProduct}</span>
                        <span style={{ fontSize: "12px", color: "#5c5c66" }}>Ngày thêm: {moment(value.dateAdd).format('DD/MM/YYYY')}</span>
                    </Box>
                )   
            }
        },
        {dataIndex:"price", key: 'price', title: 'Giá', width: 150, type:"number", align: "center", headerAlign: 'center',
            render: (value) => {
                return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "20px", textAlign: "center" }}>{new Intl.NumberFormat().format(value.priceProduct)}</span>
                        <TextField
                            label="Giá thị trường"
                            InputLabelProps={{
                                shrink:true
                            }}
                            name="priceThrough"
                            defaultValue={value.priceThrough}
                            size="medium"
                            inputProps={{ style: { textAlign: "center", height: "15px", fontSize: "17px", marginTop:"5px" } }}
                            InputProps={{inputComponent: NumericFormatCustom}}
                        />
                    </Box>
                )
            }
        },
        {dataIndex:"update", key: 'update', title: 'Hình ảnh | Cấu hình ',align: "center", headerAlign: 'center',
            render: () => { 
                return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <span> Hình phụ | màu sắc</span>
                        <span>Cập nhật cấu hình</span>
                    </Box>
                )
            }
        },
        {dataIndex:"action", key: 'action', title: 'Hành động', align:"center",
            render: (value) => { 
                return (
                    <Box sx={{ display: "flex", flexDirection: "rows", justifyContent:"flex-end"}}>
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
                            <IconButton color='primary' onClick={() =>
                                deleteProduct(value.idProduct).then((value) => {
                                    setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                                    setMessage(value.message)
                                    setChange(true)
                                })}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        },
    ]
    const rows = data.listProduct?.map((row) => ({
        key: row.idProduct,
        status: row,
        imageProduct: row.imageProduct,
        nameProduct: row,
        price: row,
        action:row
    }))
    useEffect(() => {
        getProduct().then((value) => {
            setData({ ...data, 
                listProduct: ProductCategory(TreeCategory(value[0], null), value[1]),
                listCategory: TreeCategory(value[0], null)
            })
        });
    }, [dataChange == true])
    return (
        <Box sx={{ padding: "10px", backgroundColor: "white", borderRadius: "10px" }}>
            <Box sx={{ display: "flex", marginBottom:"10px"}}>
                <TreeSelect
                    fieldNames={{
                    children: 'childCategory',
                    label: 'nameCategory',
                    value: 'idCategory',
                    }}
                    showSearch
                    style={{ width: '40%', marginRight:"10px" }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Chọn danh mục"
                    loading={data.listCategory?false:true}
                    treeData={data.listCategory}
                    size="large"
                    onChange={(value) => {                    
                        setSearch({...dataSearch, "cateSearch":value})
                    }}
                />
                <Input 
                    placeholder="Tên sản phẩm"
                    style={{marginRight:10, width:"40%"}}
                    size="large"
                    onChange={(e) => {
                        setSearch({...dataSearch, "nameSearch":e.target.value})
                    }}
                />
                <Link to={"/product/add"} style={{width:"20%"}}>
                    <Button variant="contained" sx={{width:"100%"}}>Thêm sản phẩm</Button>
                </Link>
            </Box>
            <Box>
                <Table
                    columns={columns}
                    dataSource={rows}
                    bordered
                    loading={data.listProduct?false:true}
                />
            </Box>    
        </Box>
    )
}

export default Product
