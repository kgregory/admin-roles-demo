import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AutocompleteComboboxField from "../AutocompleteComboboxField";
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
  const loading = useAutocompleteOptionsLoading();
  const disabled = loading || userState === "loading";
  const options = loading ? [] : roles;
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
