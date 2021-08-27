import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UsersPanel from "./UsersPanel";
import PermissionsPanel from "./PermissionsPanel";

const useEditableTabs = () => {
  const [value, setValue] = React.useState(0);
  const [isEditingPerms, setIsEditingPerms] = React.useState(false);
  return React.useMemo(
    () => ({
      value,
      isEditingPerms,
      onChange: (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
      },
      onToggleEditPerms: () => setIsEditingPerms((v) => !v)
    }),
    [value, isEditingPerms]
  );
};

interface PermissionsUsersCardProps {
  userGroup: string;
  roleState: "initial" | "loading" | "error";
  onUserClick: () => void;
}

const PermissionsUsersCard = ({
  userGroup,
  roleState,
  onUserClick
}: PermissionsUsersCardProps) => {
  const {
    value,
    onChange,
    isEditingPerms,
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
        <Tab label="Permissions" />
        <Tab label="Users" disabled={isEditingPerms} />
      </Tabs>
      {value === 1 ? (
        <UsersPanel onUserClick={onUserClick} roleState={roleState} />
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
