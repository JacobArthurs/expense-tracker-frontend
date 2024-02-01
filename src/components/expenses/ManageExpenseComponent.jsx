import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const ManageExpenseComponent = ({selectedRows, onDelete, onNewExpense}) => {
    return (
        <Grid container sx={{ backgroundColor:(t) => selectedRows.length ? t.palette.primary.main : '', py:1, borderRadius: 1, display: 'flex', minHeight: 56}}>
            <Grid item xs={10} sm={11} sx={{display: selectedRows.length ? 'flex' : 'none', alignItems: 'center'}}>
                <Typography variant="subtitle1" sx={{ ml: 2, fontWeight: 'medium' }}>
                    {selectedRows.length} Expense{selectedRows.length > 1 ? 's' : ''} Selected
                </Typography>
            </Grid>
            <Grid item xs={2} sm={1} sx={{ display: selectedRows.length ? 'flex' : 'none', justifyContent: 'center' }}>
                <Tooltip title="Delete Selected Expenses" arrow>
                    <IconButton onClick={() => onDelete()}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={12} sx={{ display: selectedRows.length ? 'none' : 'flex'}}>
                <Button 
                    variant="contained" 
                    color="success"
                    onClick={() => onNewExpense()}
                    endIcon={<AddIcon />} 
                    sx={{ width: {xs: '100%', sm: 'fit-content'} }}
                >
                    New Expense
                </Button>
            </Grid>
        </Grid>
    );
};