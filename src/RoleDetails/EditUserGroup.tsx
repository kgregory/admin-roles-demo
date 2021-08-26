import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AutocompleteComboboxField from "../AutocompleteComboboxField";
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
  const loading = useAutocompleteOptionsLoading();
  const disabled = loading || roleState === "loading";
  const options = loading ? [] : userGroups;
  const currentValue = userGroups.find(
    ({ description }) => description === userGroup
  );
  const value = loading || roleState === "error" ? "" : currentValue;
  return (
    <ResponsiveEditDialog
      labelId="edit-user-group"
      title="Edit STORIS User Group"
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
