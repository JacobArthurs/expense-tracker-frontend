import { Container, Grid, Typography } from "@mui/material";
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { FooterComponent } from "../components/navigation/FooterComponent";
import { LandingToolbarComponent } from "../components/landing/LandingToolbarComponent";
import { LandingHeroComponent } from "../components/landing/LandingHeroComponent";
import { LandingCardComponent } from "../components/landing/LandingCardComponent";

const Landing = () => {
    return (
        <>
            <LandingToolbarComponent />
            <Container maxWidth="lg" sx={{ mb: 4, mt:8, display: 'flex', justifyContent: 'center' }}>
                <Grid container>
                    <LandingHeroComponent />
                    <Grid item container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ fontWeight: 'medium'}}>How can we help you?</Typography>
                        </Grid>
                        <LandingCardComponent 
                            title="Budgeting Made Simple"
                            description="Set realistic budgets, track your progress, and achieve your financial goals with confidence. Our Expense Tracker empowers you to take control of your money and live a financially balanced life."
                            icon={SavingsOutlinedIcon}
                        />
                        <LandingCardComponent 
                            title="Streamline Your Finances"
                            description="Simplify expense tracking and budget management with our user-friendly platform. Say goodbye to spreadsheets and hello to effortless financial control."
                            icon={TrendingUpIcon}
                        />
                        <LandingCardComponent 
                            title="Insightful Analytics"
                            description="Unlock valuable insights into your spending patterns and trends. Visualize your expenses over time, identify areas for savings, and make informed financial decisions."
                            icon={LeaderboardIcon}
                        />
                        <LandingCardComponent 
                            title="Customizable Categories"
                            description="Tailor expense categories to fit your unique lifestyle and spending habits. From groceries to entertainment, create personalized categories that reflect your financial priorities."
                            icon={CategoryOutlinedIcon}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FooterComponent />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Landing;