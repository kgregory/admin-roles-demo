import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import ResponsiveEditDialog from "../ResponsiveEditDialog";

interface EditRoleNameProps {
  roleName: string;
  roleState: "initial" | "loading" | "error";
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function EditRoleName({
  roleName,
  roleState,
  open,
  onClose,
  onOpen
}: EditRoleNameProps) {
  return (
    <ResponsiveEditDialog
      labelId="edit-role-name"
      title="Edit Role Name"
      open={open}
      onClose={onClose}
      closeButtonDisabled={roleState === "loading"}
      confirmButtonText="Save"
      confirmButtonDisabled={roleState === "loading"}
      isProcessing={roleState === "loading"}
    >
      <DialogContent>
        <TextField
          autoFocus
          disabled={roleState === "loading"}
          error={roleState === "error"}
          id="edit-role-name-input"
          helperText={
            roleState === "error" ? "Role Name is required." : undefined
          }
          value={roleState === "error" ? "" : roleName}
          fullWidth
        />
      </DialogContent>
    </ResponsiveEditDialog>
  );
}
