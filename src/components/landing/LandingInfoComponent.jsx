import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { SlideInComponent } from "../shared/SlideInComponent";

export const LandingInfoComponent = ({ title, description, icon, darkMode, order }) => {
  const theme = useTheme();
  const isScreenSm = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid item container spacing={6} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mb:8 }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }} order={{xs: 0, md: order}}>
        <Box sx={{ width: isScreenSm ? '50%' : '100%', height: isScreenSm ? '50%' : '100%', p: {xs: 5, sm: 8, md: 10}, bgcolor: darkMode ? theme.palette.grey[900] : theme.palette.grey[200], borderRadius: '100%' }}>
          <img src={icon} alt={title} style={{ display: 'block', width: '100%', height: '100%'}}/>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center'}}>
        <SlideInComponent direction={order == 0 ? 'left' : 'right'} disabled={isScreenSm}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>{title}</Typography>
            <Typography variant="h6">{description}</Typography>
          </Box>
        </SlideInComponent>
      </Grid>
    </Grid>
  );
}