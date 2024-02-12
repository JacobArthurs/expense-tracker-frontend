import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const DeleteDialogComponent = ({ open, onClose, onDelete, type, pluralType, count, message }) => {
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{count > 1 ? `Delete ${pluralType}?`: `Delete ${type}?`}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {count > 1 ? 
                        `Are you sure you want to delete ${count} selected ${pluralType}?`
                    : 
                        `Are you sure you want to delete this ${type}?`
                    }
                    &nbsp;{message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={onClose} variant="outlined">Cancel</Button>
                  <Button onClick={onDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            ></Backdrop>
        </>
    );
};