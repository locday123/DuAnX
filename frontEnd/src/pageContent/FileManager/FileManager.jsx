import { Add, CreateNewFolder, CreateNewFolderOutlined, Delete, DriveFileRenameOutlineRounded, Folder, Info } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { Dropdown , Popconfirm, Tree } from "antd"
import { useEffect, useState } from "react"
import { getFolder } from "../../Service/FileManager/FileManager"
import ModalSystem from "../../components/ModalSystem"


function FileManager() {

    const [folder, setFolder] = useState([])
    const [data, setData] = useState({["pathFolder"]:"public/", ["action"]:"read"})
    const [breadcrumbs, setBreadcrumbs] = useState('File')
    const [open, setOpen] = useState(false)

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    console.log(data);
    const items = (listFolder) => {
        const pushData = []
        pushData.push(
            {
                label: (
                    <Button sx={{ display: "flex", alignItems: "center", fontSize: "13px" }} onClick={(e)=>{setData({...data, ["action"]:e})}}>
                        <Delete sx={{color:"#1976d2", fontSize:"20px", marginRight:"10px"}}/>
                        <span>{ "Xóa thư mục ["+ (listFolder.relativePath == "."?"public/":"public/"+listFolder.relativePath)+ "]" }</span>
                    </Button>
                ),
                key: 1
            },
            {
                label: (
                    <Button sx={{display:"flex", alignItems:"center", fontSize:"13px"}} onClick={()=>{setData({...data, ["action"]:"rename-folder"})}}>
                        <DriveFileRenameOutlineRounded sx={{color:"#1976d2  ", fontSize:"20px", marginRight:"10px"}}/>
                        <span>Đổi tên thư mục</span>
                    </Button>
                ),
                key: 2
            },
            {
                label: (
                    <Button sx={{display:"flex", alignItems:"center", fontSize:"13px"}}>
                        <Info sx={{color:"#1976d2  ", fontSize:"20px", marginRight:"10px"}}/>
                        <span>Xem chi tiết thư mục</span>
                    </Button>
                ),
                key: 3
            },
        )
        return pushData;
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
            <Box sx={{ width: "25%", backgroundColor: "white"}}>
                <Box sx={{ backgroundColor: "white", borderBottom: "1px solid #dee2e6", padding: "10px" }}>
                    <Box sx={{display:"flex", alignItems:"center" ,fontSize:"15px"}}>
                        
                        <Button variant="contained" size="small" sx={{alignItems:"center"}} onClick={()=>{showModal()}}>
                            <Add/>
                            Tạo thư mục
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ padding:"10px"}}>
                    <Tree
                        fieldNames={{
                            title: 'nameFolder',
                        }}
                        defaultSelectedKeys={"pulbic"}
                        treeData={TreeFolder(folder)}
                        onSelect={(nameFolder, folders) => {
                            setBreadcrumbs(folders.node.pathFolder)
                            setData({ ...data, ["pathFolder"]: folders.node.pathFolder })
                        }}
                    />
                </Box>
            </Box>
            <Box sx={{width:"70%", marginLeft:"10px", backgroundColor:"white"}}>
                <Box sx={{ backgroundColor: "white", borderBottom: "1px solid #dee2e6", padding: "10px" }}>{ breadcrumbs }</Box>
            </Box>
            <ModalSystem open={open} onCancel={handleCancel} title={"TẠO THƯ MỤC"} width={"20%"}>
                <Box>
                    <TextField
                        type="text"
                        size="small"
                        sx={{ marginBottom: "10px" }}
                        onChange={(e) =>
                            setData({ ...data, ["nameFolder"]: e.target.value, ["action"]:"create-folder" })
                        }
                        fullWidth
                    />
                    <Button variant="contained" size="small" sx={{ alignItems: "center" }} onClick={() => {
                        getFolder(data).then((value) => {
                            handleCancel()
                        })
                    }}>
                        Tạo thư mục
                    </Button>
                </Box>
            </ModalSystem >
        </Box>
    )
}

export default FileManager