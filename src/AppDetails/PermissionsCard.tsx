import React from "react";
import Paper from "@material-ui/core/Paper";
import PermissionsList from "core/components/PermissionsList";
import { permissions } from "core/constants/data";

const PermissionsPanel = () => {
  return (
    <Paper>
      <PermissionsList
        subheader="Permissions"
        permissions={permissions}
        showInherited={false}
      />
    </Paper>
  );
};

export default PermissionsPanel;
