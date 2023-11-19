import { Add, Delete, DriveFileRenameOutlineRounded, Folder, Info, UploadFile } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { Dropdown, Tree, Upload } from "antd"
import { useEffect, useState } from "react"
import { getFolder } from "../../Service/FileManager/FileManager"
import ModalSystem from "../../components/ModalSystem"
import CreateAndRenameFolder from "./CreateAndRenameFolder"


function FileManager() {

    const [folder, setFolder] = useState([])
    const [data, setData] = useState([])
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
        if (listFolder.name != "public") {
            pushData.push(
                {
                    label: (
                        <Button
                            startIcon={<Delete sx={{ color: "#1976d2", fontSize: "20px" }} />}
                            sx={{ display: "flex", alignItems: "center", fontSize: "13px" }}
                            onClick={() => {
                                getFolder({ ["pathFolder"]: data.pathFolder, ["action"]: "delete-folder" }).then((value) => {
                                    console.log("OK");
                                })
                            }}
                        >
                            <span>{"Xóa thư mục [" + (listFolder.relativePath == "." ? "public/" : "public/" + listFolder.relativePath) + "]"}</span>
                        </Button>
                    ),
                    key: "delete-folder"
                },
                {
                    label: (
                        <Button
                            startIcon={<DriveFileRenameOutlineRounded sx={{ color: "#1976d2  ", fontSize: "20px"}} />}
                            sx={{ display: "flex", alignItems: "center", fontSize: "13px" }}
                            onClick={(e) => {
                                e.stopPropagation()
                                setData({ ...data, ["action"]: "rename-folder" })
                                showModal()
                                
                            }}
                        >
                            <span>Đổi tên thư mục</span>
                        </Button>
                    ),
                    key: "rename-folder"
                },
                {
                    label: (
                        <Button
                            startIcon={<Info sx={{ color: "#1976d2  ", fontSize: "20px" }} />}
                            sx={{ display: "flex", alignItems: "center", fontSize: "13px" }}
                        >
                            <span>Xem chi tiết thư mục</span>
                        </Button>
                    ),
                    key: 3
                },
            )
        }
        return pushData;
    }
    
    const TreeFolder = (listFolder) => {
        var data = []
        for (const key in listFolder) {
            if (listFolder[key].type == "directory") {
                data.push({
                    nameFolder: (
                        <Dropdown
                            menu={{
                                items: items(listFolder[key]),
                            }}
                            trigger={['contextMenu']}
                        >
                            <Box sx={{display:"flex", alignItems:"center", fontSize:"15px"}}>
                                <Folder sx={{color:"#fddd36", fontSize:"35px", marginRight:"10px"}}/>
                                <span>{ (listFolder[key].name).charAt(0).toUpperCase() + (listFolder[key].name).slice(1)}</span>
                            </Box>
                        </Dropdown>
                    ),
                    typeFolder: listFolder[key].type,
                    key:listFolder[key].name,
                    pathFolder: listFolder[key].relativePath == "."? "Public": "Public/"+listFolder[key].relativePath,
                    children: TreeFolder(listFolder[key].children)
                })
            }
        }
        return data
    }
    
    useEffect(() => {
        const getList = { ["pathFolder"]: "public/", ["action"]: "read" }
        getFolder(getList).then((value) => {
            setFolder(value)
        })
    }, [])
    return (
        <Box sx={{width:"100%", height:"100%", display:"flex"}}>
            <Box sx={{ width: "30%", backgroundColor: "white"}}>
                <Box sx={{ backgroundColor: "white", borderBottom: "1px solid #dee2e6", padding: "10px" }}>
                    <Box sx={{display:"flex", alignItems:"center", justifyItems:"center" ,fontSize:"15px"}}>
                        
                        <Button
                            startIcon={<Add />}
                            variant="contained"
                            size="small"
                            sx={{ alignItems: "center", marginRight: "10px" }}
                            onClick={(e) => {
                                e.stopPropagation()
                                setData({...data, ["action"]:"create-folder"})
                                showModal()
                            }}>
                            Tạo thư mục
                        </Button>
                        <Upload>
                            <Button startIcon={<UploadFile/>} variant="contained" size="small" sx={{ alignItems: "center" }}>
                                Upload FILE
                            </Button>
                        </Upload>
                    </Box>
                </Box>
                <Box sx={{ padding:"10px"}}>
                    <Tree
                        fieldNames={{
                            title: 'nameFolder',
                        }}
                        defaultExpandedKeys={["public"]}
                        treeData={TreeFolder(folder)}
                        onSelect={(nameFolder, folders) => {
                            setData({ ...data, ["pathFolder"]: folders.node.pathFolder })
                        }}
                        onRightClick={(folders) => {
                            setData({ ...data, ["pathFolder"]: folders.node.pathFolder })
                        }}
                        
                    />
                </Box>
            </Box>
            <Box sx={{width:"70%", marginLeft:"10px", backgroundColor:"white"}}>
                <Box sx={{ backgroundColor: "white", borderBottom: "1px solid #dee2e6", padding: "10px" }}>{ breadcrumbs }</Box>
            </Box>
            <ModalSystem open={open} onCancel={handleCancel} title={data.action == "rename-folder"?"ĐỔI TÊN THƯ MỤC":"TẠO DANH MỤC"} width={"30%"}>
                <CreateAndRenameFolder dataFolder={data}/>
            </ModalSystem>
        </Box>
    )
}

export default FileManager