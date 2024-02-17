import { Alert, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
export const ManageCategoryDialogComponent = ({ selectedCategory, open, onClose, onOpenResultSnack, onResultSnackMessageChange, onResultSnackSeverityChange, apiUrl }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: ''
    }
  });

  useEffect(() => {
      if (!selectedCategory || !open) return;
      setLoading(true);
      axios.get(`${apiUrl}/api/category/${selectedCategory.id}`)
        .then(response => {
          const { title, description } = response.data;
          setValue('title', title);
          setValue('description', description);
        })
        .catch(error => {
          console.error(error);
          setError('Failed to load data');
        })
        .finally(() => setLoading(false));
  }, [apiUrl, setValue, selectedCategory, open]);

  const onSubmit = async (data) => {
      const endpoint = `${apiUrl}/api/category${selectedCategory ? `/${selectedCategory.id}` : ''}`;
      const method = selectedCategory ? 'put' : 'post';
      
      try {
        const { data : response } = await axios[method](endpoint, {
          ...data
        });
        handleClose();
        onOpenResultSnack();
        onResultSnackMessageChange(response.message);
        onResultSnackSeverityChange('success');
      } catch (error) {
        console.error(error);
        setError('There was an error processing your request. Please try again.');
      }
  };

  const handleClose = () => {
      onClose();
      reset();
      setError('');
  }

  if (selectedCategory && loading) {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {error ? <Alert severity="error">{error}</Alert> : (selectedCategory ? 'Edit Expense' : 'Create Expense')}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{display: 'flex', flexDirection:'column', gap: 2, pt:1}} noValidate autoComplete="off">
          <TextField 
            {...register('title', { required: 'This field is required' })}
            label="Title"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            {...register('description', { required: 'This field is required' })}
            label="Description"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              onClick={handleClose} 
              color="error" 
              variant="outlined"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              color="primary" 
              variant="contained" 
              sx={{ ml: 2 }}
            >
              {selectedCategory ? 'Edit' : 'Create'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}