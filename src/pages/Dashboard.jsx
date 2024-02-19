import { Box, Container, Grid, Paper } from "@mui/material";
import { MonthlyExpenseChartComponent } from "../components/dashboard/MonthlyExpenseChartComponent";
import { CurrentExpenseAmount } from "../components/dashboard/CurrentExpenseAmountComponent";
import { RecentExpenseComponent } from "../components/dashboard/RecentExpenseComponent";

const Dashboard = () => {
  return (
    <Box sx={{display: 'flex'}}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <MonthlyExpenseChartComponent />
            </Paper>
          </Grid>

          {/* Current Expense */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <CurrentExpenseAmount />
            </Paper>
          </Grid>

          {/* Recent Expense */}
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column' 
              }}
            >
              <RecentExpenseComponent />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;