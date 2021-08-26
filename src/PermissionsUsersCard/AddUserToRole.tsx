import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import AutocompleteComboboxField from "../AutocompleteComboboxField";
import ResponsiveEditDialog from "../ResponsiveEditDialog";
import useAutocompleteOptionsLoading from "../useAutocompleteOptionsLoading";
import { users } from "../data";
import getFullName from "./getFullName";

interface AddUserToRoleProps {
  roleState: "initial" | "loading" | "error";
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const filterOptions = createFilterOptions<typeof users[0]>({
  stringify: (option) => `${getFullName(option.name)}${option?.email}`
});

export default function AddUserToRole({
  roleState,
  open,
  onClose,
  onOpen
}: AddUserToRoleProps) {
  const loading = useAutocompleteOptionsLoading();
  const disabled = loading || roleState === "loading";
  const options = loading ? [] : users;
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
        <Autocomplete<typeof users[0]>
          autoHighlight
          multiple
          filterSelectedOptions
          filterOptions={filterOptions}
          disabled={disabled}
          id="add-user-to-role-combobox"
          options={options}
          getOptionLabel={(option) => getFullName(option.name)}
          renderInput={(params) => (
            <AutocompleteComboboxField
              {...params}
              error={roleState === "error"}
              id="add-user-to-role-input"
              errorMessage="User Group is required."
              loading={loading}
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
