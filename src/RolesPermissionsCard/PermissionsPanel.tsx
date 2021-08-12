import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { permissions, inheritedPermissions } from "./data";

const PermissionsPanel = () => {
  const sortedPermissions = React.useMemo(
    () =>
      permissions
        .concat(inheritedPermissions)
        .sort((a, b) => a.description.localeCompare(b.description)),
    []
  );
  return (
    <div role="tabpanel">
      <List>
        {sortedPermissions.map(({ description: permission, active }) => (
          <ListItem key={permission} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={active}
                tabIndex={-1}
                disableRipple
                disabled={true}
                inputProps={{ "aria-labelledby": `permission-${permission}` }}
              />
            </ListItemIcon>
            <ListItemText
              id={`permission-${permission}`}
              primary={permission}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PermissionsPanel;
