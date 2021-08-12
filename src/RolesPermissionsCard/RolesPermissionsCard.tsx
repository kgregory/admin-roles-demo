import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RolesPanel from "./RolesPanel";
import PermissionsPanel from "./PermissionsPanel";

const useEditableTabs = () => {
  const [value, setValue] = React.useState(0);
  const [isEditingRoles, setIsEditingRoles] = React.useState(false);
  const [isEditingPerms, setIsEditingPerms] = React.useState(false);
  return React.useMemo(
    () => ({
      value,
      isEditingRoles,
      isEditingPerms,
      onChange: (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
      },
      onToggleEditRoles: () => setIsEditingRoles((v) => !v),
      onToggleEditPerms: () => setIsEditingPerms((v) => !v)
    }),
    [value, isEditingRoles, isEditingPerms]
  );
};

const RolePermissionsCard = ({ onRoleClick, userState }) => {
  const { value, onChange } = useEditableTabs();

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
        <Tab label="Roles" />
        <Tab label="Permissions" />
      </Tabs>
      {value === 0 ? (
        <RolesPanel onRoleClick={onRoleClick} userState={userState} />
      ) : null}
      {value === 1 ? <PermissionsPanel /> : null}
    </Paper>
  );
};

export default RolePermissionsCard;
