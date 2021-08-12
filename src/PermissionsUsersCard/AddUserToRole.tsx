import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import ResponsiveEditDialog from "../ResponsiveEditDialog";
import getFullName from "./getFullName";
import { users } from "./data";

interface AddUserToRoleProps {
  roleState: "initial" | "loading" | "error";
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const filterOptions = createFilterOptions<{ name: string; email: string }>({
  stringify: (option) => `${option.name}${option?.email}`
});

export default function AddUserToRole({
  roleState,
  open,
  onClose,
  onOpen
}: AddUserToRoleProps) {
  return (
    <ResponsiveEditDialog
      labelId="add-user-to-role"
      title="Add Users to Role"
      open={open}
      onClose={onClose}
      closeButtonDisabled={roleState === "loading"}
      confirmButtonText="Save"
      confirmButtonDisabled={roleState === "loading"}
      isProcessing={roleState === "loading"}
    >
      <DialogContent>
        <DialogContentText>
          To find a user, search by name or email address.
        </DialogContentText>
        <Autocomplete<{ name: string; email: string }>
          autoHighlight
          multiple
          filterSelectedOptions
          filterOptions={filterOptions}
          disabled={roleState === "loading"}
          id="add-user-to-role-combobox"
          options={users}
          getOptionLabel={(option) => getFullName(option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              error={roleState === "error"}
              id="add-user-to-role-input"
              helperText={
                roleState === "error" ? "User Group is required." : undefined
              }
              fullWidth
              variant="outlined"
              /** lastpass icon doesn't help here */
              inputProps={{ ...params.inputProps, "data-lpignore": true }}
            />
          )}
          renderOption={({ name, email }) => (
            <ListItemText
              primary={getFullName(name)}
              secondary={email}
              secondaryTypographyProps={{ gutterBottom: true }}
            />
          )}
        />
      </DialogContent>
    </ResponsiveEditDialog>
  );
}