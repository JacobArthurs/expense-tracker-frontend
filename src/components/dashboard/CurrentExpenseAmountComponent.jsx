import React from 'react';
import axios from 'axios';
import { useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export const CurrentExpenseAmount = () => {
  const [totalAmount, setTotalAmount] = React.useState(null);
  const theme = useTheme();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const response = await axios.get(`${apiUrl}/api/expense/total-amount`);
        const data = response.data;

        if (data)
          setTotalAmount(response.data.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!totalAmount) {
    return (
        <Box sx={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' }}
        >
            <CircularProgress />
        </Box>
    );
  }

return (
    <>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Current Month&apos;s Expenses
        </Typography>
        <Typography component="p" variant="h4">
            {totalAmount}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
            Cumulative Expenses for {currentMonth}
        </Typography>
        <Link color="primary" to="/expenses" style={{ color: theme.palette.secondary.main }}>
          View expenses
        </Link>
  </>
);
};