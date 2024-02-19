import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TermsDialogComponent } from './TermsDialogComponent';
import { PrivacyDialogComponent } from './PrivacyDialogComponent';
import { Backdrop } from '@mui/material';

export const FooterComponent = () => {
  const [openTermsDialog, setOpenTermsDialog] = React.useState(false);
  const [openPrivacyDialog, setOpenPrivacyDialog] = React.useState(false);

  const handleOpenTermsDialog = () => setOpenTermsDialog(true);
  const handleCloseTermsDialog = () => setOpenTermsDialog(false);

  const handleOpenPrivacyDialog = () => setOpenPrivacyDialog(true);
  const handleClosePrivacyDialog = () => setOpenPrivacyDialog(false);

  return (
    <Box
      component="footer"
      sx={{
        padding: 2,
        textAlign: 'center',
        marginTop: '16px',
      }}
    >
      <Typography variant="body1" color="textSecondary">
          © {new Date().getFullYear()} Jacob Arthurs. All Rights Reserved.
      </Typography>
      <Button variant="text" color='secondary' onClick={handleOpenTermsDialog}>
        Terms of Service
      </Button>
      <Button variant="text" color='secondary' onClick={handleOpenPrivacyDialog}>
        Privacy Policy
      </Button>
      <TermsDialogComponent open={openTermsDialog} onClose={handleCloseTermsDialog} />
      <PrivacyDialogComponent open={openPrivacyDialog} onClose={handleClosePrivacyDialog} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openTermsDialog || openPrivacyDialog}
      />
    </Box>
  );
};