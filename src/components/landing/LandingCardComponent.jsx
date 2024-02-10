import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

export const LandingCardComponent = ({ title, description, icon: IconComponent }) => {

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap:2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'medium', minHeight: 65 }}>
                        {title}
                    </Typography>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <IconComponent color="secondary" sx={{ fontSize: 100 }}/>
                    </Box>
                    <Typography variant="body1">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}