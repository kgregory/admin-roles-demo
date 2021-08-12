import React from "react";
import PermissionsList from "../PermissionsList";
import { permissions } from "../data";

const PermissionsPanel = () => {
  return (
    <div role="tabpanel">
      <PermissionsList permissions={permissions} showInherited={false} />
    </div>
  );
};

export default PermissionsPanel;
