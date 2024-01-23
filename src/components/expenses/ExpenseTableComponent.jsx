import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export const ExpenseTableComponent = () => {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Category</TableCell>
                </TableRow>
            </TableHead>
          <TableBody>
            {/* {expenseData.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{new Date(expense.createdDate).toLocaleDateString('en-US')}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                <TableCell>{expense.category}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
    );
};