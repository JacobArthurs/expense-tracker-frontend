import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'

export const DialogCloseButtonComponent = ({ onClose }) => {
    return (
        <IconButton aria-label="Close" onClick={onClose} sx={{ position: "absolute", right: 4, top: 4 }}>
            <CloseIcon />
        </IconButton>
    );
}
