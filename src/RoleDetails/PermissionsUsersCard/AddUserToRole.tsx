import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import AutocompleteComboboxField from "../../core/components/AutocompleteComboboxField";
import DialogContentText from "../../core/components/DialogContentText";
import ResponsiveEditDialog from "../../core/components/ResponsiveEditDialog";
import { users } from "../../core/constants/data";
import useAutocompleteOptionsLoading from "../../core/hooks/useAutocompleteOptionsLoading";
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
  /** to see the fetch error state set this to true */
  const fetchFailed: boolean = false;

  /** to see the mutation error state set this to true */
  const mutationFailed: boolean = false;

  const loading = useAutocompleteOptionsLoading();
  const disabled = loading || roleState === "loading" || fetchFailed;
  const closeButtonDisabled = roleState === "loading";
  const confirmButtonDisabled = disabled;
  const options = loading && !fetchFailed ? [] : users;
  return (
    <ResponsiveEditDialog
      labelId="add-user-to-role"
      title="Add Users to Role"
      open={open}
      onClose={onClose}
      closeButtonDisabled={closeButtonDisabled}
      confirmButtonText="Save"
      confirmButtonDisabled={confirmButtonDisabled}
      isProcessing={roleState === "loading"}
    >
      <DialogContent>
        {fetchFailed ? (
          <DialogContentText error>Unable to retrieve users</DialogContentText>
        ) : null}
        {mutationFailed ? (
          <DialogContentText error>
            Unable to save changes, update failed
          </DialogContentText>
        ) : null}
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
