import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Categories from '../pages/Categories';
import Expenses from '../pages/Expenses';
import Distributions from '../pages/Distributions';
import NotFound from '../pages/NotFound'
import Login from '../pages/Login';
import Register from '../pages/Register';
import { NavigationComponent } from '../components/NavigationComponent';

export const AppRoutes = () => {
  const authenticatedRoutes = [
    { path: "/", element: <Dashboard /> },
    { path: "/categories", element: <Categories /> },
    { path: "/expenses", element: <Expenses /> },
    { path: "/distributions", element: <Distributions /> },
    { path: "/404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" />},
  ];
  
  const notAuthenticatedRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ];
  
  return (
    <Routes>
      {authenticatedRoutes.map((route) => (
        <Route 
          key={route.path} 
          path={route.path} 
          element={
            <ProtectedRoute>
              <NavigationComponent>
                {route.element}
              </NavigationComponent>
            </ProtectedRoute>
            } 
        />
      ))}
      {notAuthenticatedRoutes.map((route) => (
        <Route 
          key={route.path} 
          path={route.path} 
          element={route.element} 
        />
      ))}
    </Routes>
  );
};
