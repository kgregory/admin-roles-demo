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
import EditToolbar from "./EditToolbar";
import useConfirmationDialog from "../useConfirmationDialog";
import ConfirmationDialog from "../ConfirmationDialog";
import { permissions } from "./data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper
    }
  })
);

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

const PermissionsPanel = ({ userGroup, isEditing, onToggleEdit }) => {
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
    []
  );
  const permissionKeys = React.useMemo(() => [...permissionsMap.keys()], [
    permissionsMap
  ]);

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
                  onClick={isEditing ? handleToggle(permission) : undefined}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={
                        inherited
                          ? active
                          : checked[
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
                  {inherited ? (
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
      <ConfirmationDialog
        open={confirmationDialog.open}
        onNegative={confirmationDialog.onNegative}
        onAffirmative={confirmationDialog.onAffirmative}
      />
    </div>
  );
};

export default PermissionsPanel;
