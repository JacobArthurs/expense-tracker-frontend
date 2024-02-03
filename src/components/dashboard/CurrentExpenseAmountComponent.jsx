import React from 'react';
import axios from 'axios';
import { useEffect } from "react";
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import dayjs from 'dayjs';

export const CurrentExpenseAmount = () => {
  const [totalAmount, setTotalAmount] = React.useState(null);
  const [difference, setDifference] = React.useState(null);
  const theme = useTheme();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear();
  const currentMonthStart = dayjs().startOf('month').startOf('day');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const responseCurrent = await axios.post(`${apiUrl}/api/expense/total-amount`, {
          month: currentMonthStart
        });
        const currentTotal = responseCurrent.data;

        const responsePreviousMonth = await axios.post(`${apiUrl}/api/expense/total-amount`, {
          month: dayjs(currentMonthStart).subtract(1, 'month')
        });
        const previousMonthTotal = responsePreviousMonth.data;

        setTotalAmount(currentTotal);
        if (previousMonthTotal) {
          setDifference(Math.round(((currentTotal - previousMonthTotal) / previousMonthTotal) * 100))
        }
      } catch (error) { /* empty */ }
    };

    fetchData();
  }, [currentMonthStart]);

  if (totalAmount == null) {
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
            {totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Typography>
        <Typography color="text.secondary">
            Cumulative Expenses for {currentMonth}
        </Typography>
        <Box color={difference >= 0 ? 'success.main' : 'error.main'} sx={{ display: 'flex', flex: 1 }}>
          {difference}% vs. Last Month
          <TrendingDownIcon sx={{ display: difference >= 0 ? 'none' : 'block', ml: .5 }}/>
          <TrendingUpIcon sx={{ display: difference >= 0 ? 'block' : 'none', ml: .5}}/>
        </Box>
        <Link color="primary" to={`/expenses/${dayjs().format('YYYY-MM-01')}`} style={{ color: theme.palette.secondary.main }}>
          View Current Month&apos;s Expenses
        </Link>
  </>
);
};