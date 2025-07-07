import { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import Table from '../../components/Table/Table';
import {getCornProducts} from '../../services/serices'
import { type GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import {buyCorn, logout, isLoggedIn} from '../../services/serices';
import { useNavigate } from 'react-router-dom';


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

type NotificationType = {
    message: string;
    type: "error" | "info" | "success" | "warning";
    close: Function
}

function Home(){
    const [cornProducts, setCornProducts] = useState<CornProduct[]>([]);
    const [state, setState] = useState<NotificationType>({message: "", type: "success", close:  ()=>{}})
    const [showNotification, setShowNotification] = useState<boolean>(false)

    const navigate = useNavigate();

    const fetchData = () => {
         getCornProducts()
        .then(data => {
            const flattenedData = data?.map((corn : any) => ({
                ...corn,
                'crop_type_id': corn?.cropType?.id,
                'crop_type_name': corn?.cropType?.name 
            }))
            setCornProducts(flattenedData)
        })
        .catch(err => err)
    }

    const handleBuy = () => {
        setShowNotification(false)
        buyCorn()
        .then(data => {
            setState({
                message: data?.status == 429 ? "Too many request!" : data?.message,
                type: data?.status == 429 ? "warning" : "success",
                close: setShowNotification
            })
            setShowNotification(true)
        })
    }

    const handleLogout = () => {
        logout()
        .then(data => {
            setState({message: data.message, type: 'success', close: setShowNotification})
            navigate('/login');
        })
        .catch(err => {
            setState({message: 'Error while loggin out', type: 'success', close: setShowNotification})
            navigate('/login')
        })
    }

    const checkUser = () => {
        isLoggedIn()
        .then(data => {
            if (!data?.is_loggedin){
                navigate('/login')
            }
        })
    }

    useEffect(() => {
        checkUser() //TODO: Later this will be an a store or somewhere else
        fetchData()
    }, [])

    return(
        <>
        <Nav/>
        {showNotification ? <Notification message={state.message} type={state.type} close={setShowNotification}/> : null}
        <Table rows={cornProducts} columns={columns}/>
        <Stack spacing={2} mt={3} direction="row" justifyContent="end" alignItems="center">
            <Button variant="contained" onClick={() => handleBuy()}>Buy Some Corn</Button>
            <Button variant="contained" onClick={() => handleLogout()}>Log out</Button>
        </Stack>
        </>
    )
}

function Notification({message='', type, close}: NotificationType){
    return(
        <Alert variant="filled" severity={type} onClose={() => close(false)}>
            {message}
        </Alert>
    )
}

export default Home