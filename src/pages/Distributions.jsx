import { useCallback, useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { DistributionChartComponent } from "../components/distributions/DistributionChartComponent";
import axios from "axios";
import { OperationResultSnackComponent } from "../components/shared/OperationResultSnackComponent";
import { DistributionTableComponent } from "../components/distributions/DistributionTableComponent";

const Distributions = () => {
  const [distributions, setDistributions] = useState([]);
  const [distributionPieData, setDistributionPieData] = useState([]);
  const [currentDistributions, setCurrentDistributions] = useState([]);
  const [currentDistributionPieData, setCurrentDistributionPieData] = useState([]);
  const [monthCount, setMonthCount] = useState(1);
  const [openResultSnack, setOpenResultSnack] = useState(false);
  const [resultSnackMessage, setResultSnackMessage] = useState('');
  const [resultSnackSeverity, setResultSnackSeverity] = useState('success');
  const apiUrl = import.meta.env.VITE_API_URL;
  const colors = ['#219ebc', '#D163BB', '#E09F60', '#023047', '#912768', '#60E1E0', '#ffb703', '#6369D1', '#fb8500', '#B0BBE8'];

  const fetchDistributions = useCallback(async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/expected-category-distribution`);
      const distributionPieData = data.map(dist => ({
        label: dist.category,
        value: dist.distribution,
      }));
      setDistributions(data);
      setDistributionPieData(distributionPieData);
    } catch (error) {
      console.error("Error fetching distributions:", error);
    }
  }, [apiUrl]);

  const fetchCurrentDistributions = useCallback(async () => {
    try {
      const { data } = await axios.post(`${apiUrl}/expense/current-distribution`, {
        monthCount: monthCount,
      });
      const currentDistributionPieData = data.map(dist => ({
        label: dist.category,
        value: dist.distribution,
      }));
      setCurrentDistributions(data);
      setCurrentDistributionPieData(currentDistributionPieData);
    } catch (error) {
      console.error("Error fetching current distributions:", error);
    }
  }, [apiUrl, monthCount]);

  useEffect(() => {
    fetchDistributions();
    fetchCurrentDistributions();
  }, [fetchDistributions, fetchCurrentDistributions]);

  const handleDistributionChange = (value) => setDistributions(value);

  const handleMonthCountChange = (event) => setMonthCount(event.target.value);

  const handleOpenResultSnack = () => setOpenResultSnack(true);
  const handleCloseResultSnack = () => setOpenResultSnack(false);
  const handleResultSnackMessageChange = (message) => setResultSnackMessage(message);
  const handleResultSnackSeverityChange = (severity) => setResultSnackSeverity(severity);

  return (
    <Box sx={{display: 'flex'}}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
        {/* Distribution Charts */}
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

          {/* Distribution Table */}
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