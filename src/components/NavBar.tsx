import {useNavigate} from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';




const NavBar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
    }
    return (
        <AppBar position="static" >
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#cad7b9'}}>
                <PetsIcon sx={{fontSize: 40}} />
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;