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
  field: { marginBottom: theme.spacing(2.5) }
}));

interface AddRoleProps {
  open?: boolean;
  onClose: () => void;
  dialogState: DialogState;
}

const AddRole = ({ open = false, onClose, dialogState }: AddRoleProps) => {
  const classes = useStyles();
  const { checked, handleToggle } = useCheckedPermissions(permissions);
  const disabled = dialogState === "loading";
  const closeButtonDisabled = dialogState === "loading";
  const confirmButtonDisabled =
    dialogState === "loading" || dialogState === "fetching";
  const isProcessing = dialogState === "loading";
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
      <DialogContent>
        {dialogState === "fetchError" ? (
          <DialogContentText error>
            Unable to retrieve STORIS User Groups
          </DialogContentText>
        ) : null}
        <TextField
          id="role-name"
          label="Role Name"
          fullWidth
          error={dialogState === "error"}
          helperText={
            dialogState === "error" ? "Role Name is required." : undefined
          }
          disabled={disabled}
          className={classes.field}
        />
        <Autocomplete<{ description: string }>
          id="role-storis-user-group"
          options={options}
          getOptionSelected={(option, value) =>
            option.description === value.description
          }
          getOptionLabel={(option) => option.description}
          disabled={
            disabled ||
            dialogState === "fetching" ||
            dialogState === "fetchError"
          }
          renderInput={(params) => (
            <AutocompleteComboboxField
              label="STORIS User Group"
              error={dialogState === "error"}
              errorMessage="STORIS User Group is required."
              loading={dialogState === "fetching"}
              variant="standard"
              helperText={
                dialogState === "fetchError"
                  ? "No available user groups"
                  : undefined
              }
              {...params}
              className={classes.field}
            />
          )}
        />
      </DialogContent>
      <PermissionsList
        gutters={3}
        isEditing={true}
        subheader="Permissions"
        permissions={permissions}
        checkedPermissions={checked}
        onToggleCheckedItem={handleToggle}
      />
    </ResponsiveEditDialog>
  );
};

export default AddRole;
