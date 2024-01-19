import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeManagmentContext = createContext();

export const ThemeManagmentProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#F4A261',
      },
      secondary: {
        main: '#E76F51',
      },
    },
  });

  return (
    <ThemeManagmentContext.Provider value={{ darkMode, handleToggleDarkMode, theme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeManagmentContext.Provider>
  );
};

export const useThemeManagment = () => {
  return useContext(ThemeManagmentContext);
};