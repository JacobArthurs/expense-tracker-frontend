import { Box, Checkbox, CircularProgress, IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import { TablePaginationActions } from "../shared/TablePaginationActionsComponent";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Controller } from "react-hook-form";
import { useCallback, useMemo } from "react";

export const ExpenseTableComponent = ({ data, totalRows, selectedRows, onSelectRow, onSelectAll, onEditExpense, isScreenXs, loading, control }) => {
  const rowsInView =  useMemo(() => data.map(exp => exp.id), [data]);
  const isRowSelected = useCallback((id) => selectedRows.includes(id), [selectedRows]);

  if (loading) {
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
  else if (!data.length) {
    return (
      <Box
        textAlign="center"
        p={4}
        sx={{ 
          width: '100%', 
          height: '100%'
        }}
      >
        <Typography variant="h5" color="textSecondary" mt={2}>
          No results found.
        </Typography>
        <ClearIcon sx={{ mt: 2, fontSize: 100 }}/>
        <Typography variant="body1" color="textSecondary" my={2}>
          Try searching with different filters or criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Table size="small" sx={{ tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Tooltip title={selectedRows.length > 0 && rowsInView.every(element => selectedRows.includes(element)) ? 'Deselect All in View' : 'Select All in View'} arrow>
              <Checkbox
                color="primary"
                indeterminate={selectedRows.length > 0 && !rowsInView.every(element => selectedRows.includes(element))}
                checked={selectedRows.length > 0 && rowsInView.every(element => selectedRows.includes(element))}
                onChange={() => onSelectAll(rowsInView)}
              />
            </Tooltip>
          </TableCell>
          <TableCell sx={{ width: {xs: '35%', sm: '30%'} }}>Title</TableCell>
          <TableCell width='20%'>Amount</TableCell>
          <TableCell sx={{ width: {xs: '30%', sm: '20%'} }}>Date</TableCell>
          <TableCell width='25%' sx={{ display: {xs: 'none', sm: 'table-cell'} }}>Category</TableCell>
          <TableCell sx={{ width: {xs: '15%', sm: '10%', md: '5%'} }}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((expense) => (
          <TableRow key={expense.id} selected={isRowSelected(expense.id)}>
            <TableCell padding="checkbox" onClick={() => onSelectRow(expense.id)}>
              <Checkbox
                color="primary"
                checked={isRowSelected(expense.id)}
              />
            </TableCell>
            <TableCell onClick={() => onSelectRow(expense.id)}>
              <Typography noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 14 }}>
                {expense.title}
              </Typography>
            </TableCell>
            <TableCell onClick={() => onSelectRow(expense.id)}>
              {expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </TableCell>
            <TableCell onClick={() => onSelectRow(expense.id)}>
              {new Date(expense.createdDate).toLocaleDateString('en-US')}
            </TableCell>
            <TableCell onClick={() => onSelectRow(expense.id)} sx={{ display: {xs: 'none', sm: 'table-cell'} }}>
              {expense.category}
            </TableCell>
            <TableCell onClick={() => onEditExpense(expense.id)}>
              <Tooltip title='Edit Expense' arrow>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <Controller
            name="page"
            control={control}
            render={({ field: { onChange: onChangePage, value: pageValue } }) => (
              <Controller
                name="limit"
                control={control}
                render={({ field: { onChange: onChangeLimit, value: limitValue } }) => (
                  <TablePagination
                    count={totalRows}
                    rowsPerPageOptions={isScreenXs ? [] : [5, 10, 20]}
                    page={pageValue}
                    rowsPerPage={limitValue}
                    onPageChange={(event, newPage) => onChangePage(newPage)}
                    onRowsPerPageChange={(event) => {
                      onChangeLimit(parseInt(event.target.value, 10));
                      onChangePage(0);
                    }}
                    ActionsComponent={TablePaginationActions}
                  />
                )}
              />
            )}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};