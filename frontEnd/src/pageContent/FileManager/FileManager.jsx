import { Add, Delete, DriveFileRenameOutlineRounded, Folder, Info, UploadFile } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import { Card, Dropdown, Image, List, Tree, Upload } from "antd"
import { useEffect, useState } from "react"
import { getFolder } from "../../Service/FileManager/FileManager"
import ModalSystem from "../../components/ModalSystem"
import CreateAndRenameFolder from "./CreateAndRenameFolder"
import { TreeFolder } from "../../Hook/Hook_Folder"


function FileManager() {
    const [folder, setFolder] = useState([])
    const [data, setData] = useState([])
    const [children, setChildren] = useState([])
    const [breadcrumbs, setBreadcrumbs] = useState('File')
    const [open, setOpen] = useState(false)
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const items = (listFolder) => {
        const pushData = []
            pushData.push(
                {
                    label: (
                        <Button
                            startIcon={<Delete sx={{ color: "#1976d2", fontSize: "20px" }} />}
                            sx={{ display: "flex", alignItems: "center", fontSize: "13px" }}
                            onClick={() => {
                                console.log(listFolder.pathFolder);
                            }}
                        >
                           {"Xóa thư mục"}
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
                                setData({ ...data, ["action"]: "rename-folder", ["nameFolder"]: listFolder.name})
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
        return pushData;
    }
    

    const ListItem = (listItem) => {
        var data = []
        for (const key in listItem) {
                data.push({
                    nameFolder: listItem[key].name,
                    typeFolder: listItem[key].type,
                    key: listItem[key].name,
                    extensionFolder: listItem[key].extension,
                    pathFolder: listItem[key].relativePath,
                    children: ListItem(listItem[key].children)
                })
        }
        return data
    }
    const loadImg = (item) => {
        return `http://localhost:8081/images/${data.pathFolder+"/"+item}`
    }
    useEffect(() => {
        const getList = {["action"]: "read-folder", ["pathFolder"]:"." }
        getFolder(getList).then((value) => {
            setFolder(value[0].children)
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
                        onSelect={(name, event) => {
                            setData({ ...data, ["selectFolder"]: event.node.pathFolder })
                            
                        }}
                        onRightClick={(folders) => {
                            setData({ ...data, ["pathFolder"]: folders.node.pathFolder })
                        }}
                        onDoubleClick={(event, node) => {
                            const getList = { ["action"]: "read-folder", ["pathFolder"]: node.pathFolder }
                            setData({ ...data, ["pathFolder"]: node.pathFolder })
                            getFolder(getList).then((value) => {
                                setChildren(value[0].children)
                                
                            })
                            
                        }}
                        titleRender={(node) => (
                            (node.nameFolder !="public")?
                                <Dropdown
                                    menu={{
                                        items: items(node),
                                    }}
                                    trigger={['contextMenu']}
                                >
                                    <Box sx={{display:"flex", alignItems:"center", fontSize:"15px"}}>
                                        <Folder sx={{color:"#fddd36", fontSize:"30px", marginRight:"10px"}}/>
                                        <span>{ (node.nameFolder).charAt(0).toUpperCase() + (node.nameFolder).slice(1)}</span>
                                    </Box>
                                </Dropdown>
                                :
                                <Box sx={{ display: "flex", alignItems: "center", fontSize: "15px" }}>
                                    <Folder sx={{color:"#fddd36", fontSize:"30px", marginRight:"10px"}}/>
                                    <span>{ (node.nameFolder).charAt(0).toUpperCase() + (node.nameFolder).slice(1)}</span>
                                </Box>   
                        )}
                    />
                </Box>
            </Box>
            <Box sx={{width:"70%", marginLeft:"10px", backgroundColor:"white", height:"100%"}}>
                <Box sx={{ backgroundColor: "white", borderBottom: "1px solid #dee2e6", padding: "10px" }}>{breadcrumbs}</Box>
                <Box sx={{overflow:"hidden", position:"relative", height:"100%", width:"100%"}}>
                    <Box sx={{padding:"10px", }}>
                        <List
                            grid={{
                            gutter: 1,
                            column: 7
                            }}
                            dataSource={ListItem(children)}
                            style={{position: "absolute", height: "calc(100% - 5rem)", width:"100%", overflow:"hidden auto"}}
                            renderItem={(item) => (
                            <List.Item>
                                <Box sx={{display:"flex", flexDirection:"column",justifyContent:"center", fontSize:"12px"}}>
                                    <Box sx={{display:"flex", justifyContent:"center"}}>
                                    {
                                        item.typeFolder == "directory"?
                                            <Folder sx={{ color: "#fddd36", fontSize: "57px"}} />:
                                        (item.typeFolder == "file" && item.extensionFolder  == "png")?
                                            <img
                                                width={"60%"}
                                                src={loadImg(item.pathFolder)}
                                            />: null
                                    }
                                        </Box>
                                    <Box sx={{textAlign:"center"}}>
                                            <span>{ item.nameFolder }</span>
                                    </Box>
                                    
                                </Box>
                                

                            </List.Item>
                            )}
                        />
                    </Box>
                </Box>
            </Box>
            <ModalSystem open={open} onCancel={handleCancel} title={data.action == "rename-folder"?"ĐỔI TÊN THƯ MỤC":"TẠO DANH MỤC"} width={"30%"}>
                <CreateAndRenameFolder dataFolder={data}/>
            </ModalSystem>
        </Box>
    )
}

export default FileManager