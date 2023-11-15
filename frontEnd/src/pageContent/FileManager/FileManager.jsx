import { Folder } from "@mui/icons-material"
import { Box } from "@mui/material"
import { Tree } from "antd"
import { useEffect, useState } from "react"
import { getAll } from "../../Service/FileManager/FileManager"

function FileManager() {

    const [folder, setFolder] = useState([])

    const treeData = folder.map((value) => ({
        title:
            (<Box sx={{fontSize:"15px", display:"flex", alignItems:"center"}}>
                <Folder sx={{color:"#f3ec81", marginRight:"12px", fontSize:"35px"}} />
                <span>{value}</span>
            </Box>),
        key: value
    }))
    useEffect(() => {
        getAll('public').then((value) => {
            setFolder(value)
        })
    }, [])
    console.log(treeData);
    return (
        <Box sx={{width:"100%", height:"100%", display:"flex"}}>
            <Box sx={{width:"25%", backgroundColor:"white", padding: "10px", borderRadius:"10px"}}>
                <Tree
                    treeData={treeData}
                />
            </Box>
            <Box sx={{width:"70%", marginLeft:"10px", backgroundColor:"white", padding: "10px", borderRadius:"10px"}}>
                File
            </Box>
        </Box>
    )
}

export default FileManager