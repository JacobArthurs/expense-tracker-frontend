import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Box, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';


export const ManageExpenseDialogComponent = ({ id, categories, open, onClose, onOpenResultSnack, onResultSnackMessageChange, onResultSnackSeverityChange }) => {
  const categoryMenuItems = useMemo(() => categories.map(category => (
    <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
  )), [categories]);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, setValue, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      amount: null,
      category: ''
    }
  });
  
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`${apiUrl}/api/expense/${id}`)
      .then(response => {
        const { title, description, amount, categoryId } = response.data;
        setValue('title', title);
        setValue('description', description);
        setValue('amount', amount);
        setValue('category', categoryId);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load data');
      })
      .finally(() => setLoading(false));
  }, [id, apiUrl, setValue]);

  const onSubmit = async (data) => {
    const endpoint = `${apiUrl}/api/expense${id ? `/${id}` : ''}`;
    const method = id ? 'put' : 'post';
    
    try {
      const response = await axios[method](endpoint, {
        ...data,
        categoryId: data.category,
      });
      onClose();
      onOpenResultSnack();
      onResultSnackMessageChange(response.data.message);
      onResultSnackSeverityChange('success');
    } catch (error) {
      console.error(error);
      setError('There was an error processing your request. Please try again.');
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

    if (loading) {
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
          {error ? <Alert severity="error">{error}</Alert> : (id ? 'Edit Expense' : 'Create Expense')}
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
            <Controller
              name="amount"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  ref={null}
                  label="Amount"
                  customInput={TextField}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  prefix="$"
                  decimalScale={2}
                  thousandSeparator
                  onValueChange={(values) => {
                    field.onChange(values.value);
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                />
              )}
            />
            <FormControl error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Category"
                  >
                    {categoryMenuItems}
                  </Select>
                )}
              />
              {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
            </FormControl>
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
                {id ? 'Edit' : 'Create'}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    );
};