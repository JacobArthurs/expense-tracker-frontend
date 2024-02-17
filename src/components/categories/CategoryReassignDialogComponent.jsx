import { Alert, Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

export const CategoryReassignDialogComponent = ({ open, onClose, categories, selectedCategory, onOpenResultSnack, onResultSnackMessageChange, onResultSnackSeverityChange }) => {
    const [destinationCategory, setDestinationCategory] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = async () => {
        setError('');

        if (!destinationCategory || destinationCategory === '') {
            setError('Destination category is required');
            return;
        }
    
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.put(`${apiUrl}/api/expense/category-reassign`, {
                oldCategoryId: selectedCategory.id,
                newCategoryId: destinationCategory,
            });
    
            const data = response.data;     
            if (data) {
                if (data.success) {
                    onClose();
                    onOpenResultSnack();
                    onResultSnackMessageChange(data.message);
                    onResultSnackSeverityChange('success');
                }
                else {
                    setError(data.message);
                }
            }
        } catch (error) {
            setError('There was an error processing your request. Please try again.');
            console.log(error);
        }
      };

    const handleChange = (event) => {
        setDestinationCategory(event.target.value);
    };

    const handleClose = () => {
        onClose();
        setDestinationCategory('');
        setError('');
    }

    if (!categories.length || !selectedCategory) {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>
                    <Box sx={{display: error == '' ? 'flex' : 'none' }}>Reassign Expenses to New Category</Box>
                    <Alert severity="error" sx={{ width: '100%', display: error == '' ? 'none' : 'flex' }}>{error}</Alert>
                </DialogTitle>
                <DialogContent sx={{ py:1, display: 'flex', flexDirection: 'column'}}>
                    <Typography py={2}>
                        All expenses currently associated with the &quot;{selectedCategory.title}&quot; category will be moved to 
                        the category you select below. This action is irreversible.
                    </Typography>
                    <Typography pb={1}>Select Destination Category:</Typography>
                    <FormControl fullWidth required>
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={destinationCategory}
                          onChange={handleChange}
                          label="Category"
                          name="category"

                        >
                            {categories.filter(x => x.id !== selectedCategory.id).map((category) => (
                                <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ py:2, px:3, gap: 4}}>
                    <Button 
                        fullWidth
                        variant="outlined"
                        color="error"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Reassign
                    </Button>
                </DialogActions>
            </Dialog>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            ></Backdrop>
        </>
    );
}