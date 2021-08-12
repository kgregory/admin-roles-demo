import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ResponsiveEditDialog from "../ResponsiveEditDialog";

interface EditRoleNameProps {
  userGroup: string;
  roleState: "initial" | "loading" | "error";
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const userGroups = [
  { description: "Managers" },
  { description: "Associates With Keys" },
  { description: "Associates" },
  { description: "All Employees" },
  { description: "Senior Managers" },
  { description: "Salespeople" },
  { description: "Everyone except for Bob Quigley" },
  { description: "Bob Quigley and those like him" }
];

export default function EditUserGroup({
  userGroup,
  roleState,
  open,
  onClose,
  onOpen
}: EditRoleNameProps) {
  const value = userGroups.find(({ description }) => description === userGroup);
  return (
    <ResponsiveEditDialog
      labelId="edit-user-group"
      title="Edit User Group"
      open={open}
      onClose={onClose}
      closeButtonDisabled={roleState === "loading"}
      confirmButtonText="Save"
      confirmButtonDisabled={roleState === "loading"}
      isProcessing={roleState === "loading"}
    >
      <DialogContent>
        <Autocomplete<{ description: string }>
          autoHighlight
          autoSelect
          disabled={roleState === "loading"}
          id="edit-user-group-combobox"
          options={userGroups}
          getOptionLabel={(option) => option.description}
          value={roleState === "error" ? "" : value}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              error={roleState === "error"}
              id="edit-user-group-input"
              helperText={
                roleState === "error" ? "User Group is required." : undefined
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
