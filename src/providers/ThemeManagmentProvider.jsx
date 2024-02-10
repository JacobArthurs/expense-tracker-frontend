import { createContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeManagmentContext = createContext();

const ThemeManagmentProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem("mode")) {
      setDarkMode(localStorage.getItem("mode") === 'dark')
    }
  },[])

  const handleToggleDarkMode = () => {
    localStorage.setItem("mode", !darkMode ? 'dark' : 'light' )
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#6369D1',
      },
      secondary: {
        main: '#60E1E0',
      },
    },
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  });

  return (
    <ThemeManagmentContext.Provider value={{ darkMode, handleToggleDarkMode, theme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeManagmentContext.Provider>
  );
};

export default ThemeManagmentProvider;