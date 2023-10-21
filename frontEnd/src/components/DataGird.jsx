import { Box } from '@mui/material';
import { DataGrid} from '@mui/x-data-grid';

function DataGird({rows, columns}){
    return(
        <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid 
            rows={rows} 
            columns={columns}
            disableColumnMenu
            disableRowSelectionOnClick
            hideFooter
            />
        </Box>
    )
}

export default DataGird;