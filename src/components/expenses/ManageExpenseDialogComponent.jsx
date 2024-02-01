import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { NumericFormat } from "react-number-format";


export const ManageExpenseDialogComponent = ({ id, categories, open, onClose, onOpenResultSnack, onResultSnackMessageChange, onResultSnackSeverityChange }) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        amount: null,
        category: null
    });
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${apiUrl}/api/expense/${id}`);  
      
            const data = response.data;
            if (data) {
                setLoading(false);
                setFormData({
                    title: data.title,
                    description: data.description,
                    amount: data.amount,
                    category: data.categoryId
                })
            }
          } catch (error) {
            console.log(error);
          }
        };

        if (id) {
          fetchData();
        }
    }, [apiUrl, id]);

    const updateExpense = async () => {
        try {
            const response = await axios.put(`${apiUrl}/api/expense/${id}`, {
                categoryId: formData.category,
                title: formData.title,
                description: formData.description,
                amount: formData.amount
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

    const createExpense = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/expense`, {
                categoryId: formData.category,
                title: formData.title,
                description: formData.description,
                amount: formData.amount
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

    const validateForm = () => {
        setError('');
        const validationErrors = [];

        if (formData.title.trim() === '') {
          validationErrors.push('Title is required');
        }

        if (formData.description.trim() === '') {
          validationErrors.push('Description is required');
        }

        if (!formData.amount || formData.amount === 0) {
            validationErrors.push('Amount is required');
        }

        if (!formData.category || formData.category === 0) {
            validationErrors.push('Category is required');
        }

        if (validationErrors.length > 0) {
          setError(validationErrors.join(', '));
        }
    }

    const onSubmit = () => {
        validateForm();

        if (error) {
            return;
        }

        if (id) {
            updateExpense();
        }
        else {
            createExpense();
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = name === 'amount' ? 
            parseFloat(event.target.value.replace("$", "")) : 
            event.target.value;

        setFormData({
            ...formData,
            [name]: value,
          });
    };

    const handleClose = () => {
        onClose();
        setFormData({
            title: '',
            description: '',
            amount: null,
            category: null
        })
    }

    if ((id && loading) || !categories) {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        );
      }


    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>
                <Box sx={{display: error == '' ? 'flex' : 'none' }}>{id ? 'Edit Expense' : 'Create Expense'}</Box>
                <Alert severity="error" sx={{ width: '100%', display: error == '' ? 'none' : 'flex' }}>{error}</Alert>
            </DialogTitle>
            <DialogContent>
                <Box component="form" sx={{display: 'flex', flexDirection:'column', gap: 2, pt:1}}>
                    <TextField 
                        value={formData.title}
                        onChange={handleChange}
                        label="Title"
                        name="title"
                        autoComplete='off'
                        required
                    />
                    <TextField
                        value={formData.description}
                        onChange={handleChange}
                        label="Description"
                        name="description"
                        autoComplete='off'
                        required
                    />
                    <NumericFormat
                        value={formData.amount}
                        onChange={handleChange}
                        label="Amount"
                        name="amount"
                        required
                        customInput={TextField}
                        prefix="$"
                        decimalScale={2}
                        thousandSeparator
                    />
                    <FormControl fullWidth required>
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={formData.category}
                          onChange={handleChange}
                          label="Category"
                          name="category"

                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions sx={{ pb: 1 }}>
                <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
                <Button onClick={onSubmit} color="primary" variant="contained" sx={{ mr: 2 }}>{id ? 'Edit' : 'Create'}</Button>
            </DialogActions>
        </Dialog>
    );
};