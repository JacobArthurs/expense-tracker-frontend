import { createContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ThemeManagmentContext = createContext();

const ThemeManagmentProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const handleToggleDarkMode = () => {
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