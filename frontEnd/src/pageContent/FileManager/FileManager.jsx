import { Folder } from "@mui/icons-material"
import { Box } from "@mui/material"
import { Tree } from "antd"
import { useEffect, useState } from "react"
import { getFolder } from "../../Service/FileManager/FileManager"

function FileManager() {

    const [folder, setFolder] = useState([])
    const [data, setData] = useState('')
    
    const CustomTree = (listFoder) => {
        var data = []
        
        for (const key in listFoder) {
            listFoder[key].type == "directory"?
            data.push({
                title: (
                    <Box>
                        {listFoder[key].type == "directory"?<Folder />:null}
                        <span>{ listFoder[key].name }</span>
                    </Box>
                ),
                children: CustomTree(listFoder[key].children)
            })
            :null
        }

        return data;
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
                    
                    icon={"a"}
                    expandAction={"doubleClick"}
                    treeData={CustomTree(folder)}
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