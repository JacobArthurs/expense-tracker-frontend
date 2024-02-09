import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

export const DistributionChartComponent = ({ title, data, colors, selectBox, monthCount, onMonthCountChange }) => {

    return (
        <Paper sx={{ display: 'flex',  flexDirection: 'column', p:2 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Typography component="h2" variant="h6" color="primary" sx={{ pb: selectBox ? 0 : 3, width: 'fit-content' }}>
                    {title}
                </Typography>
                <FormControl sx={{ width:'40%', display: selectBox ? 'flex' : 'none' }}>
                    <InputLabel>Duration</InputLabel>
                    <Select
                        label="Duration"
                        name="duration"
                        value={monthCount}
                        onChange={onMonthCountChange}
                    >
                        <MenuItem value="1">1 Month</MenuItem>
                        <MenuItem value="3">3 Months</MenuItem>
                        <MenuItem value="6">6 Months</MenuItem>
                        <MenuItem value="12">12 Months</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{
                width: '100%',
                flexGrow: 1,
                overflow: 'hidden'
                }}
            >
              <PieChart
                margin={{ top: 100, bottom: 100, left:100, right:100 }}
                colors={colors}
                series={[
                  {
                    data: data,
                    innerRadius: 50,
                    outerRadius: 100,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 45, outerRadius: 90, color: 'gray' },
                    valueFormatter(item) { return `${item.value}%`; },
                  },
                ]}
                height={225}
                slotProps={{ legend: { hidden: true } }}
              />
            </Box>
        </Paper>
    );
}