import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router';
import { Button, Grid, TextField, Typography, Box, useTheme, Tooltip, IconButton, Alert } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { FooterComponent } from '../components/navigation/FooterComponent';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeManagment } from '../hooks/useThemeManagement';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const { darkMode, handleToggleDarkMode } = useThemeManagment();
    const [formData, setFormData] = React.useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const [error, setError] = React.useState('');

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
    };

    const validateFormData = () => {
        const errors = [];

        if (formData.username.trim() === '') {
          errors.push('Username is required');
        }

        if (formData.name.trim() === '') {
          errors.push('Name is required');
        }

        if (formData.email.trim() === '') {
          errors.push('Email is required');
        }

        if (formData.password.trim() === '') {
          errors.push('Password is required');
        }

        if (formData.confirmpassword.trim() === '') {
          errors.push('Password confirmation is required');
        }

        if (formData.confirmpassword.trim() !== '' &&
            formData.password.trim() !== '' &&
            formData.confirmpassword !== formData.password) {
          errors.push('Passwords do not match');
        }
      
        return errors;
      };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const validationErrors = validateFormData();

    if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        return;
    }

    try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const registerResponse = await axios.post(`${apiUrl}/api/authentication/register`, {
          userName: formData.username,
          password: formData.password,
          name: formData.name,
          email: formData.email
        });

        const registration = registerResponse.data;

        if (registration && registration.success) {
            const response = await axios.post(`${apiUrl}/api/authentication/login`, {
              userName: formData.username,
              password: formData.password,
            });

            const token = response.data;

            if (token) {
                setToken(token);
                navigate('/');
            }
        }
        else {
            setError(registration ? registration.message : 'An error has occured. Please try again; If the issue persists, contact support.');
        }
    } catch (error) {
        console.log(error);
        setError('An error has occured. Please double-check your input and try again.')
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
            my: 4,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h2" sx={{fontWeight: '500'}}>
            Register
          </Typography>
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
              id="name"
              label="Name"
              name="name"
              autoComplete='off'
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete='off'
              value={formData.email}
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmpassword"
              label="Confirm password"
              name="confirmpassword"
              type="password"
              value={formData.confirmpassword}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ my: 3 }}
            >
              Register
            </Button>
            <Grid container sx={{mt: 1, mb: 3}}>
            <Grid item>
                <Typography variant='div' sx={{mr: 1}}>Return to</Typography>
                <Link to="/login" variant="body2" style={{ color: theme.palette.secondary.main }}>
                    login
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

export default Register
  