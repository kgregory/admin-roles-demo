import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditToolbar from "./EditToolbar";
import StickyListSubheader from "../StickyListSubheader";
import useConfirmationDialog from "../useConfirmationDialog";
import ConfirmationDialog from "../ConfirmationDialog";
import { permissions, inheritedPermissions } from "./data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper
    },
    listSection: {
      backgroundColor: "inherit"
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0
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

const PermissionsPanel = ({
  userGroup,
  isEditing,
  onUserClick,
  onToggleEdit
}) => {
  const classes = useStyles();
  const sortedPermissions = React.useMemo(
    () =>
      permissions.sort((a, b) => a.description.localeCompare(b.description)),
    []
  );
  const sortedInheritedPermissions = React.useMemo(
    () =>
      inheritedPermissions.sort((a, b) =>
        a.description.localeCompare(b.description)
      ),
    []
  );
  const {
    checked,
    count,
    handleToggle,
    originalChecked,
    setChecked,
    setCount,
    setOriginalChecked
  } = useCheckedItems(sortedPermissions);

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
      <List className={classes.root} subheader={<li />}>
        <li key={`section-permissions`} className={classes.listSection}>
          <ul className={classes.ul}>
            <StickyListSubheader stuckToolbars={2}>
              Permissions
            </StickyListSubheader>
            {sortedPermissions.map(({ description: permission, active }, i) => (
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
                    checked={checked[i]}
                    tabIndex={-1}
                    disableRipple
                    disabled={!isEditing}
                    inputProps={{
                      "aria-labelledby": `permission-${permission}`
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={permission} />
              </ListItem>
            ))}
          </ul>
        </li>
        <li
          key={`section-inheritedPermissions`}
          className={classes.listSection}
        >
          <ul className={classes.ul}>
            <StickyListSubheader
              stuckToolbars={2}
            >{`Permissions Inherited from ${userGroup}`}</StickyListSubheader>
            {sortedInheritedPermissions.map(
              ({ description: permission, active }, i) => (
                <ListItem key={`item-inheritedPermissions-${permission}`} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={active}
                      tabIndex={-1}
                      disableRipple
                      disabled={true}
                      inputProps={{
                        "aria-labelledby": `permission-${permission}`
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={permission} />
                </ListItem>
              )
            )}
          </ul>
        </li>
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
