import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

type CornProduct = {
  id: number;
  crop_type_id: number;
  harvest_date: string; // or `Date` if parsed
  quantity: number;
  crop_type_name: string;
};

type Props = {
    rows: CornProduct[];
    columns: GridColDef[];
}
const paginationModel = { page: 0, pageSize: 5 };

export default function Table({rows=[], columns=[]}: Props) {
  return (
    <Paper sx={{ height: 400, width: '100%', marginTop: '24px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}