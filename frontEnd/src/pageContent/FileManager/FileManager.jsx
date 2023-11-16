import { Folder } from "@mui/icons-material"
import { Box } from "@mui/material"
import { Tree } from "antd"
import { useEffect, useLayoutEffect, useState } from "react"
import { getFolder } from "../../Service/FileManager/FileManager"
import { FormatTreeFolder, TreeCategory } from "../../Hook/Hook"

function FileManager() {

    const [folder, setFolder] = useState([])
    const [data, setData] = useState({ "pathFolder": '' })
    const [listFolder, setList] = useState([])
    useLayoutEffect(() => {
        getFolder(data).then((value) => {
            setList(value)
            setFolder(value)
        })
   }, [])
    return (
        <Box sx={{width:"100%", height:"100%", display:"flex"}}>
            <Box sx={{width:"25%", backgroundColor:"white", padding: "10px", borderRadius:"10px"}}>
                <Tree
                    fieldNames={{
                        children: 'childFolder',
                        title: 'nameFolder',
                        value:"idFolder"
                    }}
                    icon={<Folder />}
                    treeData={FormatTreeFolder(folder,"")}
                    onDoubleClick={(e, folders) => {
                        getFolder(folders).then((value) => value.map((newFolder) => {
                            setList([...listFolder, newFolder])
                            setFolder(listFolder)
                        }))
                       
                        //console.log(listFile);
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