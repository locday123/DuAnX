import {Box, Button, MenuItem, TextField} from '@mui/material'
import { useState } from 'react'
import convertSize from "convert-size"

function Storage(){

    const [storage, setStorage] = useState([])
    const donvi = [
        {value:"GB", label:"GB"},
        {value:"TB", label:"TB"}
    ]
    console.log(storage);
    return(
        <Box sx={{backgroundColor:"white", padding:"10px", display:"flex", borderRadius:"10px"}}>
            <TextField
                type="number"
                name="nameSpace"
                label="Dung lượng"
                placeholder='Vui lòng nhập dung lượng'
                size='20px'
                sx={{width:"70%", marginRight:"20px"}}
                onChange={(e)=>
                    {
                        storage.unit?
                        setStorage({...storage, 
                            nameSpace: e.target.value, 
                            spaceStorage: 
                                e.target.value?
                                convertSize((e.target.value+" "+storage.unit),"MB"):
                                null 
                        })
                        :
                        setStorage({...storage, unit: "GB" })

                    }
                }
            />
            <TextField
                type="text"
                select
                name="nameSpace"
                label="Đơn vị"
                size='20px'
                sx={{width:"10%", marginRight:"20px"}}
                defaultValue={"GB"}
                onChange={(e)=>
                    {
                        setStorage({...storage, 
                            unit: e.target.value, 
                            spaceStorage: 
                                storage.nameSpace?
                                convertSize((storage.nameSpace+" "+e.target.value),"MB"):
                                null 
                        })
                    }
                }
            >
                {
                    donvi.map((value)=>(
                        <MenuItem key={value.value} value={value.value}>{value.label}</MenuItem>
                    ))
                }
                
                
            </TextField>
            <Button sx={{width:"20%"}} size='medium' variant='contained'>THÊM DUNG LƯỢNG</Button>
        </Box>
    )
}

export default Storage