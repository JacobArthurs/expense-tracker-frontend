import React from "react";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import { SearchFiltersComponent } from "../components/expenses/SearchFiltersComponent";
import { SearchFiltersDialogComponent } from "../components/expenses/SearchFilterDialogComponent";
import { ExpenseTableComponent } from "../components/expenses/ExpenseTableComponent";


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
                    <Grid item xs={12}>
                        <SearchFiltersComponent 
                            expandedFilters={expandedFilters} 
                            onFilterToggle={handleFilterToggle}
                            onAmountChange={handleAmountChange}
                            amountSliderValues={amountSliderValues}
                            amountValueText={amountValueText} 
                        />
                        <SearchFiltersDialogComponent 
                            open={openFilterDialog} 
                            onClose={handleCloseFilterDialog}
                            onAmountChange={handleAmountChange}
                            amountSliderValues={amountSliderValues}
                            amountValueText={amountValueText} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ExpenseTableComponent />
                    </Grid>
                </Grid>
            </Container>
        </Box>
  );
};

export default Expenses;