import React from "react";
import EditToolbar from "./EditToolbar";
import ConfirmationDialog from "core/components/ConfirmationDialog";
import PermissionsList from "core/components/PermissionsList";
import { permissions } from "core/constants/data";
import useCheckedPermissions from "core/hooks/useCheckedPermissions";
import useConfirmationDialog from "core/hooks/useConfirmationDialog";

interface PermissionsPanelProps {
  userGroup: string;
  isEditing: boolean;
  onToggleEdit: () => void;
}

const PermissionsPanel = ({
  userGroup,
  isEditing,
  onToggleEdit
}: PermissionsPanelProps) => {
  const {
    checked,
    count,
    handleToggle,
    originalChecked,
    setChecked,
    setCount,
    setOriginalChecked
  } = useCheckedPermissions(permissions);

  const handleCancel = React.useCallback(() => {
    setChecked(originalChecked);
    onToggleEdit();
  }, [onToggleEdit, originalChecked, setChecked]);

  const confirmationDialog = useConfirmationDialog(handleCancel);

  const handleEditToggle = () => {
    if (!isEditing) {
      setCount(0);
      onToggleEdit();
    } else if (count > 0) {
      confirmationDialog.onOpen();
    } else {
      handleCancel();
    }
  };

  const handleSave = () => {
    setOriginalChecked(checked);
    onToggleEdit();
  };

  return (
    <div role="tabpanel">
      <EditToolbar
        isEditing={isEditing}
        onToggleEdit={handleEditToggle}
        onSave={handleSave}
        editTitle={`${count} changed`}
        sticky
      />
      <PermissionsList
        permissions={permissions}
        checkedPermissions={checked}
        isEditing={isEditing}
        onToggleCheckedItem={handleToggle}
      />
      <ConfirmationDialog
        open={confirmationDialog.open}
        onNegative={confirmationDialog.onNegative}
        onAffirmative={confirmationDialog.onAffirmative}
      />
    </div>
  );
};

export default PermissionsPanel;
