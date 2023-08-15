import { DataGrid} from '@mui/x-data-grid';

function DataGird({rows, columns}){
    return(
        <div>
            <DataGrid 
            rows={rows} 
            columns={columns}
            disableColumnMenu 
            disableRowSelectionOnClick
            checkboxSelection 
            hideFooter
            />
        </div>
    )
}

export default DataGird;