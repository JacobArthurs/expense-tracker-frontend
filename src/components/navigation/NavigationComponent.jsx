import Box from '@mui/material/Box';

import { ToolbarComponent } from './ToolbarComponent';
import { SidebarComponent } from './SidebarComponent';
import { FooterComponent } from './FooterComponent';
import { useThemeManagment } from '../../hooks/useThemeManagement';
import { useState } from 'react';

const drawerWidth = 240;

export const NavigationComponent = ({ children }) => {
  const { darkMode, handleToggleDarkMode, theme } = useThemeManagment();
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => setOpen(!open);
  
  return (
    <Box sx={{ display: 'flex', flexDirection:'column' }}>
      <Box sx={{ display: 'flex' }}>
        <ToolbarComponent 
          open={open}
          onToggleDrawer={handleToggleDrawer}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          drawerWidth={drawerWidth}
        />
        <SidebarComponent 
          open={open}
          onToggleDrawer={handleToggleDrawer}
          drawerWidth={drawerWidth}
        />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}>
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'column',
              padding: theme.spacing(0, 1),
              ...theme.mixins.toolbar,
            }}
          />
            {children}
            <FooterComponent />
        </Box>
      </Box>
    </Box>  
  );
}