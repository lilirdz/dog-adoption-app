import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import authInstance from '../utils/Auth';
import { Typography, Button, Box, InputLabel, Input,  FormGroup, FormControl } from "@mui/material";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const LoginPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
        const success = await authInstance.login(name, email);
        if (success) {
            navigate('/dogs');
        } else {
            setError('Login failed');
            
        }
    } catch (err) {
        setError('Login failed');
        console.error('Login error', err);
    } finally {
        setIsLoading(false);
    } };

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#f8f0e5', height: '100vh', width: '100vw', paddingLeft: 0, paddingRight: 2}}>
            <DotLottieReact src="https://lottie.host/0408d533-f3bf-40e9-aced-b82c5187f164/LMInmXXiLB.lottie" loop autoplay style={{width: '50%', height: 'auto'}}  />
            <Box sx={{display: "flex", flexDirection: 'column', gap: 4, height: '60vh'}}>
            <Typography variant="h3" sx={{color: '#335368'}}>Find Your Future Best Friend!</Typography>
            <Typography variant="h4" sx={{color: '#335368'}} >Login to get started</Typography>
            {error && (<div>{error}</div>)}
            <form onSubmit={handleSubmit}>
            <FormGroup sx={{border: '2px solid #cad7b9', padding: 4, borderRadius: 4, backgroundColor: '#f6ede2', gap: 4}}>
                <FormControl>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    /> 
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </FormControl>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button sx={{backgroundColor: '#33A7C0', color: 'white', width: '33%', borderRadius: 2}} type="submit" loading={isLoading}>
                            
                            Login
                        </Button>
                        </Box>
                        </FormGroup> 
                        </form>    
            </Box>
        </Box>
    )
};

export default LoginPage;