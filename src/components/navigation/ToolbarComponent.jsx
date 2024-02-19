import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, ListItemIcon, Menu, MenuItem, useTheme } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

export const ToolbarComponent = ({ open, onToggleDrawer, darkMode, onToggleDarkMode, drawerWidth }) => {
  const { setToken } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    navigate('/');
    setToken();
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: darkMode ? null : 'white',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) => theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        })
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
        disableGutters
      >
        <Box 
          sx={{
            display: open ? 'none' : 'flex',
            justifyContent: 'center',
            width: {xs: `calc(${theme.spacing(7)} + 1px)`, sm: `calc(${theme.spacing(8)} + 1px)`},
          }}>
            <IconButton
              aria-label="open drawer"
              onClick={onToggleDrawer}
              edge="start"
              sx={{
                ml: 0
              }}
            >
              <MenuIcon />
            </IconButton>
        </Box>
        <Box  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}>
          <Box sx={{ width: {xs: 0, sm: 48}, ml: {xs: 0, sm: 1} }}></Box>
          <Link to="/dashboard" style={{ display: 'inline-block' }}>
            <img src="/src/assets/favicon-192x192.png" alt='Expense Tracker' style={{ display: 'block', width: '48px', height: '48px' }}/>
          </Link>
          <Box sx={{ display:'flex', justifyContent: 'center', width: 48, height: 'fit-content', mr:1 }}>
            <Tooltip title="Settings" arrow>
                <IconButton onClick={handleMenuOpen}>
                  <SettingsIcon />
                </IconButton>
            </Tooltip>
          </Box>
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
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
};