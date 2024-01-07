import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Expenses from './pages/Expenses';
import Distributions from './pages/Distributions';
import { ToolbarComponent } from './components/ToolbarComponent';
import { SidebarComponent } from './components/SidebarComponent';

export default function App() {
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const theme = useTheme();

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ToolbarComponent open={open} onToggleDrawer={handleToggleDrawer} />
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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/distributions" element={<Distributions />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}