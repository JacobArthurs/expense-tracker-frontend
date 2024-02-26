import { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { PasswordTextFieldComponent } from '../components/shared/PasswordTextFieldComponent';

const Register = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const { darkMode, handleToggleDarkMode } = useThemeManagment();
    const { handleSubmit, register, watch, formState: { errors } } = useForm({
      defaultValues: {
        userName: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    });
    const [error, setError] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    setError('');

    try {
        const { data: registration } = await axios.post(`${apiUrl}/authentication/register`, {
          userName: data.userName,
          password: data.password,
          name: data.name,
          email: data.email
        });

        if (registration && registration.success) {
            const response = await axios.post(`${apiUrl}/authentication/login`, {
              userName: data.userName,
              password: data.password,
            });

            const token = response.data;

            if (token) {
                setToken(token);
                navigate('/dashboard');
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

  const validateConfirmPassword = value => value === watch('password') || "Passwords don't match";

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
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }} noValidate autoComplete="off">
            <TextField 
              {...register('userName', { required: 'This field is required' })}
              label="Username"
              autoFocus
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />
            <TextField 
              {...register('name', { required: 'This field is required' })}
              label="Name"
              autoFocus
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField 
              {...register('email', { 
                required: 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }   
              })}
              label="Email"
              autoFocus
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <PasswordTextFieldComponent
              register={register}
              name="password"
              label="Password"
              rules={{ required: 'This field is required' }}
              error={errors.password}
            />
            <PasswordTextFieldComponent
              register={register}
              name="confirmPassword"
              label="Confirm Password"
              rules={{ required: 'This field is required' }}
              validate={{ validate: validateConfirmPassword }}
              error={errors.confirmPassword}
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
  