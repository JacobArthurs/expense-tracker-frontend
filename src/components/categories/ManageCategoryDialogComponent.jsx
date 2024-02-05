import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
export const ManageCategoryDialogComponent = ({ selectedCategory, open, onClose, onOpenResultSnack, onResultSnackMessageChange, onResultSnackSeverityChange }) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [formData, setFormData] = React.useState({
        title: '',
        description: ''
    });
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${apiUrl}/api/category/${selectedCategory.id}`);  
      
            const data = response.data;
            if (data) {
                setLoading(false);
                setFormData({
                    title: data.title,
                    description: data.description
                })
            }
          } catch (error) {
            console.log(error);
          }
        };

        if (open && selectedCategory) {
            fetchData();
        }
    }, [apiUrl, open, selectedCategory]);

    const updateCategory = async () => {
        try {
            const response = await axios.put(`${apiUrl}/api/category/${selectedCategory.id}`, {
                title: formData.title,
                description: formData.description
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

    const createCategory = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/category`, {
                title: formData.title,
                description: formData.description
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

        if (validationErrors.length > 0) {
          setError(validationErrors.join(', '));
        }
    }

    const onSubmit = () => {
        validateForm();

        if (error) {
            return;
        }

        if (selectedCategory) {
            updateCategory();
        }
        else {
            createCategory();
        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
    };

    const handleClose = () => {
        onClose();
        setFormData({
            title: '',
            description: ''
        })
    }

    if ((selectedCategory && loading)) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>
                <Box sx={{display: error == '' ? 'flex' : 'none' }}>{selectedCategory ? 'Edit Category' : 'Create Category'}</Box>
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
                </Box>
            </DialogContent>
            <DialogActions sx={{ pb: 2 }}>
                <Button onClick={handleClose} color="error" variant="outlined">Cancel</Button>
                <Button onClick={onSubmit} color="primary" variant="contained" sx={{ mr: 2 }}>{selectedCategory ? 'Edit' : 'Create'}</Button>
            </DialogActions>
        </Dialog>
    );
}