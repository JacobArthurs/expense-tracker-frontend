import axios from 'axios';

import { useNavigate } from 'react-router';
import { Avatar, Button, FormControlLabel, Grid, TextField, Typography, Box, Checkbox, useTheme, Tooltip, IconButton, Alert } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { FooterComponent } from '../components/navigation/FooterComponent';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeManagment } from '../hooks/useThemeManagement';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { PasswordTextFieldComponent } from '../components/shared/PasswordTextFieldComponent';
import { useState } from 'react';
import icon from "../assets/favicon-192x192.png"
import money from "../assets/money.jpg"

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const { darkMode, handleToggleDarkMode } = useThemeManagment();
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      userName: '',
      password: ''
    }
  });
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    setError('');
    try {
      const { data: token } = await axios.post(`${apiUrl}/authentication/login`, {
        userName: data.userName,
        password: data.password,
      });

      if (token) {
          setToken(token);
          setTimeout(() => {
              navigate('/dashboard');
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
          backgroundImage:  `url(${money})`,
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
          <Avatar 
            sx={{ 
              m: 1, 
              width: { xs:'100px', sm:'150px' }, 
              height: { xs:'100px', sm:'150px' } 
            }} 
            variant="rounded" 
            src={icon}
          />
          <Alert severity="error" sx={{ mt: 1, width: '100%', visibility: error == '' ? 'hidden' : 'visible' }}>{error}</Alert>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }} noValidate autoComplete='off'>
            <TextField 
              {...register('userName', { required: 'This field is required' })}
              label="Username"
              autoFocus
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />
            <PasswordTextFieldComponent
              register={register}
              name="password"
              label="Password"
              rules={{ required: 'This field is required' }}
              error={errors.password}
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
            <Box sx={{mt: 1, mb: 3}}>
              <Typography variant='div' sx={{mr: 1}}>Don&apos;t have an account?</Typography>
              <Link to="/register" variant="body2" style={{ color: theme.palette.secondary.main }}>
                Register
              </Link>
            </Box>
            <FooterComponent />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login
  