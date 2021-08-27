import React from "react";
import EditToolbar from "./EditToolbar";
import ConfirmationDialog from "../../core/components/ConfirmationDialog";
import PermissionsList from "../../core/components/PermissionsList";
import { permissions } from "../../core/constants/data";
import useConfirmationDialog from "../../core/hooks/useConfirmationDialog";

const useCheckedItems = (items) => {
  const [originalChecked, setOriginalChecked] = React.useState(
    items.map(({ active }) => active)
  );
  const [checked, setChecked] = React.useState(originalChecked);
  const [count, setCount] = React.useState(0);

  return React.useMemo(
    () => ({
      checked,
      count,
      originalChecked,
      setChecked,
      setCount,
      setOriginalChecked,
      handleToggle: (value: string) => () => {
        const currentIndex = items.findIndex(
          ({ description }) => description === value
        );
        const newChecked = [...checked];
        newChecked[currentIndex] = !newChecked[currentIndex];
        setChecked(newChecked);
        setCount((c) =>
          newChecked[currentIndex] !== originalChecked[currentIndex]
            ? (c += 1)
            : (c -= 1)
        );
      }
    }),
    [checked, count, items, originalChecked]
  );
};

const PermissionsPanel = ({ userGroup, isEditing, onToggleEdit }) => {
  const {
    checked,
    count,
    handleToggle,
    originalChecked,
    setChecked,
    setCount,
    setOriginalChecked
  } = useCheckedItems(permissions);

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