import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import type { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StickyListSubheader from "core/components/StickyListSubheader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper
    },
    gutters: ({ gutters }: Pick<PermissionsListProps, "gutters">) => ({
      paddingLeft: gutters != null ? theme.spacing(gutters) : undefined,
      paddingRight: gutters != null ? theme.spacing(gutters) : undefined
    }),
    chip: { marginLeft: theme.spacing(1) }
  })
);

interface ExpandableListItemProps extends ListItemProps {
  primary: string;
}

const ExpandableListItem = ({
  primary,
  children,
  ...other
}: ExpandableListItemProps) => {
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

interface Permission {
  category: string;
  description: string;
  active: boolean;
  inherited: boolean;
}

interface PermissionsListProps {
  checkedPermissions: any[];
  isEditing: boolean;
  permissions: Permission[];
  onToggleCheckedItem: (p: string) => void;
  showInherited?: boolean;
  subheader?: string;
  gutters?: number;
  stuckToolbars?: number;
}

const PermissionsList = ({
  checkedPermissions,
  isEditing,
  onToggleCheckedItem,
  permissions,
  showInherited = true,
  subheader,
  gutters,
  stuckToolbars
}: PermissionsListProps) => {
  const classes = useStyles({ gutters });
  const permissionsMap = React.useMemo(
    () =>
      permissions
        .sort((a, b) => a.category.localeCompare(b.category))
        .reduce((acc, perm) => {
          const categoryPerms = acc.get(perm.category) ?? [];
          categoryPerms.push(perm);
          acc.set(perm.category, categoryPerms);
          return acc;
        }, new Map<string, Permission[]>()),
    [permissions]
  );
  const permissionKeys = React.useMemo(() => [...permissionsMap.keys()], [
    permissionsMap
  ]);

  return (
    <List
      className={classes.root}
      component="nav"
      subheader={
        subheader != null ? (
          <StickyListSubheader
            component="div"
            id={`invitation-details-roles`}
            classes={{ gutters: classes.gutters }}
            stuckToolbars={stuckToolbars}
          >
            {subheader}
          </StickyListSubheader>
        ) : undefined
      }
    >
      {permissionKeys.map((category) => (
        <ExpandableListItem
          key={`item-category-${category}`}
          primary={category}
          classes={{ gutters: classes.gutters }}
        >
          {(permissionsMap.get(category) ?? []).map(
            ({ description: permission, active, inherited }) => (
              <ListItem
                key={`item-permissions-${permission}`}
                role={isEditing ? undefined : "listitem"}
                dense
                button={isEditing}
                disabled={isEditing && inherited}
                onClick={
                  isEditing ? onToggleCheckedItem(permission) : undefined
                }
                classes={{ gutters: classes.gutters }}
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
                    className={classes.chip}
                  />
                ) : null}
              </ListItem>
            )
          )}
        </ExpandableListItem>
      ))}
    </List>
  );
};

export default PermissionsList;
