import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { DialogCloseButtonComponent } from '../shared/DialogCloseButtonComponent';

export const TermsDialogComponent = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogCloseButtonComponent onClose={onClose} />
    <DialogTitle>Terms of Service</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Welcome to Expense Tracker! By using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </DialogContentText>
      <DialogContentText mt={1}>
        <strong>Use of Services:</strong>
      </DialogContentText>
      <DialogContentText>
        You agree to use our services for lawful purposes and in a way that does not violate the rights of others or inhibit their use and enjoyment of the services. Prohibited activities include but are not limited to:
      </DialogContentText>
      <Typography component="div" color="textSecondary">
        <ul style={{marginTop: '0'}}>
          <li>Violating laws and regulations</li>
          <li>Interfering with or disrupting the services</li>
          <li>Unauthorized access to accounts or systems</li>
          <li>Posting harmful or objectionable content</li>
        </ul>
      </Typography>
      <DialogContentText mt={1}>
        <strong>Intellectual Property:</strong>
      </DialogContentText>
      <DialogContentText>
        All content provided on our services, including text, graphics, logos, images, and software, is the property of Jacob Arthurs and protected by intellectual property laws.
      </DialogContentText>
      <DialogContentText mt={1}>
        <strong>Termination:</strong>
      </DialogContentText>
      <DialogContentText>
        We reserve the right to terminate or suspend your account and access to our services at our discretion, without notice, for any reason, including if you violate these terms.
      </DialogContentText>
      <DialogContentText mt={1}>
        <strong>Disclaimer:</strong>
      </DialogContentText>
      <DialogContentText>
        Our services are provided &quot;as is&quot; without any warranty or representation, express or implied. We do not guarantee that the services will be error-free or uninterrupted.
      </DialogContentText>
      <DialogContentText mt={1}>
        <strong>Changes to Terms:</strong>
      </DialogContentText>
      <DialogContentText>
        We reserve the right to update, change, or replace any part of these terms. It is your responsibility to check this page periodically for changes.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);