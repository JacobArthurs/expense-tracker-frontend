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
import { useForm } from 'react-hook-form';

const Expenses = () => {
    const [data, setData] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
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

    const { register, setValue, control, reset, watch } = useForm({
      defaultValues: {
        searchTerm: '',
        amount: [0, 500],
        startDate: null,
        endDate: null,
        category: ''
      }
    });
    
    const fetchData = async () => {
      try {
        const response = await axios.post(`${apiUrl}/api/expense/search`, {
          offset: page * limit,
          limit: limit,
          categoryId: searchForm.category,
          overviewText: searchForm.searchTerm,
          startDate: searchForm.startDate,
          endDate: searchForm.endDate,
          minAmount: searchForm.amount[0] <= 0 ? null : searchForm.amount[0],
          maxAmount: searchForm.amount[1] >= 500 ? null : searchForm.amount[1]
        });  

        const responseData = response.data;     
        if (responseData) {
          setData(responseData.data);
          setTotal(responseData.total);
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
    const searchForm = watch();

    useEffect(() => {
        debouncedFetchData();
    }, [debouncedFetchData, searchForm]);

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
            setValue('startDate',dayjs(inputStartDate));
        }
    }, [inputStartDate, setValue]);

    function amountValueText(value) {
        return value >= 500 ? `$${value}+` : `$${value}`;
    }

    function clearFilters() {
        reset();
        setPage(0);
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

        fetchData();
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
        fetchData();
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
                            amountValueText={amountValueText} 
                            clearFilters={clearFilters}
                            register={register}
                            control={control}
                        />
                        <SearchFiltersDialogComponent
                            categories={categories}
                            open={openFilterDialog} 
                            onClose={handleCloseFilterDialog}
                            amountValueText={amountValueText}
                            clearFilters={clearFilters}
                            register={register}
                            control={control}
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