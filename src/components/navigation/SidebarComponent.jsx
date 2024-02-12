import { Link, useLocation } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import PieChartIcon from '@mui/icons-material/PieChart';
const drawerWidth = 240;

const menuItems = [
  { key: 'dashboard', to: '/dashboard', icon: <DashboardIcon />, text: 'Dashboard' },
  { key: 'expenses', to: '/expenses', icon: <AttachMoneyIcon />, text: 'Expenses' },
  { key: 'categories', to: '/categories', icon: <CategoryIcon />, text: 'Categories' },
  { key: 'distributions', to: '/distributions', icon: <PieChartIcon />, text: 'Distributions' },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: {xs: 0, sm: `calc(${theme.spacing(8)} + 1px)`},
});

export const SidebarComponent = ({ open, onToggleDrawer }) => {
  const theme = useTheme();

  const location = useLocation();

  const isItemSelected = (path) => {
    return location.pathname === path;
  };

  return (
    <MuiDrawer
      variant="permanent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: {xs: 1, sm:0},
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open ? openedMixin(theme) : closedMixin(theme)),
        '& .MuiDrawer-paper': open ? openedMixin(theme) : closedMixin(theme),
      }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: theme.spacing(0, 1),
          ...theme.mixins.toolbar,
        }}
      >
        <IconButton onClick={onToggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <Tooltip title={item.text} key={item.key} arrow placement="right" disableHoverListener={open}>
            <ListItem key={item.key} disablePadding sx={{ display: 'block' }} onClick={open ? onToggleDrawer : null}>
              <Link to={item.to} style={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  selected={isItemSelected(item.to)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </MuiDrawer>
  );
};