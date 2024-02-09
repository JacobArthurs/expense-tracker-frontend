import React, { useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { DistributionChartComponent } from "../components/distributions/DistributionChartComponent";
import axios from "axios";
import { OperationResultSnackComponent } from "../components/shared/OperationResultSnackComponent";
import { DistributionTableComponent } from "../components/distributions/DistributionTableComponent";

const Distributions = () => {
  const [distributions, setDistributions] = React.useState([]);
  const [distributionPieData, setDistributionPieData] = React.useState([]);
  const [currentDistributions, setCurrentDistributions] = React.useState([]);
  const [currentDistributionPieData, setCurrentDistributionPieData] = React.useState([]);
  const [monthCount, setMonthCount] = React.useState(1);
  const [openResultSnack, setOpenResultSnack] = React.useState(false);
  const [resultSnackMessage, setResultSnackMessage] = React.useState('');
  const [resultSnackSeverity, setResultSnackSeverity] = React.useState('success');
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const colors = ['#219ebc', '#D163BB', '#E09F60', '#023047', '#912768', '#60E1E0', '#ffb703', '#6369D1', '#fb8500', '#B0BBE8'];

  const fetchDistributions = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/expected-category-distribution`); 

      const data = response.data;  
      if (data) {
        setDistributions(data);
        setDistributionPieData(data.map(dist => ({
          label: dist.category,
          value: dist.distribution
        })));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCurrentDistributions = async () => {
      try {
        const response = await axios.post(`${apiUrl}/api/expense/current-distribution`, {
          monthCount: monthCount
        }); 
  
        const data = response.data;  
        if (data) {
          setCurrentDistributions(data);
          setCurrentDistributionPieData(data.map(dist => ({
            label: dist.category,
            value: dist.distribution
          })));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentDistributions();
  }, [apiUrl, monthCount])

  useEffect(() => {
      fetchDistributions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDistributionChange = (value) => {
    setDistributions(value);
  }

  const handleMonthCountChange = (event) => {
    setMonthCount(event.target.value);
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

  return (
    <Box sx={{display: 'flex'}}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DistributionChartComponent 
              title={"Expected Distributions"}
              data={distributionPieData}
              colors={colors}
              selectBox={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DistributionChartComponent 
              title={"Current Distributions"}
              data={currentDistributionPieData}
              colors={colors}
              selectBox={true}
              monthCount={monthCount}
              onMonthCountChange={handleMonthCountChange}
            />
          </Grid>
          <Grid item container xs={12}>
          <DistributionTableComponent
            expectedData={distributions}
            currentData={currentDistributions}
            colors={colors}
            onDistributionChange={handleDistributionChange}
            onOpenResultSnack={handleOpenResultSnack}
            onResultSnackMessageChange={handleResultSnackMessageChange}
            onResultSnackSeverityChange={handleResultSnackSeverityChange}
            getExpectedDistributions={fetchDistributions}
            apiUrl={apiUrl}
          />
          </Grid>
          <OperationResultSnackComponent
            open={openResultSnack}
            handleClose={handleCloseResultSnack}
            severity={resultSnackSeverity}
            message={resultSnackMessage}
          />
        </Grid>
        </Container>
    </Box>
  );
};

export default Distributions;