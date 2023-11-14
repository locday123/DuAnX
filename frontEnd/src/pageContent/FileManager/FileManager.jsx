import { Box } from "@mui/material"

function FileManager() {
    return (
        <Box sx={{width:"100%", display:"flex", padding: "10px"}}>
            <Box sx={{width:"30%",borderRight:"1px solid red", backgroundColor:"white", padding: "10px"}}>
                Tree
            </Box>
            <Box sx={{width:"70%", marginRight:"10px", backgroundColor:"white", padding: "10px"}}>
                File
            </Box>
        </Box>
    )
}

export default FileManager