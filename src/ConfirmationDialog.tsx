import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import type { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

interface ConfirmationDialogProps extends DialogProps {
  affirmativeText?: string;
  dialogText?: string;
  dialogTitle?: string;
  negativeText?: string;
  loading?: boolean;
  onAffirmative: () => void;
  onNegative: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  dialogTitle = "Are you sure?",
  dialogText = "You have unsaved changes.",
  affirmativeText = "Discard",
  negativeText = "Cancel",
  loading = false,
  onAffirmative,
  onNegative,
  ...other
}) => (
  <Dialog scroll="body" {...other} aria-labelledby="confirmation-dialog-title">
    <DialogTitle>
      <span id="confirmation-dialog-title">{dialogTitle}</span>
    </DialogTitle>
    <DialogContent>
      <Typography>{dialogText}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onNegative} disabled={loading} color="primary">
        {negativeText}
      </Button>
      <Button onClick={onAffirmative} disabled={loading} color="primary">
        {affirmativeText}
      </Button>
    </DialogActions>
    {loading && <LinearProgress />}
  </Dialog>
);

export default ConfirmationDialog;
