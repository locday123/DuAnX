import { Box, Button, TextField } from "@mui/material";
import { getFolder } from "../../Service/FileManager/FileManager"
import { useEffect, useState } from "react";

function CreateFolder({ dataFolder }) {
    const [data, setData] = useState([])
    console.log(data);
    useEffect(() => {
        setData(dataFolder)
    },[data])
    return (
        <Box>
            <TextField
                type="text"
                size="small"
                sx={{ marginBottom: "10px" }}
                onChange={(e) => {
                    setData({
                        ...data,
                        ["nameFolder"]: e.target.value,
                        ["action"]: data.dataFolder.action,
                        ["pathFolder"]: data.dataFolder.pathFolder
                    })
                }}
                fullWidth
            />
            <Button variant="contained" size="small" sx={{ alignItems: "center" }} onClick={() => {
                getFolder(data).then((value) => {
                    console.log("Tạo thành công");
                })
            }}>
                {data.action == "rename-folder"?"ĐỔI TÊN THƯ MỤC":"TẠO THƯ MỤC"}
            </Button>
        </Box>
    )
}

export default CreateFolder