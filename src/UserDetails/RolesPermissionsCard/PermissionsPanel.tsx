import React from "react";
import PermissionsList from "core/components/PermissionsList";
import { permissions } from "core/constants/data";

const PermissionsPanel = () => {
  return (
    <div role="tabpanel">
      <PermissionsList permissions={permissions} showInherited={false} />
    </div>
  );
};

export default PermissionsPanel;
