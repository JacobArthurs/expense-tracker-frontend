import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, ListItemIcon, Menu, MenuItem, useTheme } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';


const drawerWidth = 240;

export const ToolbarComponent = ({ open, onToggleDrawer, darkMode, onToggleDarkMode }) => {
  const { setToken } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setToken();
  }

  return (
    <AppBar
      position="fixed"
      sx={{
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
            width: `calc(${theme.spacing(7)} + 1px)`,
            [theme.breakpoints.up('sm')]: {
              width: `calc(${theme.spacing(8)} + 1px)`,
            },
          }}>
            <IconButton
              color="inherit"
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
        <Box  sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
          <Box width={48}></Box>
        <Link to="/" style={{ display: 'inline-block' }}>
          <img src="/src/assets/favicon-192x192.png" alt='Expense Tracker' style={{ display: 'block', width: '48px', height: '48px' }}/>
        </Link>
        <Box sx={{ display:'flex', justifyContent: 'center', width: 48 }}>
          <Tooltip title="Settings" arrow>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <SettingsIcon />
              </IconButton>
          </Tooltip>
        </Box>
        <Menu
          id="user-menu"
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