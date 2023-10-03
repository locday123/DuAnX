import { Box, Switch, TextField } from "@mui/material"
import { DataGrid} from '@mui/x-data-grid';
import { getProduct } from "../../Service/Product/ProductService"
import { useEffect, useState } from "react"

function Product() {
    const [product, setProduct] = useState([])
    const columns = [
        {field: 'nameProduct', headerName: 'Tên sản phẩm', width: 250, height:200,
            renderCell: ({ value }) => { 
                return (
                    <Box sx={{display:"flex", flexDirection:"column"}}>
                        <span style={{fontWeight:"bold", fontSize:"15px"}}>{value.nameProduct}</span>
                        <span style={{ fontSize: "12px", color: "#5c5c66" }}>ID:{value.idProduct}</span>
                    </Box>
                )
            }
        },
        { field: 'linkProduct', headerName: 'Đường dẫn', width: 200 },
        {field: 'price', headerName: 'Giá', width: 150, type:"number", align: "center", headerAlign: 'center',
            renderCell: ({ value }) => { 
                return (
                    <Box sx={{display:"flex", flexDirection:"column"}}>
                        <span style={{fontWeight:"bold", fontSize:"16px", marginBottom:"10px", textAlign:"center"}}>{new Intl.NumberFormat().format(value.priceProduct)}</span>
                        <TextField
                            label="Giá thị trường"
                            InputLabelProps={{style: {fontSize: "13px", color: "#5c5c66"}}}
                            name="priceThrough"
                            defaultValue={new Intl.NumberFormat().format(value.priceThrough)}
                            size="small"
                            inputProps={{ style: { textAlign: "center", height:"15px", fontSize:"14px"} }}
                        />
                    </Box>
                )
            }
        },
        {field: 'status', headerName: 'Ẩn / Hiện', width: 120, align: "center", headerAlign: 'center',
            renderCell: ({ value }) => { 
                return (
                    <Switch/>
                )
            }
        },
    ]

    const rows = product.map((row) => ({
        id:row.idProduct,
        nameProduct: row,
        linkProduct: row.linkProduct,
        price: row,
    }))
    useEffect(() => {
        getProduct().then((value) => {
            setProduct(value)
        });
    }, [])
    return (
        <Box sx={{padding:"10px", backgroundColor:"white", borderRadius:"10px"}}>
            <Box>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    disableRowSelectionOnClick 
                    rowHeight={90}
                    initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                    pageSizeOptions={[5]}
                />
            </Box>    
        </Box>
    )
}

export default Product
