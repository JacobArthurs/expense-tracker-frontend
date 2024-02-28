import { AppBar, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import icon from "../../assets/favicon-192x192.png"

export const LandingToolbarComponent = ({ darkMode, onToggleDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);


  return (
    <AppBar position="fixed" sx={{ bgcolor: darkMode ? null : 'white'}}>
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box
            component="img"
            alt='Expense Tracker'
            src={icon}
            sx={{
                width: '48px',
                height: '48px'
            }} 
          />
          <Box sx={{ display: {xs: 'none', md: 'flex' }, alignItems: 'center', gap:2}}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{ width: '95px', height: '35px'}}>
              <Typography variant="body1">Login</Typography>
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              sx={{ width: '95px',  height: '35px', display: {xs: 'none', md: 'block'}}}>
              <Typography variant="body1">Register</Typography>
            </Button>
            <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
              <IconButton onClick={onToggleDarkMode}>
                {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="Settings" arrow>
            <IconButton onClick={handleMenuOpen} sx={{ display: {xs: 'flex', md: 'none' } }}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={onToggleDarkMode}>
              <ListItemIcon>
                {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              </ListItemIcon>
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </MenuItem>
            <MenuItem component={Link} to="/login">
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              Login
            </MenuItem>
            <MenuItem component={Link} to="/register">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              Register
            </MenuItem>
          </Menu>
        </Container>
      </Toolbar>
    </AppBar>
  );
}