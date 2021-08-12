import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UsersPanel from "./UsersPanel";
import PermissionsPanel from "./PermissionsPanel";

const useEditableTabs = () => {
  const [value, setValue] = React.useState(0);
  const [isEditingUsers, setIsEditingUsers] = React.useState(false);
  const [isEditingPerms, setIsEditingPerms] = React.useState(false);
  return React.useMemo(
    () => ({
      value,
      isEditingUsers,
      isEditingPerms,
      onChange: (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
      },
      onToggleEditUsers: () => setIsEditingUsers((v) => !v),
      onToggleEditPerms: () => setIsEditingPerms((v) => !v)
    }),
    [value, isEditingUsers, isEditingPerms]
  );
};

const PermissionsUsersCard = ({ userGroup, roleState, onUserClick }) => {
  const {
    value,
    onChange,
    isEditingPerms,
    isEditingUsers,
    onToggleEditUsers,
    onToggleEditPerms
  } = useEditableTabs();

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={onChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="user roles/permissions tabs"
      >
        <Tab label="Permissions" disabled={isEditingUsers} />
        <Tab label="Users" disabled={isEditingPerms} />
      </Tabs>
      {value === 1 ? (
        <UsersPanel
          isEditing={isEditingUsers}
          onToggleEdit={onToggleEditUsers}
          onUserClick={onUserClick}
          roleState={roleState}
        />
      ) : null}
      {value === 0 ? (
        <PermissionsPanel
          userGroup={userGroup}
          isEditing={isEditingPerms}
          onToggleEdit={onToggleEditPerms}
        />
      ) : null}
    </Paper>
  );
};

export default PermissionsUsersCard;
