import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import { AppRoutes } from './routes/AppRoutes';
import ThemeManagmentProvider from './providers/ThemeManagmentProvider';
import { CssBaseline } from '@mui/material';

export default function App() {
  return (
    <ThemeManagmentProvider>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeManagmentProvider>
  );
}