import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AutocompleteComboboxField from "../AutocompleteComboboxField";
import DialogContentText from "../DialogContentText";
import ResponsiveEditDialog from "../ResponsiveEditDialog";
import useAutocompleteOptionsLoading from "../useAutocompleteOptionsLoading";
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
  /** to see the fetch error state set this to true */
  const fetchFailed: boolean = false;

  /** to see the mutation error state set this to true */
  const mutationFailed: boolean = true;

  const loading = useAutocompleteOptionsLoading();
  const disabled = loading || userState === "loading" || fetchFailed;
  const closeButtonDisabled = userState === "loading";
  const confirmButtonDisabled = disabled;
  const options = loading && !fetchFailed ? [] : roles;

  return (
    <ResponsiveEditDialog
      labelId="add-role-to-user"
      title="Add Role to User"
      open={open}
      onClose={onClose}
      closeButtonDisabled={closeButtonDisabled}
      confirmButtonText="Save"
      confirmButtonDisabled={confirmButtonDisabled}
      isProcessing={userState === "loading"}
    >
      <DialogContent>
        {fetchFailed ? (
          <DialogContentText error>Unable to retrieve roles</DialogContentText>
        ) : null}
        {mutationFailed ? (
          <DialogContentText error>
            Unable to save changes, update failed
          </DialogContentText>
        ) : null}
        <DialogContentText>
          To find a role, search by role name.
        </DialogContentText>
        <Autocomplete<{ description: string }>
          autoHighlight
          autoSelect
          disabled={disabled}
          id="add-role-to-user-combobox"
          options={options}
          getOptionSelected={(option, value) =>
            option.description === value.description
          }
          getOptionLabel={(option) => option.description}
          renderInput={(params) => (
            <AutocompleteComboboxField
              {...params}
              id="add-role-to-user-input"
              error={userState === "error"}
              errorMessage="Role is required."
              loading={loading}
            />
          )}
        />
      </DialogContent>
    </ResponsiveEditDialog>
  );
}
