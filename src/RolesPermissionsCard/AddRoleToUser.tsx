import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ResponsiveEditDialog from "../ResponsiveEditDialog";
import { roles } from "../data";

interface AddRoleToUserProps {
  userState: "initial" | "loading" | "error";
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function AddRoleToUser({
  userState,
  open,
  onClose,
  onOpen
}: AddRoleToUserProps) {
  return (
    <ResponsiveEditDialog
      labelId="add-role-to-user"
      title="Add Role to User"
      open={open}
      onClose={onClose}
      closeButtonDisabled={userState === "loading"}
      confirmButtonText="Save"
      confirmButtonDisabled={userState === "loading"}
      isProcessing={userState === "loading"}
    >
      <DialogContent>
        <DialogContentText>
          To find a role, search by role name.
        </DialogContentText>
        <Autocomplete<{ description: string }>
          autoHighlight
          autoSelect
          disabled={userState === "loading"}
          id="add-role-to-user-combobox"
          options={roles}
          getOptionLabel={(option) => option.description}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              error={userState === "error"}
              id="add-role-to-user-input"
              helperText={
                userState === "error" ? "Role is required." : undefined
              }
              fullWidth
              variant="outlined"
              /** lastpass icon doesn't help here */
              inputProps={{ ...params.inputProps, "data-lpignore": true }}
            />
          )}
        />
      </DialogContent>
    </ResponsiveEditDialog>
  );
}
