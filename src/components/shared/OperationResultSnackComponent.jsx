import { Alert, Snackbar } from "@mui/material";

export const OperationResultSnackComponent = ({ open, handleClose, severity, message }) => {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={5000} 
            onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={severity}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
        </Snackbar>
    );
}