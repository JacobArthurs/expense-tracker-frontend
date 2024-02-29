import { useCallback, useEffect, useRef, useState } from "react";
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
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [expandedFilters, setExpandedFilters] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openResultSnack, setOpenResultSnack] = useState(false);
  const [resultSnackMessage, setResultSnackMessage] = useState('');
  const [resultSnackSeverity, setResultSnackSeverity] = useState('success');
  const [openManageExpenseDialog, setOpenManageExpenseDialog] = useState(false);
  const [manageExpenseId, setManageExpenseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { inputStartDate } = useParams();
  const isScreenXs = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const apiUrl = import.meta.env.VITE_API_URL;

  const { register, setValue, control, reset, watch, handleSubmit } = useForm({
    defaultValues: {
      searchTerm: '',
      amount: [0, 500],
      startDate: null,
      endDate: null,
      category: '',
      limit: 10,
      page: 0
    }
  });
    
  const fetchData = async (input) => {
      try {
        const { data } = await axios.post(`${apiUrl}/expense/search`, {
          offset: input.page * input.limit,
          limit: input.limit,
          categoryId: input.category,
          overviewText: input.searchTerm,
          startDate: input.startDate,
          endDate: input.endDate,
          minAmount: input.amount[0] <= 0 ? null : input.amount[0],
          maxAmount: input.amount[1] >= 500 ? null : input.amount[1],
        });
    
        if (data) {
          setExpenses(data.data);
          setTotal(data.total);
        }
      } catch (error) {
        console.error("Fetching data failed:", error);
      } finally {
        setLoading(false);
      }
  };

  const deleteData = async (deletedIds) => {
    try {
      const responses = await Promise.all(
        deletedIds.map(id => axios.delete(`${apiUrl}/expense/${id}`))
      );
  
      const failedDeletions = responses.filter(response => !response.data.success);
      const successCount = deletedIds.length - failedDeletions.length;
  
      if (failedDeletions.length > 0) {
        const { message } = failedDeletions[0].data;
        setResultSnackSeverity('error');
        setResultSnackMessage(message || 'An error occurred during deletion.');
      } else {
        setResultSnackSeverity('success');
        setResultSnackMessage(`${successCount} expense${successCount !== 1 ? 's' : ''} deleted successfully.`);
      }
    } catch (error) {
      console.error("Deletion failed:", error);
      setResultSnackSeverity('error');
      setResultSnackMessage('An error occurred during deletion.');
    } finally {
      setOpenResultSnack(true);
    }
  };

  const debouncedFetchData = useRef(useDebounce((data) => fetchData(data), 300));

  const onSubmit = useCallback((data) => {
    debouncedFetchData.current(data);
  }, [debouncedFetchData]);

  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch, onSubmit]);

  useEffect(() => {
    fetchData(watch());
  // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/category`);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, [apiUrl]);
  
  useEffect(() => {
    if (inputStartDate) {
      setValue('startDate', dayjs(inputStartDate));
    }
  }, [inputStartDate, setValue]);
  
  const amountValueText = (value) => `$${value}${value >= 500 ? '+' : ''}`;
  
  const clearFilters = () => {
    reset();
    setValue('page', 0);
  };
  
  const handleFilterToggle = () => {
    isScreenXs ? handleOpenFilterDialog() : setExpandedFilters(!expandedFilters);
  };
  
  const handleOpenFilterDialog = () => setOpenFilterDialog(true);
  const handleCloseFilterDialog = () => setOpenFilterDialog(false);
  
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);
  
  const handleSelectRow = (id) => {
    const newSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter(rowId => rowId !== id)
      : [...selectedRows, id];
    setSelectedRows(newSelectedRows);
  };
  
  const handleSelectAll = (rowsInView) => {
    const allSelected = rowsInView.every(element => selectedRows.includes(element));
    setSelectedRows(allSelected
      ? selectedRows.filter(id => !rowsInView.includes(id))
      : [...new Set([...selectedRows, ...rowsInView])]);
  };
  
  const handleDelete = async () => {
    if (selectedRows.length) {
      await deleteData(selectedRows);
      setSelectedRows([]);
      setOpenDeleteDialog(false);
      fetchData(watch());
    }
  };
  
  const handleOpenResultSnack = () => setOpenResultSnack(true);
  const handleCloseResultSnack = () => setOpenResultSnack(false);
  
  const handleResultSnackMessageChange = (message) => setResultSnackMessage(message);
  const handleResultSnackSeverityChange = (severity) => setResultSnackSeverity(severity);
  
  const handleOpenManageExpenseDialog = (id) => {
    setOpenManageExpenseDialog(true);
    if (id) setManageExpenseId(id);
  };
  
  const handleCloseManageExpenseDialog = () => {
    setOpenManageExpenseDialog(false);
    setManageExpenseId(null);
    fetchData(watch());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Search and filter components */}
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
    
          {/* Manage expense components */}
          <Grid item xs={12}>
            <ManageExpenseComponent 
              selectedRows={selectedRows}
              onDelete={handleOpenDeleteDialog}
              onNewExpense={handleOpenManageExpenseDialog}
            />
            <ManageExpenseDialogComponent
              id={manageExpenseId}
              categories={categories}
              open={openManageExpenseDialog}
              onClose={handleCloseManageExpenseDialog}
              onOpenResultSnack={handleOpenResultSnack}
              onResultSnackMessageChange={handleResultSnackMessageChange}
              onResultSnackSeverityChange={handleResultSnackSeverityChange}
            />
          </Grid>
    
          {/* Expense table and operation result components */}
          <Grid item xs={12}>
            <ExpenseTableComponent
              data={expenses}
              totalRows={total}
              selectedRows={selectedRows}
              onSelectRow={handleSelectRow}
              onSelectAll={handleSelectAll}
              onEditExpense={handleOpenManageExpenseDialog}
              isScreenXs={isScreenXs}
              loading={loading}
              control={control}
            />
            <DeleteDialogComponent
              open={openDeleteDialog}
              onClose={handleCloseDeleteDialog}
              onDelete={handleDelete}
              type="Expense"
              pluralType="Expenses"
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