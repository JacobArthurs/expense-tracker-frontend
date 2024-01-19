import * as React from 'react';
import Box from '@mui/material/Box';

import { ToolbarComponent } from '../components/ToolbarComponent';
import { SidebarComponent } from '../components/SidebarComponent';
import { FooterComponent } from '../components/FooterComponent';
import { useThemeManagment } from '../providers/ThemeManagmentProvider';

export const NavigationComponent = ({ children }) => {
    const { darkMode, handleToggleDarkMode, theme } = useThemeManagment();
    const [open, setOpen] = React.useState(false);
    const handleToggleDrawer = () => {
      setOpen(!open);
    };
  
    return (
        <Box sx={{ display: 'flex', flexDirection:'column' }}>
            <Box sx={{ display: 'flex' }}>
              <ToolbarComponent open={open} onToggleDrawer={handleToggleDrawer} darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
              <SidebarComponent open={open} onToggleDrawer={handleToggleDrawer} />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Box
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: theme.spacing(0, 1),
                    ...theme.mixins.toolbar,
                  }}
                />
                  {children}
              </Box>
            </Box>
            <FooterComponent />
        </Box>  
    );
}