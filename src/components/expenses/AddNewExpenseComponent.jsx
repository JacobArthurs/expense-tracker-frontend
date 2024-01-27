import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const AddNewExpenseComponent = () => {

    return (
        <Button variant="contained" color="success" endIcon={<AddIcon />}>Add New Expense</Button>
    );
};