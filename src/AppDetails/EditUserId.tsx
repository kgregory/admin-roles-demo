import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import ResponsiveEditDialog from "core/components/ResponsiveEditDialog";

interface EditUserIdProps {
  userId: string;
  appState: "initial" | "loading" | "error";
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function EditUserId({
  userId,
  appState,
  open,
  onClose,
  onOpen
}: EditUserIdProps) {
  return (
    <ResponsiveEditDialog
      labelId="edit-user-id"
      title="Edit STORIS User ID"
      open={open}
      onClose={onClose}
      closeButtonDisabled={appState === "loading"}
      confirmButtonText="Save"
      confirmButtonDisabled={appState === "loading"}
      isProcessing={appState === "loading"}
    >
      <DialogContent>
        <TextField
          autoFocus
          disabled={appState === "loading"}
          error={appState === "error"}
          id="edit-user-id-input"
          helperText={
            appState === "error" ? "STORIS User ID is required." : undefined
          }
          value={appState === "error" ? "" : userId}
          fullWidth
          inputProps={{ "data-lpignore": true }}
        />
      </DialogContent>
    </ResponsiveEditDialog>
  );
}
