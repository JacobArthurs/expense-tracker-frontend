import { Box, Checkbox, CircularProgress, IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import { TablePaginationActions } from "../shared/TablePaginationActionsComponent";
import EditIcon from '@mui/icons-material/Edit';

export const ExpenseTableComponent = ({ data, totalRows, page, onChangePage, rowsPerPage, onChangeRowsPerPage, selectedRows, onSelectRow, onSelectAll, onEditExpense }) => {
    const rowsInView = data.map(exp => exp.id);
    
    function isRowSelected(id) {
      const index = selectedRows.indexOf(id);
      return index !== -1;
    }

    if (!data.length) {
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
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Tooltip title={selectedRows.length > 0 && rowsInView.every(element => selectedRows.includes(element)) ? 'Deselect All in View' : 'Select All in View'} arrow>
                            <Checkbox color="primary"
                                indeterminate={selectedRows.length > 0 && !rowsInView.every(element => selectedRows.includes(element))}
                                checked={selectedRows.length > 0 && rowsInView.every(element => selectedRows.includes(element))}
                                onChange={() => onSelectAll(rowsInView)}
                                inputProps={{
                                  'aria-labelledby': '',
                                }} 
                            />
                        </Tooltip>
                    </TableCell>
                    <TableCell width='25%'>Title</TableCell>
                    <TableCell width='20%'>Amount</TableCell>
                    <TableCell width='20%'>Date</TableCell>
                    <TableCell width='25%'>Category</TableCell>
                    <TableCell width='5%'></TableCell>
                </TableRow>
            </TableHead>
          <TableBody>
            {data.map((expense) => (
              <TableRow key={expense.id} selected={isRowSelected(expense.id)}>
                <TableCell padding="checkbox" onClick={() => onSelectRow(expense.id)}>
                    <Checkbox 
                        color="primary"
                        checked={isRowSelected(expense.id)}
                        inputProps={{
                          'aria-labelledby': 'Select Expense',
                        }} 
                    />
                </TableCell>
                <TableCell onClick={() => onSelectRow(expense.id)}>{expense.title}</TableCell>
                <TableCell onClick={() => onSelectRow(expense.id)}>{expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                <TableCell onClick={() => onSelectRow(expense.id)}>{new Date(expense.createdDate).toLocaleDateString('en-US')}</TableCell>
                <TableCell onClick={() => onSelectRow(expense.id)}>{expense.category}</TableCell>
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              count={totalRows}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                }
              }}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
    );
};