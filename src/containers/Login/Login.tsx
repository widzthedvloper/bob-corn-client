import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import googleImage from '../../assets/google.png';
import { Box } from '@mui/material';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Login() {

    const handleLogin = () => {
        window.location.href = `${API_BASE_URL}/oauth/google`;
    }

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100vh"
        bgcolor="#f5f5f5"
        >
            <Card sx={{ minWidth: 345 }}>
            <CardMedia
                sx={{ height: 240 }}
                image={googleImage}
                title="Google"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Google Login
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" sx={{cursor: "pointer"}} onClick={handleLogin}>Log in</Button>
            </CardActions>
            </Card>
        </Box>
    );
}