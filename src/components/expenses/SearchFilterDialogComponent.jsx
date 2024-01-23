import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Slider, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';

export const SearchFiltersDialogComponent = ({ open, onClose, onAmountChange, amountSliderValues, amountValueText }) => {

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Filter Expenses</DialogTitle>
                <DialogContent>
                    <Box sx={{ py:1, display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField 
                            fullWidth
                            id="searchText"
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
                            <DatePicker label="From" />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="To" />
                        </LocalizationProvider>
                        <Box sx={{ ml: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="p">
                                    Expense Amount
                                </Typography>
                                <Typography variant="p">
                                {amountValueText(amountSliderValues[0]) == amountValueText(amountSliderValues[1]) ?
                                  <>
                                    {amountValueText(amountSliderValues[1])}
                                  </>
                                :
                                  <>
                                    {amountValueText(amountSliderValues[0])} to {amountValueText(amountSliderValues[1])}
                                  </>
                                }
                                </Typography>
                            </Box>
                            <Box sx={{ mx: 1 }}>
                                <Slider
                                    color="secondary"
                                    getAriaLabel={() => 'Amount'}
                                    value={amountSliderValues}
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
                        <DialogActions>
                            <Button 
                                fullWidth
                                variant="contained"
                                onClick={onClose}
                            >
                                Search
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            ></Backdrop>
        </>
    );
};