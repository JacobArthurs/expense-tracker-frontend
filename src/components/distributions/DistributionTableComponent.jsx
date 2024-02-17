import { Avatar, Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { useCallback, useState } from "react";

export const DistributionTableComponent = ({ expectedData, currentData, colors, onDistributionChange, onOpenResultSnack, onResultSnackMessageChange, onResultSnackSeverityChange, getExpectedDistributions, apiUrl}) => {
  const [editMode, setEditMode] = useState(false);
  const theme = useTheme();
  const borderColor = theme.palette.mode === 'dark' ? '#515151' : '#e0e0e0';
  const isScreenXs = useMediaQuery(theme.breakpoints.down('sm'));

  const updateDistributions = useCallback(async () => {
    try {
      const updateResponses = await Promise.all(expectedData.map(dist => 
        axios.put(`${apiUrl}/api/expected-category-distribution/${dist.id}`, {
          categoryId: dist.categoryId,
          distribution: dist.distribution
        })
      ));

      const failedUpdates = updateResponses.filter(response => !response.data.success);
      if (failedUpdates.length > 0) {
        const { message } = failedUpdates[0].data;
        onResultSnackMessageChange(message);
        onResultSnackSeverityChange('error');
      } else {
        onResultSnackMessageChange('Distributions updated successfully.');
        onResultSnackSeverityChange('success');
      }
      onOpenResultSnack();
    } catch (error) {
      console.error("Error updating distributions:", error);
      onResultSnackMessageChange('There was an error processing your request. Please try again.');
      onResultSnackSeverityChange('error');
      onOpenResultSnack();
    }
  }, [apiUrl, expectedData, onResultSnackMessageChange, onResultSnackSeverityChange, onOpenResultSnack]);

  const handleExpectedDistributionChange = (id, value) => {
    const formattedValue = value ? parseFloat(value.replace("%", "")) : 0;
    onDistributionChange(expectedData.map(dist =>
      dist.id === id ? { ...dist, distribution: formattedValue } : dist
    ));
  };

  const handleOpenEditMode = () => setEditMode(true);

  const handleSaveDistributions = async () => {
    const totalDistribution = expectedData.reduce((total, dist) => total + dist.distribution, 0);
    if (totalDistribution !== 100) {
      onResultSnackMessageChange(`Total distribution percentage must equal 100%. Current percentage: ${totalDistribution}%`);
      onResultSnackSeverityChange('error');
      onOpenResultSnack();
      return;
    }
    await updateDistributions();
    setEditMode(false);
    getExpectedDistributions();
  };

  if (!expectedData.length || !currentData.length) {
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
    <Paper sx={{ p:2 }}>
      <Table size="small" sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell align="right" colSpan={1} sx={{borderBottom: 0 }}></TableCell>
            <TableCell width="40%" align="center" colSpan={2} sx={{ borderBottom: 0, borderLeft: 1, borderColor: borderColor }}>
              <Typography variant={isScreenXs ? 'body2' : 'h6'}>Distributions</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px:1 }}>
              <Typography variant={isScreenXs ? 'body2' : 'h6'}>
                Category
              </Typography>
              <Button 
                variant="contained"
                size="small"
                endIcon={editMode ? <CheckIcon /> : <EditIcon />} 
                sx={{ borderRadius: 8 }}
                onClick={editMode ? handleSaveDistributions : handleOpenEditMode}>
                <Typography variant="body2">{editMode ? 'Save' : 'Edit'}</Typography>
              </Button>
            </TableCell>
            <TableCell align="center" width="20%" sx={{ px:0, borderLeft: 1, borderColor: borderColor }}>
              <Typography variant={isScreenXs ? 'body2' : 'h6'}>Expected</Typography>
            </TableCell>
            <TableCell align="center" width="20%" sx={{ px:0 }}>
              <Typography variant={isScreenXs ? 'body2' : 'h6'}>Current</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expectedData.map((distribution, index) => (
            <TableRow key={distribution.id}>
              <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: colors[index % colors.length], width: 24, height: 24, mr: 1 }}>&nbsp;</Avatar>
                <Typography>{distribution.category}</Typography>
              </TableCell>
              <TableCell align="center" sx={{ px:.5, borderLeft: 1, borderColor: borderColor }}>
                {editMode ? 
                  <NumericFormat
                    sx={{ 
                      width: {xs: '100%', md: '50%'}, 
                      "& .MuiInputBase-root" : {
                          height: 24
                      } 
                  }}
                    customInput={TextField}
                    size="small"
                    InputLabelProps={{style: {fontSize: 14}}}
                    suffix="%"
                    inputProps={{style: { textAlign: 'center' }}} 
                    value={distribution.distribution}
                    onChange={e => handleExpectedDistributionChange(distribution.id, e.target.value)}
                    isAllowed={(value) => {
                      const { floatValue } = value;
                      return (floatValue <= 100 && floatValue >= 0) || floatValue === undefined;
                    }}
                  />
                : 
                  <Typography>{distribution.distribution}%</Typography>
                }
              </TableCell>
              <TableCell align="center">
                <Typography>{currentData[index]?.distribution}%</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}