import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";

const ConfirmDialog = ({
  open,
  title = "Confirm",
  message = "Are you sure?",
  onClose,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Zoom} // Use Zoom directly here
      onClose={onClose}
      disableRestoreFocus
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
