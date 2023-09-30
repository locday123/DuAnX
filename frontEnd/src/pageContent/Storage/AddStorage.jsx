import { Box, Button, MenuItem, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import convertSize from "convert-size"

import { addStorage } from '../../Service/Storage/StorageService';
import Context from '../../Context';

function AddStorage() {

    const [storage, setStorage] = useState({unit: "GB"})
    const { setAlert, setMessage, setChange } = useContext(Context)
    const donvi = [
        { value: "GB", label: "GB" },
        { value: "TB", label: "TB" }
    ]
    console.log(storage);
    return (
        <Box sx={{ backgroundColor: "white", padding: "10px", display: "flex", flexDirection:"column", borderRadius: "10px" }}>
            <Box sx={{marginBottom:"10px"}}>
            <TextField
                type="number"
                name="nameSpace"
                label="Dung lượng"
                size='20px'
                sx={{ width: "calc(90% - 10px)"}}
                onChange={(e) => {
                    storage.unit ?
                        setStorage({
                            ...storage,
                            nameSpace: (e.target.value),
                            spaceStorage:
                                e.target.value ?
                                    convertSize((e.target.value + " " + storage.unit), "MB") :
                                    null
                        })
                        :
                        null

                }
                }
            />
            <TextField
                type="text"
                select
                name="unit"
                label="Đơn vị"
                sx={{ width: "10%", marginLeft: "10px"}}
                defaultValue={"GB"}
                onChange={(e) => {
                    setStorage({
                        ...storage,
                        unit: e.target.value,
                        spaceStorage:
                            storage.nameSpace ?
                                convertSize((storage.nameSpace + " " + e.target.value), "MB") :
                                null
                    })
                }
                }
            >
                {
                    donvi.map((value) => (
                        <MenuItem key={value.value} value={value.value}>{value.label}</MenuItem>
                    ))
                }


            </TextField>
            </Box>
            <Button
                sx={{ width: "100%" }}
                size='large'
                variant='contained'
                onClick={() => {
                    storage.spaceStorage <=26000000?
                    addStorage({nameSpace: (storage.nameSpace + storage.unit),spaceStorage: storage.spaceStorage }).then((value)=>{
                        setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                        setMessage(value.message)
                        
                    }):
                    setAlert({ ...{ vertical: 'bottom', horizontal: 'right' }, open: true });
                    setMessage("Xảy ra lỗi, vui lòng kiểm tra lại")
                }}
            >THÊM DUNG LƯỢNG</Button>
        </Box >
    )
}

export default AddStorage