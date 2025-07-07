import { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import Table from '../../components/Table/Table';
import {getCornProducts} from '../../services/serices'
import { type GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, type: 'number', },
  { field: 'crop_type_name', headerName: 'Crop Type Name', flex: 1, },
  { field: 'crop_type_id', headerName: 'Crop Type Id', flex: 1, type: 'number', },
  {
    field: 'harvest_date',
    headerName: 'Harvest Date',
    type: 'date',
    flex: 1,
    valueGetter: (params: any) => {
        console.log(params)
        return params ? new Date(params) : null
    }
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    flex: 1,
  },
];

type CornProduct = {
  id: number;
  crop_type_id: number;
  harvest_date: string; // or `Date` if parsed
  quantity: number;
  crop_type_name: string;
};

function Home(){
    const [cornProducts, setCornProducts] = useState<CornProduct[]>([]);

    const fetchData = () => {
         getCornProducts()
        .then(data => {
            const flattenedData = data?.map((corn : any) => ({
                ...corn,
                'crop_type_id': corn?.cropType?.id,
                'crop_type_name': corn?.cropType?.name 
            }))
            console.log(flattenedData)
            setCornProducts(flattenedData)
        })
        .catch(console.log)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <>
        <Nav/>
        <Table rows={cornProducts} columns={columns}/>
        </>
    )
}

export default Home