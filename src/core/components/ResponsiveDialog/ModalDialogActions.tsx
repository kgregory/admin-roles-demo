import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

interface ModalDialogActionsProps {
  closeButtonDisabled: boolean;
  closeButtonText?: string;
  confirmButtonDisabled: boolean;
  confirmButtonFunc?: React.MouseEventHandler<HTMLButtonElement>;
  confirmButtonText?: string;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalDialogActions: React.FC<ModalDialogActionsProps> = ({
  closeButtonDisabled,
  closeButtonText,
  confirmButtonDisabled,
  confirmButtonFunc,
  confirmButtonText,
  onClose
}) =>
  closeButtonText != null || confirmButtonText != null ? (
    <DialogActions>
      {closeButtonText != null && (
        <Button
          color="primary"
          onClick={onClose}
          disabled={closeButtonDisabled}
        >
          {closeButtonText}
        </Button>
      )}
      {confirmButtonText != null && (
        <Button
          color="primary"
          onClick={confirmButtonFunc}
          disabled={confirmButtonDisabled}
        >
          {confirmButtonText}
        </Button>
      )}
    </DialogActions>
  ) : null;

export default ModalDialogActions;
