import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const columns = [
    {
        field: 'firstName',
        headerName: 'First name',
        flex: 1
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        flex: 1
    },
    {
        field: 'email',
        headerName: 'email',
        width: 300,
        flex: 1,
        renderCell: (params) => <Link to='#'>{params.value}</Link>
    },

]

const Table = (props) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={props.rows}
                onRowClick={props.onRowClick}
                columns={columns}
                pageSize={10}
                getRowSpacing={params => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isFirstVisible ? 0 : 5
                })}
                sx={{
                    [`& .${gridClasses.row}`]: {
                        bgcolor: (theme) =>
                            theme.palette.mode = grey[300],
                    },
                }}
            />
        </div>
    );
}

export default Table;