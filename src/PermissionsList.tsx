import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper
    }
  })
);

const ExpandableListItem = ({ primary, children, ...other }) => {
  const [open, setOpen] = React.useState(true);
  const handleToggle = React.useCallback(() => {
    setOpen((o) => !o);
  }, []);
  return (
    <>
      <ListItem button onClick={handleToggle} {...other}>
        <ListItemText primary={primary} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};

const PermissionsList = ({
  checkedPermissions,
  isEditing,
  onToggleCheckedItem,
  permissions,
  showInherited = true
}) => {
  const classes = useStyles();
  const permissionsMap = React.useMemo(
    () =>
      permissions
        .sort((a, b) => a.category.localeCompare(b.category))
        .reduce((acc, perm) => {
          const categoryPerms = acc.get(perm.category) ?? [];
          categoryPerms.push(perm);
          acc.set(perm.category, categoryPerms);
          return acc;
        }, new Map()),
    [permissions]
  );
  const permissionKeys = React.useMemo(() => [...permissionsMap.keys()], [
    permissionsMap
  ]);

  return (
    <List className={classes.root} component="nav">
      {permissionKeys.map((category) => (
        <ExpandableListItem
          key={`item-category-${category}`}
          primary={category}
        >
          {permissionsMap
            .get(category)
            .map(({ description: permission, active, inherited }) => (
              <ListItem
                key={`item-permissions-${permission}`}
                role={isEditing ? undefined : "listitem"}
                dense
                button={isEditing}
                disabled={isEditing && inherited}
                onClick={
                  isEditing ? onToggleCheckedItem(permission) : undefined
                }
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={
                      inherited || checkedPermissions == null
                        ? active
                        : checkedPermissions[
                            permissions.findIndex(
                              ({ description }) => description === permission
                            )
                          ]
                    }
                    tabIndex={-1}
                    disableRipple
                    disabled={!isEditing || inherited}
                    inputProps={{
                      "aria-labelledby": `permission-${permission}`
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={permission} />
                {showInherited && inherited ? (
                  <Chip
                    variant="outlined"
                    color="secondary"
                    size="small"
                    label="Inherited"
                  />
                ) : null}
              </ListItem>
            ))}
        </ExpandableListItem>
      ))}
    </List>
  );
};

export default PermissionsList;
