import { Alert, Backdrop, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const CategoryReassignDialogComponent = ({ open, onClose, categories, selectedCategory, onOpenResultSnack, onResultSnackMessageChange, onResultSnackSeverityChange, apiUrl }) => {
  const [error, setError] = useState('');
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      destinationCategory: ''
    }
  });
  const categoryMenuItems = useMemo(() => categories.map(category => (
    <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
  )), [categories]);

  const onSubmit = async (data) => {
    setError('');
  
    try {
      const { data : responseData } = await axios.put(`${apiUrl}/api/expense/category-reassign`, {
        oldCategoryId: selectedCategory.id,
        newCategoryId: data.destinationCategory,
      });
  
      if (responseData.success) {
        handleClose();
        onOpenResultSnack();
        onResultSnackMessageChange(responseData.message);
        onResultSnackSeverityChange('success');
      } else {
        setError(responseData.message);
      }
    } catch (error) {
        setError('There was an error processing your request. Please try again.');
        console.error(error);
    }
  };

  const handleClose = () => {
      onClose();
      reset();
      setError('');
  }

  if (!categories.length || !selectedCategory) {
    return (
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

    return (
      <>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>
            Reassign Expenses to New Category
          </DialogTitle>
          <DialogContent sx={{ py: 1 }}>
            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
            <Typography py={2}>
              All expenses currently associated with the &quot;{selectedCategory.title}&quot; category will be moved to 
              the category you select below. This action is irreversible.
            </Typography>
            <Typography pb={1}>Select Destination Category:</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
              <FormControl error={Boolean(errors.destinationCategory)} fullWidth>
                <InputLabel>Category</InputLabel>
                <Controller
                  name="destinationCategory"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <Select {...field} label="Category">
                      {categoryMenuItems}
                    </Select>
                  )}
                />
                {errors.destinationCategory && <FormHelperText>{errors.destinationCategory.message}</FormHelperText>}
              </FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  onClick={handleClose}
                  sx={{ width: 'auto', mr: 1 }}
                  variant="outlined"
                  color="error"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  sx={{ width: 'auto' }}
                  variant="contained"
                  color="primary"
                >
                  Reassign
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        />
      </>
    );
}