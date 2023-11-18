import { Delete, DriveFileRenameOutlineRounded, Folder, Info } from "@mui/icons-material"
import { Box } from "@mui/material"
import { Dropdown, Popover, Tree } from "antd"
import { useEffect, useState } from "react"
import { getFolder } from "../../Service/FileManager/FileManager"


function FileManager() {

    const [folder, setFolder] = useState([])
    const [data, setData] = useState('')
    const [breadcrumbs, setBreadcrumbs] = useState('File')
    const items = (listFolder) => {
        const data = []
        data.push(
            {
                label: (
                    <Box sx={{display:"flex", alignItems:"center", fontSize:"13px"}}>
                        <Delete sx={{color:"#1976d2", fontSize:"20px", marginRight:"10px"}}/>
                        <span>Xóa thư mục</span>
                    </Box>
                ),
                key: 1
            },
            {
                label: (
                    <Box sx={{display:"flex", alignItems:"center", fontSize:"13px"}}>
                        <DriveFileRenameOutlineRounded sx={{color:"#1976d2  ", fontSize:"20px", marginRight:"10px"}}/>
                        <span>Đổi tên thư mục</span>
                    </Box>
                ),
                key: 2
            },
            {
                label: (
                    <Box sx={{display:"flex", alignItems:"center", fontSize:"13px"}}>
                        <Info sx={{color:"#1976d2  ", fontSize:"20px", marginRight:"10px"}}/>
                        <span>Xem chi tiết thư mục</span>
                    </Box>
                ),
                key: 2
            },
        )
        return data;
    }
    
    const TreeFolder = (listFolder) => {
        var data = []
        for (const key in listFolder) {
            if (listFolder[key].type == "directory") {
                data.push({
                    nameFolder: (
                        <Dropdown menu={{items: items(listFolder[key]) }} trigger={['contextMenu']}>
                            <Box sx={{display:"flex", alignItems:"center", fontSize:"15px"}}>
                                <Folder sx={{color:"#fddd36", fontSize:"35px", marginRight:"10px"}}/>
                                <span>{ (listFolder[key].name).charAt(0).toUpperCase() + (listFolder[key].name).slice(1)}</span>
                            </Box>
                        </Dropdown>
                    ),
                    key:listFolder[key].name,
                    pathFolder: listFolder[key].relativePath == "."? "Public": "Public/"+listFolder[key].relativePath,
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
            <Box sx={{width:"25%", backgroundColor:"white", padding: "10px"}}>
                <Tree
                    fieldNames={{
                        title: 'nameFolder',
                    }}
                    defaultSelectedKeys={"pulbic"}
                    treeData={TreeFolder(folder)}
                    onSelect={(nameFolder, folders) => { console.log(folders.node); setBreadcrumbs(folders.node.pathFolder) }}
                    
                />
            </Box>
            <Box sx={{width:"70%", marginLeft:"10px", backgroundColor:"white"}}>
                <Box sx={{ backgroundColor: "white", borderBottom: "1px solid #dee2e6", padding: "10px" }}>{ breadcrumbs }</Box>
            </Box>
            
        </Box>
    )
}

export default FileManager