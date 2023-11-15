import { Folder } from "@mui/icons-material"
import { Box } from "@mui/material"
import { Tree } from "antd"
import { useEffect, useState } from "react"
import { getFolder } from "../../Service/FileManager/FileManager"

function FileManager() {

    const [folder, setFolder] = useState([])
    const [data, setData] = useState('')
    
    const treeData = (dataTree) => {
        const data = [];
        for (var i in dataTree) {
            data.push({
                title:
                    (<Box sx={{fontSize:"15px", display:"flex", alignItems:"center"}}>
                        <Folder sx={{color:"#f3ec81", marginRight:"12px", fontSize:"35px"}} />
                        <span>{dataTree[i].title}</span>
                    </Box>),
                path: dataTree[i].path,
                nameFolder: dataTree[i].nameFolder,
                parentFolder: dataTree[i].parentFolder,
                key: dataTree[i].key,
                children: treeData(dataTree[i].children)
            })
        }
        return data
    }
    useEffect(() => {
        if(data=="")
            getFolder(data).then((value) => {
                setFolder(value)
        })
    }, [data])
    return (
        <Box sx={{width:"100%", height:"100%", display:"flex"}}>
            <Box sx={{width:"25%", backgroundColor:"white", padding: "10px", borderRadius:"10px"}}>
                <Tree
                    treeData={treeData(folder)}
                    onSelect={(nameFolder, folders) => console.log(folders.node)}
                    onDoubleClick={(nameFolder, folders) => {
                        setData(folders.title)
                        getFolder({ ["path"]: folders.path }).then((value, index) => {
                            value.map((newValue, index) => {
                               
                                folder.find(({ nameFolder }) => nameFolder === folders.nameFolder).children = 
                                [{["title"]: newValue.title,  ["nameFolder"]: newValue.nameFolder, ["parentFolder"]: newValue.parentFolder, ["path"]: folders.path+newValue.path, ["key"]:newValue.key }]
                            })
                            
                        })
                        
                    }} 
                />
            </Box>
            <Box sx={{width:"70%", marginLeft:"10px", backgroundColor:"white", padding: "10px", borderRadius:"10px"}}>
                File
            </Box>
        </Box>
    )
}

export default FileManager