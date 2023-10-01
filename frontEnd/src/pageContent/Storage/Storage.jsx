import { useContext, useEffect, useState } from "react"
import DataGird from "../../components/DataGird"
import AddStorage from "./AddStorage"
import { Box, Button, IconButton, Tooltip } from "@mui/material"
import { getStorage } from "../../Service/Storage/StorageService"
import Context from "../../Context"
import { Delete } from "@mui/icons-material"

function Storage() {
    const [storage, setStorage] = useState([])
    const { dataChange } = useContext(Context)
    const columns = [
        { field: 'idStorage', headerName: 'ID', width: 80 },
        {
            field: 'nameSpace', headerName: 'Tên dung lượng', width: 200,
            renderCell: ({ value }) => {
                return (
                    <Button variant="contained" sx={{width:"150px"}}>{ value }</Button>
                )
            }
        },
        {
            field: 'spaceStorage', headerName: 'GB | TB to MB', width: 200,
            renderCell: ({ value }) => {
                return (
                    <Button variant="outlined" sx={{width:"150px"}}>{ value }</Button>
                )
            }
        },
        {
            field: 'handle', headerName: 'THAO TÁC', width: 150, renderCell: ({ value }) => {
                return (
                    <Tooltip title={'Xóa ID [ '+value.nameSpace+' ]'}>
                        <IconButton color='primary'>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                )
            }

        }
        

    ]/* Hiển thị header table */
    const rows = storage.map((row) => ({
        id: row.idStorage,
        idStorage: row.idStorage,
        spaceStorage: row.spaceStorage,
        nameSpace: row.nameSpace,
        handle: row
    }))
    useEffect(() => {
        getStorage().then((value) => {
            setStorage(value)
        });
    }, [dataChange == true])
    return (
        <Box sx={{padding:"10px", backgroundColor:"white", borderRadius:"10px"}}>
            <Box sx={{marginBottom:"10px"}}><AddStorage /></Box>
            <Box><DataGird columns={columns} rows={rows}/></Box>    
        </Box>
    )
}
export default Storage