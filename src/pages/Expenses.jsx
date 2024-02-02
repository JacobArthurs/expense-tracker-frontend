import React, { useEffect } from "react";
import useDebounce from "../hooks/useDebounce"
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import { SearchFiltersComponent } from "../components/expenses/SearchFiltersComponent";
import { SearchFiltersDialogComponent } from "../components/expenses/SearchFilterDialogComponent";
import { ExpenseTableComponent } from "../components/expenses/ExpenseTableComponent";
import { ManageExpenseComponent } from "../components/expenses/ManageExpenseComponent";
import axios from "axios";
import { DeleteDialogComponent } from "../components/shared/DeleteDialogComponent";
import { OperationResultSnackComponent } from "../components/shared/OperationResultSnackComponent";
import { ManageExpenseDialogComponent } from "../components/expenses/ManageExpenseDialogComponent";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const Expenses = () => {
    const [data, setData] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [amountValues, setAmountValues] = React.useState([0, 500]);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [searchCategory, setSearchCategory] = React.useState('');
    const [expandedFilters, setExpandedFilers] = React.useState(false);
    const [openFilterDialog, setOpenFilterDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [openResultSnack, setOpenResultSnack] = React.useState(false);
    const [resultSnackMessage, setResultSnackMessage] = React.useState('');
    const [resultSnackSeverity, setResultSnackSeverity] = React.useState('success');
    const [openManageExepenseDialog, setOpenManageExepenseDialog] = React.useState(false);
    const [manageExpenseId, setManageExpenseId] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const { inputStartDate } = useParams();
    const isScreenXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    const fetchData = async () => {
      try {
        const response = await axios.post(`${apiUrl}/api/expense/search`, {
          offset: page * limit,
          limit: limit,
          categoryId: searchCategory,
          overviewText: searchTerm == '' ? null : searchTerm,
          startDate: startDate,
          endDate: endDate,
          minAmount: amountValues[0] <= 0 ? null : amountValues[0],
          maxAmount: amountValues[1] >= 500 ? null : amountValues[1]
        });  

        const data = response.data;     
        if (data) {
          setData(data.data);
          setTotal(data.total);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const deleteData = async (deletedIds) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
            const deleteRequests = deletedIds.map(id => axios.delete(`${apiUrl}/api/expense/${id}`));
            
            const responses = await Promise.all(deleteRequests);
            
            let hasError = false;
            let successCount = 0;
            let errorMessage = '';

            responses.forEach(response => {
                const { success, message } = response.data;
                if (success) {
                    successCount++;
                } else {
                    hasError = true;
                    errorMessage = message;
                }
            });

            if (hasError) {
                setResultSnackSeverity('error');
                setResultSnackMessage(errorMessage);
            } else {
                setResultSnackSeverity('success');
                if (successCount === deletedIds.length) {
                    setResultSnackMessage(`${deletedIds.length} expense${deletedIds.length !== 1 ? 's' : ''} deleted successfully.`);
                } else {
                    setResultSnackMessage(`${successCount} out of ${deletedIds.length} expenses deleted successfully.`);
                }
            }
            setOpenResultSnack(true);
        } catch (error) {
          console.log(error);
        }
    };

    const debouncedFetchData = useDebounce(fetchData, 300);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
              const response = await axios.get(`${apiUrl}/api/category`); 
        
              const data = response.data;  
              if (data) {
                setCategories(data);
              }
            } catch (error) {
              console.log(error);
            }
          };

        fetchCategories();
    }, [apiUrl]);

    useEffect(() => {
        if (inputStartDate) {
            setStartDate(dayjs(inputStartDate));
        }
    }, [inputStartDate]);

    useEffect(() => {
        debouncedFetchData();
    }, [searchTerm, amountValues, startDate, endDate, searchCategory, page, limit, debouncedFetchData]);

    useEffect(() => {
        setPage(0);
    }, [searchTerm, amountValues, startDate, endDate]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    function amountValueText(value) {
        return value >= 500 ? `$${value}+` : `$${value}`;
    }

    function clearFilters() {
        setSearchTerm('');
        setAmountValues([0, 500]);
        setStartDate(null);
        setEndDate(null);
        setSearchCategory('');
      }

    const handleAmountChange = (event, newValue) => {
        if (!Array.isArray(newValue))
            return;

        setAmountValues([newValue[0], newValue[1]])
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleSearchCategoryChange = (event) => {
        setSearchCategory(event.target.value);
    }

    const handleFilterToggle = () => {
        if (isScreenXs)
            handleOpenFilterDialog();
        else
            setExpandedFilers(!expandedFilters);
    };

    const handleOpenFilterDialog = () => {
        setOpenFilterDialog(true);
    };
  
    const handleCloseFilterDialog = () => {
        setOpenFilterDialog(false);
    };

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };
  
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setLimit(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleSelectRow = (id) => {
        const index = selectedRows.indexOf(id);

        if (index !== -1) {
            const updatedRows = [...selectedRows];
            updatedRows.splice(index, 1);
            setSelectedRows(updatedRows);
        }
        else
            setSelectedRows(selectedRows.concat(id));
    }

    const handleSelectAll = (rowsInView) => {
        if (rowsInView.every(element => selectedRows.includes(element)))
            setSelectedRows(selectedRows.filter(element => !rowsInView.includes(element)));
        else
            setSelectedRows(selectedRows.concat(rowsInView));
    }

    const handleDelete = () => {
        if (selectedRows.length > 0) {
            deleteData(selectedRows);
            setSelectedRows([]);
        }

        setOpenDeleteDialog(false);

        debouncedFetchData();
    }

    const handleOpenResultSnack = () => {
        setOpenResultSnack(true);
    }

    const handleCloseResultSnack = () => {
        setOpenResultSnack(false);
    }

    const handleResultSnackMessageChange = (message) => {
        setResultSnackMessage(message);
    }

    const handleResultSnackSeverityChange = (severity) => {
        setResultSnackSeverity(severity);
    }

    const handleOpenManageExpenseDialog = (id) => {
        setOpenManageExepenseDialog(true);

        if (id) {
            setManageExpenseId(id);
        }
    }

    const handleCloseManageExepenseDialog = () => {
        setOpenManageExepenseDialog(false);
        setManageExpenseId(null);
    }

    return (
        <Box sx={{display: 'flex'}}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <SearchFiltersComponent 
                            categories={categories}
                            expandedFilters={expandedFilters} 
                            onFilterToggle={handleFilterToggle}
                            onSearchTermChange={handleSearchTermChange}
                            searchTerm={searchTerm}
                            onAmountChange={handleAmountChange}
                            amountValues={amountValues}
                            amountValueText={amountValueText} 
                            onStartDateChange={handleStartDateChange}
                            startDate={startDate}
                            onEndDateChange={handleEndDateChange}
                            endDate={endDate}
                            searchCategory={searchCategory}
                            onSearchCategoryChange={handleSearchCategoryChange}
                            clearFilters={clearFilters}
                        />
                        <SearchFiltersDialogComponent
                            categories={categories}
                            open={openFilterDialog} 
                            onClose={handleCloseFilterDialog}
                            onSearchTermChange={handleSearchTermChange}
                            searchTerm={searchTerm}
                            onAmountChange={handleAmountChange}
                            amountValues={amountValues}
                            amountValueText={amountValueText}
                            onStartDateChange={handleStartDateChange}
                            startDate={startDate}
                            onEndDateChange={handleEndDateChange}
                            endDate={endDate}
                            searchCategory={searchCategory}
                            onSearchCategoryChange={handleSearchCategoryChange}
                            clearFilters={clearFilters}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ManageExpenseComponent 
                            selectedRows={selectedRows}
                            onDelete={handleOpenDeleteDialog}
                            onNewExpense={handleOpenManageExpenseDialog}
                        />
                        <ManageExpenseDialogComponent
                            id={manageExpenseId}
                            categories={categories}
                            open={openManageExepenseDialog}
                            onClose={handleCloseManageExepenseDialog}
                            onOpenResultSnack={handleOpenResultSnack}
                            onResultSnackMessageChange={handleResultSnackMessageChange}
                            onResultSnackSeverityChange={handleResultSnackSeverityChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ExpenseTableComponent
                            data={data}
                            totalRows={total}
                            page={page}
                            onChangePage={handleChangePage}
                            rowsPerPage={limit}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            selectedRows={selectedRows}
                            onSelectRow={handleSelectRow}
                            onSelectAll={handleSelectAll}
                            onEditExpense={handleOpenManageExpenseDialog}
                            isScreenXs={isScreenXs}
                            loading={loading}
                        />
                        <DeleteDialogComponent
                            open={openDeleteDialog}
                            onClose={handleCloseDeleteDialog}
                            onDelete={handleDelete}
                            type={"Expense"}
                            pluralType={"Expenses"}
                            count={selectedRows.length}
                        />
                        <OperationResultSnackComponent 
                            open={openResultSnack}
                            handleClose={handleCloseResultSnack}
                            severity={resultSnackSeverity}
                            message={resultSnackMessage}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
  );
};

export default Expenses;