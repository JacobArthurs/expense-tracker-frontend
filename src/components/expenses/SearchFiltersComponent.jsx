import { Avatar, Box, Collapse, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, Slider, TextField, Tooltip, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Controller } from "react-hook-form";
import { useMemo } from "react";

export const SearchFiltersComponent = ({ categories, expandedFilters, onFilterToggle, amountValueText, clearFilters, register, control }) => {
  const categoryMenuItems = useMemo(() => categories.map(category => (
    <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
  )), [categories]);
  
  return (
    <Box component="form" noValidate autoComplete="off">
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Grid xs={10} sm={11} item>
          <TextField 
            {...register('searchTerm')}
            label="Search"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid xs={2} sm={1}  item sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title={expandedFilters ? 'Show Less Filters' : 'Show More Filters'} arrow placement="top">
            <IconButton aria-label="Expand" onClick={onFilterToggle}>
              <Avatar sx={{  bgcolor: 'primary.main', display: {xs: 'none', sm: 'flex'} }}>
                {expandedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Avatar>
              <Avatar sx={{  bgcolor: 'primary.main', display: {xs: 'flex', sm: 'none'} }}>
                <FilterListIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Grid>
      </Box>
      <Collapse in={expandedFilters} sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', display:'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
          <Grid xs={11} item sx={{ display:'flex', flexDirection: 'row', alignItems: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid xs={3} item sx={{ mr: 1 }}>
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
              </Grid>
              <Grid xs={3} item sx={{ mx: 1 }}>
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
              </Grid>
            </LocalizationProvider>
            <Grid xs={3} item sx={{ mx: 1 }}>
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
            </Grid>
            <Grid xs={3} item sx={{ ml: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Expense Amount</Typography>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field: { value } }) => (
                    <Typography variant="body1">
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
            </Grid>
          </Grid>
          <Grid xs={1} item sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <Tooltip title="Clear Filters" arrow placement="top">
              <IconButton aria-label="Clear Filters" color="error" sx={{ border: .5 }} onClick={clearFilters}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
};