import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment, InputLabel, MenuItem, Select, Slider, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import { DialogCloseButtonComponent } from "../shared/DialogCloseButtonComponent";
import { Controller } from "react-hook-form";
import { useMemo } from "react";

export const SearchFiltersDialogComponent = ({ categories, open, onClose, amountValueText, clearFilters, register, control }) => {
  const categoryMenuItems = useMemo(() => categories.map(category => (
    <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
  )), [categories]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogCloseButtonComponent onClose={onClose} />
        <DialogTitle>Filter Expenses</DialogTitle>
        <DialogContent>
          <Box sx={{ py:1, display: 'flex', flexDirection: 'column', gap: 2}}>
            <TextField 
              {...register('searchTerm')}
              label="Search"
              autoComplete='off'
              fullWidth
              InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                <SearchIcon />
                </InputAdornment>
              ),
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="From"
                    {...field}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(newValue) => field.onChange(newValue)}
                    value={field.value}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="To"
                    {...field}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(newValue) => field.onChange(newValue)}
                    value={field.value}
                  />
                )}
              />
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Category"
                  >
                    <MenuItem value="">None</MenuItem>
                    {categoryMenuItems}
                  </Select>
                )}
              />
            </FormControl>
            <Box sx={{ ml: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Expense Amount</Typography>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field: { value } }) => (
                  <Typography variant="body2">
                    {amountValueText(value[0])} {value[0] !== value[1] && `to ${amountValueText(value[1])}`}
                  </Typography>
                  )}
                />
              </Box>
              <Box sx={{ mx: 1 }}>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      color="secondary"
                      getAriaLabel={() => 'Amount'}
                      {...field}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      valueLabelDisplay="auto"
                      max={500}
                      step={5}
                      getAriaValueText={amountValueText}
                      valueLabelFormat={amountValueText}
                      disableSwap
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p:2 }}>
          <Button 
            fullWidth
            variant="outlined"
            color="error"
            onClick={clearFilters}
          >
            Clear
          </Button>
          <Button 
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClose}
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      ></Backdrop>
    </>
  );
};