import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";

const DeleteDialog = ({
  open,
  title = "Confirm",
  message = "Are you sure?",
  onClose,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
  reason,
  setReason,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Zoom}
      onClose={onClose}
      disableRestoreFocus
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Reason for deleting</FormLabel>
          <RadioGroup
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <FormControlLabel
              value="sold"
              control={<Radio />}
              label="The product has been sold"
            />
            <FormControlLabel
              value="no_longer_selling"
              control={<Radio />}
              label="I no longer want to sell it"
            />
            <FormControlLabel
              value="incorrect_info"
              control={<Radio />}
              label="The listing information is incorrect"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other reason"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button
          onClick={onConfirm}
          autoFocus
          disabled={!reason} // prevent delete if no reason selected
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
