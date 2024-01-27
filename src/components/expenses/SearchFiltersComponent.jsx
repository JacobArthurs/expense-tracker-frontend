import { Avatar, Box, Collapse, Grid, IconButton, InputAdornment, Slider, TextField, Tooltip, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';

export const SearchFiltersComponent = ({ expandedFilters, onFilterToggle, onSearchTermChange, searchTerm, onAmountChange, amountValues, amountValueText, onStartDateChange, startDate, onEndDateChange, endDate, clearFilters }) => {
    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Grid xs={10} sm={11} item>
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
                        <Grid xs={3} item sx={{ mr: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="From" onChange={onStartDateChange} sx={{ width: '100%' }} value={startDate} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid xs={3} item sx={{ mx: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="To" onChange={onEndDateChange} sx={{ width: '100%' }} value={endDate} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid xs={6} item sx={{ ml: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
        </>
    );
};