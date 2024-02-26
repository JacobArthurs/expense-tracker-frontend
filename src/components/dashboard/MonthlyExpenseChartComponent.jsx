import { useState } from 'react';
import axios from 'axios';
import { LineChart } from "@mui/x-charts";
import { useEffect } from "react";
import { CircularProgress, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';

export const MonthlyExpenseChartComponent = () => {
  const [chartData, setChartData] = useState({ xAxis: [], yAxis: [] });
  const theme = useTheme();
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/expense/monthly-metric`);
        const data = response.data;

        if (data) {
          setChartData({ xAxis: data.months, yAxis: data.amounts });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!chartData.xAxis.length || !chartData.yAxis.length) {
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
            Annual Expense Overview
        </Typography>
        <Box sx={{
            width: '100%',
            flexGrow: 1,
            overflow: 'hidden' }}
        >
            <LineChart
              margin={{ top: 10, bottom: 30, right: 0}}
              series={[{ data: chartData.yAxis, valueFormatter: currencyFormatter }]}
              xAxis={[{ data: chartData.xAxis, scaleType: 'band' }]}
              yAxis={[{
                tickLabelStyle: theme.typography.body2,
                max: Math.max(...chartData.yAxis),
              }]}
            />
        </Box>
  </>
);
};