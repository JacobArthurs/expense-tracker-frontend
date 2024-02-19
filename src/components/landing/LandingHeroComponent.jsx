import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import  money from "../../assets/landing_money.jpg"
import { TypingTypography } from "../shared/TypingTypographyComponent";

export const LandingHeroComponent = () => {

    return (
        <Grid item container sx={{ mb: 8, mt: 8 }} spacing={4}>
            <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TypingTypography speed={100} color="primary" variant="h2" sx={{ fontWeight: 'bold', textAlign: 'center', mb:2}}>Empower Your Finances</TypingTypography>
                <Typography variant="h6" sx={{ textAlign: 'center',  mb: 2 }}>Effortlessly manage your spending, track expenses, and gain insights into your financial habits with our intuitive Expense Tracker. Stay on top of your budget, categorize your expenses, and visualize your financial data with ease.</Typography>
                <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    size="large"
                    sx={{ width: {xs: '75%', md: '50%'} }}>
                    <Typography variant="h5">Get started</Typography>
                </Button>
            </Grid>
            <Grid item xs={6} sx={{ height: '100%', display: {xs: 'none', md: 'flex'}, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    component="img"
                    src={money}
                    sx={{
                        width: '100%',
                        borderRadius: '100%'
                    }} 
                />
            </Grid>
        </Grid>
    );
}