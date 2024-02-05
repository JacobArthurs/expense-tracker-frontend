import React, { useEffect } from "react";
import { Box, Button, CircularProgress, Container, Fab, Grid, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { CategoryReassignDialogComponent } from "../components/categories/CategoryReassignDialogComponent";
import { OperationResultSnackComponent } from "../components/shared/OperationResultSnackComponent";
import { DeleteDialogComponent } from "../components/shared/DeleteDialogComponent";
import { ManageCategoryDialogComponent } from "../components/categories/ManageCategoryDialogComponent";

const Categories = () => {
    const [categories, setCategories] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [openManageDialog, setOpenManageDialog] = React.useState(false);
    const [openReassignDialog, setOpenReassignDialog] = React.useState(false);
    const [openResultSnack, setOpenResultSnack] = React.useState(false);
    const [resultSnackMessage, setResultSnackMessage] = React.useState('');
    const [resultSnackSeverity, setResultSnackSeverity] = React.useState('success');
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    
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

    useEffect(() => {
        fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNewCategory = () => {
        handleCloseResultSnack();
        if (categories.length >= 10) {
            handleOpenResultSnack();
            handleResultSnackMessageChange('The maximum limit of 10 categories has been reached.');
            handleResultSnackSeverityChange('error');

            return;
        }

        setOpenManageDialog(true);
    }

    const handleOpenManageDialog = (category) => {
        setSelectedCategory(category);
        setOpenManageDialog(true);
    }

    const handleCloseManageDialog = () => {
        setSelectedCategory(null);
        setOpenManageDialog(false);
        fetchCategories();
    }

    const handleOpenReassignDialog = (category) => {
        setSelectedCategory(category);
        setOpenReassignDialog(true);
    }

    const handleCloseReassignDialog = () => {
        setSelectedCategory(null);
        setOpenReassignDialog(false);
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

    const handleOpenDeleteDialog = (category) => {
        setSelectedCategory(category);
        setOpenDeleteDialog(true);
    };
  
    const handleCloseDeleteDialog = () => {
        setSelectedCategory(null);
        setOpenDeleteDialog(false);
    };

    const handleDelete = async () => {
        setOpenDeleteDialog(false);
        try {
            const response = await axios.delete(`${apiUrl}/api/category/${selectedCategory.id}`); 
      
            const data = response.data;     
            if (data) {
                handleResultSnackMessageChange(data.message);
                handleResultSnackSeverityChange(data.success ? 'success' : 'error');
                handleOpenResultSnack();
            }
        } catch (error) {
          console.log(error);
        }
        setSelectedCategory(null);
        fetchCategories();
    }

    if (!categories.length) {
        return (
            <Box sx={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{display: 'flex'}}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
                <Grid container item xs={12} lg={6}>
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <Button 
                            sx={{ display: {xs: 'flex', sm: 'none'} }}
                            color="primary" 
                            variant="contained"
                            onClick={handleNewCategory}
                            endIcon={<AddIcon />}>
                            New Category
                        </Button>
                        {categories.map((category) => (
                            <Paper key={category.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, gap: 1 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography sx={{ typography: { xs: "body1", sm: 'h6' } }}>{category.title}</Typography>
                                    <Typography sx={{ typography: { xs: "caption", sm: 'body2' } }}>{category.description}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', height: 'fit-content' }}>
                                    <Tooltip title='Reasign Expenses' arrow>
                                      <IconButton onClick={() => handleOpenReassignDialog(category)}>
                                          <MoveDownIcon />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Edit Category' arrow>
                                      <IconButton onClick={() => handleOpenManageDialog(category)}>
                                          <EditIcon />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Delete Category' arrow>
                                      <IconButton onClick={() => handleOpenDeleteDialog(category)}>
                                          <DeleteIcon />
                                      </IconButton>
                                    </Tooltip>
                                </Box>
                            </Paper>
                        ))}
                    </Stack>
                    <ManageCategoryDialogComponent 
                        open={openManageDialog}
                        onClose={handleCloseManageDialog}
                        selectedCategory={selectedCategory}
                        onOpenResultSnack={handleOpenResultSnack}
                        onResultSnackMessageChange={handleResultSnackMessageChange}
                        onResultSnackSeverityChange={handleResultSnackSeverityChange}
                    />
                    <CategoryReassignDialogComponent 
                        open={openReassignDialog}
                        onClose={handleCloseReassignDialog}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onOpenResultSnack={handleOpenResultSnack}
                        onResultSnackMessageChange={handleResultSnackMessageChange}
                        onResultSnackSeverityChange={handleResultSnackSeverityChange}
                    />
                    <DeleteDialogComponent
                            open={openDeleteDialog}
                            onClose={handleCloseDeleteDialog}
                            onDelete={handleDelete}
                            type={"Category"}
                            count={1}
                            message={"Doing so will delete all associated expenses."}
                        />
                    <OperationResultSnackComponent 
                        open={openResultSnack}
                        handleClose={handleCloseResultSnack}
                        severity={resultSnackSeverity}
                        message={resultSnackMessage}
                    />
                </Grid>
            </Container>
            <Box sx={{ position: 'fixed', bottom: 50, right: 50, display: {xs: 'none', sm: 'flex'} }}>
                <Tooltip title='Add New Category' arrow>
                    <Fab color="primary" onClick={handleNewCategory}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                {/* Maximum limit of 10 categories has been reached */}
            </Box>
        </Box>
  );
};

export default Categories;