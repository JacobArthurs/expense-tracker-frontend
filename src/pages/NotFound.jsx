import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Box sx={{display: 'flex'}}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: '70vh', display: 'flex', justifyContent: 'center'}}>
                <Box sx={{ width: 'fit-content', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: 100, letterSpacing: 32, textIndent: 32 }}>404</Typography>
                    <Divider sx={{ width: '100%', mb: 4 }} />
                    <Typography variant="h5" sx={{ mb: 4 }}>Page Not Found</Typography>
                    <Button component={Link} to="/" variant="outlined">Return to Dashboard</Button>
                </Box>
            </Container>
        </Box>
  );
};

export default NotFound;