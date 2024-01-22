import React from 'react';
import axios from 'axios';
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from 'react-router';
import { Avatar, Button, FormControlLabel, Grid, TextField, Typography, Box, Checkbox, useTheme, Tooltip, IconButton, Alert } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { FooterComponent } from '../components/navigation/FooterComponent';
import { useThemeManagment } from '../providers/ThemeManagmentProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const { darkMode, handleToggleDarkMode } = useThemeManagment();
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    });
    const [error, setError] = React.useState('');

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const validationErrors = [];

    if (formData.username.trim() === '') {
      validationErrors.push('Username is required');
    }

    if (formData.password.trim() === '') {
      validationErrors.push('Password is required');
    }

    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const response = await axios.post(`${apiUrl}/api/authentication/login`, {
          userName: formData.username,
          password: formData.password,
        });

        const token = response.data;

        if (token) {
            setToken(token);
            setTimeout(() => {
                navigate('/');
              });
        }
    } catch (error) {
        console.log(error);
        setError('Invalid username or password. Please double-check your credentials.')
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:  `url(${"src/assets/money.jpg"})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            mt:4,
            mr: 4 
          }}>
            <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
                <IconButton onClick={handleToggleDarkMode} color="inherit">
                    {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Tooltip>
        </Box>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, width: { xs:'100px', sm:'150px' }, height: { xs:'100px', sm:'150px' } }} variant="rounded" src="/src/assets/favicon-192x192.png">
          </Avatar>
          <Alert severity="error" sx={{ mt: 1, width: '100%', visibility: error == '' ? 'hidden' : 'visible' }}>{error}</Alert>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete='off'
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" defaultChecked/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ my: 3 }}
            >
              Log In
            </Button>
            <Grid container sx={{mt: 1, mb: 3}}>
              <Grid item>
                <Typography variant='div' sx={{mr: 1}}>Don&apos;t have an account?</Typography>
                <Link to="/register" variant="body2" style={{ color: theme.palette.secondary.main }}>
                    Register
                </Link>
              </Grid>
            </Grid>
            <FooterComponent />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login
  