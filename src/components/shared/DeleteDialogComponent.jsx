import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const DeleteDialogComponent = ({ open, onClose, onDelete, type, pluralType, count }) => {
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
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button onClick={onDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            ></Backdrop>
        </>
    );
};