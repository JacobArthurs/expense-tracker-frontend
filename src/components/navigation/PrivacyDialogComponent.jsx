import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export const PrivacyDialogComponent = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Privacy Policy</DialogTitle>
    <DialogContent>
    <DialogContentText>
        Expense Tracker is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our services.
      </DialogContentText>
      <DialogContentText mt={1}>
        <strong>Information We Collect:</strong>
      </DialogContentText>
      <DialogContentText>
        We may collect various types of personal information, including but not limited to:
      </DialogContentText>
      <Typography component="div" color="textSecondary">
        <ul style={{marginTop: '0'}}>
          <li>Personal identification information (e.g., name, email address)</li>
          <li>Contact information (e.g., postal address, phone number)</li>
          <li>Demographic information (e.g., age, gender)</li>
          <li>Usage data (e.g., pages visited, interactions with our services)</li>
        </ul>
      </Typography>
      <DialogContentText mt={1}>
        <strong>How We Use Your Information:</strong>
      </DialogContentText>
      <DialogContentText>
        We use the collected information for various purposes, including:
      </DialogContentText>
      <Typography component="div" color="textSecondary">
        <ul style={{marginTop: '0'}}>
          <li>Providing and maintaining our services</li>
          <li>Personalizing your experience</li>
          <li>Improving our services</li>
          <li>Communicating with you</li>
          <li>Ensuring the security of our services</li>
        </ul>
      </Typography>
      <DialogContentText mt={1}>
        <strong>Data Protection and Security:</strong>
      </DialogContentText>
      <DialogContentText>
        We take appropriate measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. We follow industry best practices to ensure the security of your data.
      </DialogContentText>
      <DialogContentText mt={1}>
        <strong>User Rights:</strong>
      </DialogContentText>
      <DialogContentText>
        You have the right to:
      </DialogContentText>
      <Typography component="div" color="textSecondary">
        <ul style={{marginTop: '0'}}>
          <li>Access your personal information</li>
          <li>Correct inaccuracies in your information</li>
          <li>Request the deletion of your information</li>
          <li>Object to the processing of your information</li>
        </ul>
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);