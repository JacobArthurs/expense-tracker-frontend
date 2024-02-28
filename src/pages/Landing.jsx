import { Container, Grid, Typography } from "@mui/material";
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { FooterComponent } from "../components/navigation/FooterComponent";
import { LandingToolbarComponent } from "../components/landing/LandingToolbarComponent";
import { LandingHeroComponent } from "../components/landing/LandingHeroComponent";
import { LandingCardComponent } from "../components/landing/LandingCardComponent";
import analysis from "../assets/analysis.png";
import uptime from "../assets/uptime.png"
import smartphone from "../assets/smartphone.png"
import { useThemeManagment } from "../hooks/useThemeManagement";
import { LandingInfoComponent } from "../components/landing/LandingInfoComponent";

const cards = [
  { title: "Budgeting Made Simple", description: "Set realistic budgets, track your progress, and achieve your financial goals with confidence. Our Expense Tracker empowers you to take control of your money and live a financially balanced life.", icon: SavingsOutlinedIcon },
  { title: "Streamline Your Finances", description: "Simplify expense tracking and budget management with our user-friendly platform. Say goodbye to spreadsheets and hello to effortless financial control.", icon: TrendingUpIcon },
  { title: "Insightful Analytics", description: "Unlock valuable insights into your spending patterns and trends. Visualize your expenses over time, identify areas for savings, and make informed financial decisions.", icon: LeaderboardIcon },
  { title: "Customizable Categories", description: "Tailor expense categories to fit your unique lifestyle and spending habits. From groceries to entertainment, create personalized categories that reflect your financial priorities.", icon: CategoryOutlinedIcon },
];

const info = [
  {title: "Interactive Graphs and Charts", description: "Visualize your expenses with interactive graphs and charts. Easily compare spending across different categories, spot trends, and stay motivated on your financial journey.", icon: analysis, order: 0},
  {title: "Historical Data at Your Fingertips", description: "Access detailed historical data of your past expenses anytime, anywhere. Track your financial progress and make adjustments to reach your goals.", icon: uptime, order: 1},
  {title: "Stay Organized on the Go", description: "Manage your finances on the fly with our mobile-friendly platform. Whether you're at home or on the move, stay connected to your financial data effortlessly.", icon: smartphone, order: 0},
];

const Landing = () => {
  const { darkMode, handleToggleDarkMode } = useThemeManagment();

  return (
    <>
      <LandingToolbarComponent 
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      <Container maxWidth="lg" sx={{ mb: 4, mt:8, display: 'flex', justifyContent: 'center' }}>
        <Grid container>
          <LandingHeroComponent />
          <Grid item container spacing={2} mt={8} mb={16}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: 'medium'}}>How can we help you?</Typography>
            </Grid>
            {cards.map((card) => (
              <LandingCardComponent
                key={card.title}
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            ))}
          </Grid>
          {info.map((card) => (
            <LandingInfoComponent
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              order={card.order}
              darkMode={darkMode}
            />
          ))}
          <Grid item xs={12} mt={4}>
            <FooterComponent />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Landing;