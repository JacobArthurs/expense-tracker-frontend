import React from "react";
import { Avatar, Box, Button, Collapse, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, Slider, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';


const Expenses = () => {
    const [amountSliderValues, setAmountSliderValues] = React.useState([0, 500]);
    const [expandedFilters, setExpandedFilers] = React.useState(false);
    const [openFilterDialog, setOpenFilterDialog] = React.useState(false);
    const isScreenXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    function amountValueText(value) {
        return value >= 500 ? `$${value}+` : `$${value}`;
    }

    const handleAmountChange = (event, newValue) => {
        if (!Array.isArray(newValue))
            return;

        setAmountSliderValues([newValue[0], newValue[1]])
    };

    const handleFilterToggle = () => {
        if (isScreenXs)
        handleOpenFilterDialog();
        else
            setExpandedFilers(!expandedFilters);
    }

    const handleOpenFilterDialog = () => {
        setOpenFilterDialog(true);
    }
  
    const handleCloseFilterDialog = () => {
        setOpenFilterDialog(false);
    }

    return (
        <Box sx={{display: 'flex'}}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Grid xs={11} item sx={{ mr: {xs: 2, sm: 0} }}>
                            <TextField 
                                fullWidth
                                id="searchText"
                                label="Search"
                                name="serachText"
                                autoComplete='off'
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <SearchIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                        </Grid>
                        <Grid xs={1} item sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                            <Tooltip title={expandedFilters ? 'Show Less Filters' : 'Show More Filters'} arrow placement="top">
                                <IconButton aria-label="Expand" onClick={handleFilterToggle}>
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
                                        <DatePicker label="From" sx={{ width: '100%' }} />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid xs={3} item sx={{ mx: 1 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="To" sx={{ width: '100%' }} />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid xs={6} item sx={{ ml: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                                            onChange={handleAmountChange}
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
                                    <IconButton aria-label="Clear Filters" color="error" sx={{ border: .5 }}>
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Box>
                    </Collapse>
                    <Dialog open={openFilterDialog} onClose={handleCloseFilterDialog}>
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
                                            onChange={handleAmountChange}
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
                                        onClick={handleCloseFilterDialog}
                                    >
                                        Search
                                    </Button>
                                </DialogActions>
                            </Box>
                        </DialogContent>
                    </Dialog>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Category</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {expenseData.map((expense) => (
                          <TableRow key={expense.id}>
                            <TableCell>{new Date(expense.createdDate).toLocaleDateString('en-US')}</TableCell>
                            <TableCell>{expense.title}</TableCell>
                            <TableCell>{expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                          </TableRow>
                        ))} */}
                      </TableBody>
                    </Table>
                </Grid>
            </Container>
        </Box>
  );
};

export default Expenses;