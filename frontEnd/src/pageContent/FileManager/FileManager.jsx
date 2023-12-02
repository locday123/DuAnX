import { Add, Delete, DriveFileRenameOutlineRounded, Folder, Info, UploadFile } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import { Card, Dropdown, Image, List, Tree, Upload } from "antd"
import { useEffect, useState } from "react"
import { getFolder } from "../../Service/FileManager/FileManager"
import ModalSystem from "../../components/ModalSystem"
import CreateAndRenameFolder from "./CreateAndRenameFolder"


function FileManager() {
    const [folder, setFolder] = useState([])
    const [data, setData] = useState([])
    const [children, setChildren] = useState([])
    const [breadcrumbs, setBreadcrumbs] = useState('File')
    const [open, setOpen] = useState(false)
    const data2 = [
        {
          title: 'Title 1',
        },
        {
          title: 'Title 2',
        },
        {
          title: 'Title 3',
        },
        {
          title: 'Title 4',
        },
        {
          title: 'Title 5',
        },
        {
          title: 'Title 6',
        },
      ];
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
    
    const TreeFolder = (listFolder) => {
        var data = []
        for (const key in listFolder) {
           
                data.push({
                    nameFolder: listFolder[key].name,
                    typeFolder: listFolder[key].type,
                    key: listFolder[key].name,
                    extensionFolder: listFolder[key].extension,
                    pathFolder: listFolder[key].relativePath,
                    children: TreeFolder(listFolder[key].children)
                })
        }
        return data
    }
    useEffect(() => {
        const getList = {["action"]: "read-folder" }
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
                        onDoubleClick={(event,node) => {
                            setChildren(node.children)
                            console.log(node.children);
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
            <Box sx={{width:"70%", marginLeft:"10px", backgroundColor:"white"}}>
                <Box sx={{ backgroundColor: "white", borderBottom: "1px solid #dee2e6", padding: "10px" }}>{breadcrumbs}</Box>
                <Box sx={{padding:"10px"}}>
                <List
                    grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                    }}
                    dataSource={children}
                    renderItem={(item) => (
                    <List.Item>
                        <Box sx={{display:"flex", flexDirection:"column",alignItems:"center", fontSize:"15px"}}>
                            <Box sx={{width:"80px"}}>
                            {
                                item.typeFolder == "directory"?
                                    <Folder sx={{ color: "#fddd36", fontSize: "79px" }} />:
                                (item.typeFolder == "file" && item.extensionFolder  == "png")?
                                    <Image
                                        width={"100%"}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
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
            <ModalSystem open={open} onCancel={handleCancel} title={data.action == "rename-folder"?"ĐỔI TÊN THƯ MỤC":"TẠO DANH MỤC"} width={"30%"}>
                <CreateAndRenameFolder dataFolder={data}/>
            </ModalSystem>
        </Box>
    )
}

export default FileManager