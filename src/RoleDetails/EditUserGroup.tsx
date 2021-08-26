import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AutocompleteComboboxField from "../AutocompleteComboboxField";
import DialogContentText from "../DialogContentText";
import ResponsiveEditDialog from "../ResponsiveEditDialog";
import useAutocompleteOptionsLoading from "../useAutocompleteOptionsLoading";
import { userGroups } from "../data";

interface EditRoleNameProps {
  userGroup: string;
  roleState: "initial" | "loading" | "error";
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function EditUserGroup({
  userGroup,
  roleState,
  open,
  onClose,
  onOpen
}: EditRoleNameProps) {
  /** to see the fetch error state set this to true */
  const fetchFailed: boolean = false;

  /** to see the mutation error state set this to true */
  const mutationFailed: boolean = false;

  const loading = useAutocompleteOptionsLoading();
  const disabled = loading || roleState === "loading" || fetchFailed;
  const closeButtonDisabled = roleState === "loading";
  const confirmButtonDisabled = disabled;
  const options = loading && !fetchFailed ? [] : userGroups;
  const currentValue = userGroups.find(
    ({ description }) => description === userGroup
  );
  const value =
    fetchFailed || loading || roleState === "error" ? "" : currentValue;
  return (
    <ResponsiveEditDialog
      labelId="edit-user-group"
      title="Edit STORIS User Group"
      open={open}
      onClose={onClose}
      closeButtonDisabled={closeButtonDisabled}
      confirmButtonText="Save"
      confirmButtonDisabled={confirmButtonDisabled}
      isProcessing={roleState === "loading"}
    >
      <DialogContent>
        {fetchFailed ? (
          <DialogContentText error>
            Unable to retrieve STORIS User Groups
          </DialogContentText>
        ) : null}
        {mutationFailed ? (
          <DialogContentText error>
            Unable to save changes, update failed
          </DialogContentText>
        ) : null}
        <Autocomplete<{ description: string }>
          autoHighlight
          autoSelect
          disabled={disabled}
          id="edit-user-group-combobox"
          options={options}
          getOptionSelected={(option, value) =>
            option.description === value.description
          }
          getOptionLabel={(option) => option.description}
          value={value}
          renderInput={(params) => (
            <AutocompleteComboboxField
              error={roleState === "error"}
              errorMessage="STORIS User Group is required."
              id="edit-user-group-input"
              loading={loading}
              {...params}
            />
          )}
        />
      </DialogContent>
    </ResponsiveEditDialog>
  );
}
