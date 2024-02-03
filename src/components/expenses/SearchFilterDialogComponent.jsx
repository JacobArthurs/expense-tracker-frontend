import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment, InputLabel, MenuItem, Select, Slider, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import { DialogCloseButtonComponent } from "../shared/DialogCloseButtonComponent";

export const SearchFiltersDialogComponent = ({ categories, open, onClose, onSearchTermChange, searchTerm, onAmountChange, amountValues, amountValueText, onStartDateChange, startDate, onEndDateChange, endDate, searchCategory, onSearchCategoryChange, clearFilters }) => {

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogCloseButtonComponent onClose={onClose} />
                <DialogTitle>Filter Expenses</DialogTitle>
                <DialogContent>
                    <Box sx={{ py:1, display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField 
                            fullWidth
                            id="searchText"
                            value={searchTerm}
                            onChange={onSearchTermChange}
                            label="Search"
                            name="serachText"
                            autoComplete='off'
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <SearchIcon />
                                  </InputAdornment>
                                ),
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="From" onChange={onStartDateChange} value={startDate}/>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="To" onChange={onEndDateChange} value={endDate}/>
                        </LocalizationProvider>
                        <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={searchCategory}
                                    onChange={onSearchCategoryChange}
                                    label="Category"
                                    name="category"

                                >
                                    <MenuItem value="">None</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        <Box sx={{ ml: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="p">
                                    Expense Amount
                                </Typography>
                                <Typography variant="p">
                                {amountValueText(amountValues[0]) == amountValueText(amountValues[1]) ?
                                  <>
                                    {amountValueText(amountValues[1])}
                                  </>
                                :
                                  <>
                                    {amountValueText(amountValues[0])} to {amountValueText(amountValues[1])}
                                  </>
                                }
                                </Typography>
                            </Box>
                            <Box sx={{ mx: 1 }}>
                                <Slider
                                    color="secondary"
                                    getAriaLabel={() => 'Amount'}
                                    value={amountValues}
                                    onChange={onAmountChange}
                                    valueLabelDisplay="auto"
                                    max={500}
                                    step={5}
                                    getAriaValueText={amountValueText}
                                    valueLabelFormat={amountValueText}
                                    disableSwap
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