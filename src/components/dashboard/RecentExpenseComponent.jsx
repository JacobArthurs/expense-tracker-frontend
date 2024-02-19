import { useState } from 'react';
import axios from 'axios';
import { useEffect } from "react";
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export const RecentExpenseComponent = () => {
  const [expenseData, setExpenseData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.post(`${apiUrl}/api/expense/search`, {
          limit: 5
        });

        const data = response.data;

        if (data)
          setExpenseData(response.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!expenseData) {
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
            Recent Expenses
        </Typography>
        <Table size="small" sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ display: {xs: 'none', sm: 'table-cell'} }}>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell sx={{ display: {xs: 'none', sm: 'table-cell'} }}>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseData.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell sx={{ display: {xs: 'none', sm: 'table-cell'} }}>{new Date(expense.createdDate).toLocaleDateString('en-US')}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                <TableCell sx={{ display: {xs: 'none', sm: 'table-cell'} }}>{expense.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" to="/expenses" style={{ color: theme.palette.secondary.main, marginTop: '24px'}}>
          See more expenses
        </Link>
    </>
);
};