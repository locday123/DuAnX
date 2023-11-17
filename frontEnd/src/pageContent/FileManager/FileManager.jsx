import { Folder } from "@mui/icons-material"
import { Box } from "@mui/material"
import { Tree } from "antd"
import { useEffect, useState } from "react"
import { getFolder } from "../../Service/FileManager/FileManager"


function FileManager() {

    const [folder, setFolder] = useState([])
    const [data, setData] = useState('')
    const TreeFolder = (listFolder) => {
        var data = []
        for (const key in listFolder) {
            if (listFolder[key].type == "directory") {
                data.push({
                    nameFolder: (
                        <Box sx={{display:"flex", alignItems:"center", fontSize:"15px"}}>
                            <Folder sx={{color:"#e8eb31", fontSize:"40px", marginRight:"10px"}}/>
                            <span>{ listFolder[key].name}</span>
                        </Box>
                    ),
                    children: TreeFolder(listFolder[key].children)
                })
            }
        }
        return data
    }
    
    useEffect(() => {
        getFolder(data).then((value) => {
            setFolder(value)
        })
    }, [])
    return (
        <Box sx={{width:"100%", height:"100%", display:"flex"}}>
            <Box sx={{width:"25%", backgroundColor:"white", padding: "10px", borderRadius:"10px"}}>
                <Tree
                    fieldNames={{
                       
                        title: 'nameFolder',
                    }}
                    onContextMenu={()=><Box><span>a</span><span>B</span></Box>}
                    treeData={TreeFolder(folder)}
                    onSelect={(nameFolder, folders) => console.log(folders.node)}
                    
                />
            </Box>
            <Box sx={{width:"70%", marginLeft:"10px", backgroundColor:"white", padding: "10px", borderRadius:"10px"}}>
                File
            </Box>
        </Box>
    )
}

export default FileManager