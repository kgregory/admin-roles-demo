import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import InitialsAvatar from "core/components/InitialsAvatar";
import ConfirmationDialog from "core/components/ConfirmationDialog";
import { users } from "core/constants/data";
import useConfirmationDialog from "core/hooks/useConfirmationDialog";
import useDialog from "core/hooks/useDialog";
import stickyStyles from "core/utils/stickyStyles";
import AddUserToRole from "./AddUserToRole";
import getFullName from "./getFullName";

const useStyles = makeStyles((theme) => ({
  grow: {
    flex: 1
  },
  toolbar: {
    // better consistency with highlight mode
    "& > button:first-child": {
      marginLeft: -8
    },
    "& > button:last-child": {
      marginRight: -8
    },
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    ...stickyStyles(theme)
  }
}));

interface UsersPanelProps {
  onUserClick: () => void;
  roleState: "initial" | "loading" | "error";
}

const UsersPanel = ({ onUserClick, roleState }: UsersPanelProps) => {
  const classes = useStyles();
  const confirmationDialog = useConfirmationDialog(() => {});
  const sortedUsers = React.useMemo(
    () =>
      users
        .slice(0)
        .sort((a, b) =>
          (getFullName(a.name) ?? "").localeCompare(getFullName(b.name) ?? "")
        ),
    []
  );
  const addUserToRoleDialog = useDialog();

  const handleAddUser = () => addUserToRoleDialog.onOpen();

  return (
    <div role="tabpanel">
      <Toolbar className={classes.toolbar}>
        <Button
          color="inherit"
          startIcon={<AddIcon />}
          onClick={() => handleAddUser()}
        >
          Add Users
        </Button>
      </Toolbar>
      <List>
        {sortedUsers.map(({ name, email }) => {
          const fullname = getFullName(name) ?? "";
          return (
            <ListItem key={fullname} button onClick={onUserClick}>
              <ListItemIcon>
                <InitialsAvatar name={name} />
              </ListItemIcon>
              <ListItemText
                id={`user-${fullname}`}
                primary={fullname}
                secondary={email}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={confirmationDialog.onOpen}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <ConfirmationDialog
        dialogText="The selected user will no longer have this role"
        affirmativeText="Remove"
        open={confirmationDialog.open}
        onNegative={confirmationDialog.onNegative}
        onAffirmative={confirmationDialog.onAffirmative}
      />
      <AddUserToRole {...{ ...addUserToRoleDialog, roleState }} />
    </div>
  );
};

export default UsersPanel;
