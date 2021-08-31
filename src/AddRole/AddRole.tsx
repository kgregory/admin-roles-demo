import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AutocompleteComboboxField from "core/components/AutocompleteComboboxField";
import DialogContentText from "core/components/DialogContentText";
import ResponsiveEditDialog from "core/components/ResponsiveEditDialog";
import PermissionsList from "core/components/PermissionsList";
import { permissions, userGroups } from "core/constants/data";
import useCheckedPermissions from "core/hooks/useCheckedPermissions";
import type { DialogState } from "core/types";

const useStyles = makeStyles((theme) => ({
  /**
   * the top padding that is applied to the dialog content when it is the first child is not what we want here
   */
  dialogContentRoot: {
    "&:first-child": { paddingTop: 0 }
  },
  /**
   * for mobile we want to retain the dialog content's scroll behavior
   * we don't want it to put gutters around the permissions list
   * so we apply this class to an element that wraps both
   */
  content: { overflowY: "auto", "-webkit-overflow-scrolling": "touch" },
  firstField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  field: {
    marginBottom: theme.spacing(3),
    "&:last-child": { marginBottom: theme.spacing(1) }
  }
}));

interface AddRoleProps {
  open?: boolean;
  onClose: () => void;
  dialogState: DialogState;
}

const useDialogState = (dialogState: AddRoleProps["dialogState"]) =>
  React.useMemo(
    () => ({
      disabled: dialogState === "loading",
      closeButtonDisabled: dialogState === "loading",
      confirmButtonDisabled:
        dialogState === "loading" || dialogState === "fetching",
      fetchedFieldFetching: dialogState === "fetching",
      fetchedFieldDisabled:
        dialogState === "loading" ||
        dialogState === "fetching" ||
        dialogState === "fetchError",
      fetchedFieldError: dialogState === "fetchError",
      fieldError: dialogState === "error",
      isProcessing: dialogState === "loading"
    }),
    [dialogState]
  );

const AddRole = ({ open = false, onClose, dialogState }: AddRoleProps) => {
  const classes = useStyles();
  const {
    disabled,
    closeButtonDisabled,
    confirmButtonDisabled,
    fetchedFieldDisabled,
    fetchedFieldError,
    fetchedFieldFetching,
    fieldError,
    isProcessing
  } = useDialogState(dialogState);
  const { checked, handleToggle } = useCheckedPermissions(permissions);

  const options =
    dialogState === "loading" || dialogState === "fetching" ? [] : userGroups;

  return (
    <ResponsiveEditDialog
      open={open}
      onClose={onClose}
      labelId="add-new-role"
      title="Add New Role"
      closeButtonDisabled={closeButtonDisabled}
      confirmButtonText="Save"
      confirmButtonDisabled={confirmButtonDisabled}
      isProcessing={isProcessing}
    >
      <div className={classes.content}>
        <DialogContent classes={{ root: classes.dialogContentRoot }}>
          {dialogState === "fetchError" ? (
            <DialogContentText error>
              Unable to retrieve STORIS User Groups
            </DialogContentText>
          ) : null}
          <TextField
            id="role-name"
            label="Role Name"
            fullWidth
            error={fieldError}
            helperText={fieldError ? "Role Name is required." : undefined}
            disabled={disabled}
            className={classes.firstField}
          />
          <Autocomplete<{ description: string }>
            id="role-storis-user-group"
            options={options}
            getOptionSelected={(option, value) =>
              option.description === value.description
            }
            getOptionLabel={(option) => option.description}
            disabled={fetchedFieldDisabled}
            renderInput={(params) => (
              <AutocompleteComboboxField
                label="STORIS User Group"
                error={fieldError}
                errorMessage="STORIS User Group is required."
                loading={fetchedFieldFetching}
                variant="standard"
                helperText={
                  fetchedFieldError ? "No available user groups" : undefined
                }
                {...params}
                className={classes.field}
              />
            )}
          />
        </DialogContent>
        <PermissionsList
          gutters={3}
          isEditing={!disabled}
          subheader="Permissions"
          permissions={permissions}
          checkedPermissions={checked}
          onToggleCheckedItem={handleToggle}
          stuckToolbars={0}
        />
      </div>
    </ResponsiveEditDialog>
  );
};

export default AddRole;
