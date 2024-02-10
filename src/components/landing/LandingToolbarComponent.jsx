import { AppBar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeManagment } from "../../hooks/useThemeManagement";
import { useTheme } from "@emotion/react";

export const LandingToolbarComponent = () => {
    const { darkMode, handleToggleDarkMode } = useThemeManagment();
    const theme = useTheme();

    return (
        <AppBar position="fixed" sx={{ bgcolor: darkMode ? null : theme.palette.common.white}}>
            <Toolbar>
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <img src="/src/assets/favicon-192x192.png" alt='Expense Tracker' style={{ display: 'block', width: '48px', height: '48px' }}/>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap:2}}>
                        <Button
                            component={Link}
                            to="/login"
                            variant="contained"
                            sx={{ borderRadius: 8, width: '95px', height: '35px'}}>
                            <Typography variant="body1">Login</Typography>
                        </Button>
                        <Button
                            component={Link}
                            to="/register"
                            variant="outlined"
                            sx={{ borderRadius: 8, width: '95px',  height: '35px', display: {xs: 'none', md: 'block'}}}>
                            <Typography variant="body1">Register</Typography>
                        </Button>
                        <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
                            <IconButton onClick={handleToggleDarkMode}>
                                {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}