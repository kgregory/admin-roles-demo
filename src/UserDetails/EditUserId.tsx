import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import ResponsiveEditDialog from "/src/core/components/ResponsiveEditDialog";

interface EditUserIdProps {
  userId: string;
  userState: "initial" | "loading" | "error";
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function EditUserId({
  userId,
  userState,
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
      closeButtonDisabled={userState === "loading"}
      confirmButtonText="Save"
      confirmButtonDisabled={userState === "loading"}
      isProcessing={userState === "loading"}
    >
      <DialogContent>
        <TextField
          autoFocus
          disabled={userState === "loading"}
          error={userState === "error"}
          id="edit-user-id-input"
          helperText={
            userState === "error" ? "STORIS User ID is required." : undefined
          }
          value={userState === "error" ? "" : userId}
          fullWidth
          inputProps={{ "data-lpignore": true }}
        />
      </DialogContent>
    </ResponsiveEditDialog>
  );
}
