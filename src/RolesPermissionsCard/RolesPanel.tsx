import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationDialog from "../ConfirmationDialog";
import useConfirmationDialog from "../useConfirmationDialog";
import { roles } from "../data";

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
    paddingRight: theme.spacing(2)
  }
}));

const RolesPanel = ({ onRoleClick }) => {
  const classes = useStyles();
  const confirmationDialog = useConfirmationDialog(() => {});
  const sortedRoles = React.useMemo(
    () =>
      roles.slice(0).sort((a, b) => a.description.localeCompare(b.description)),
    []
  );

  const handleAddRole = () => {};

  return (
    <div role="tabpanel">
      <Toolbar className={classes.toolbar}>
        <Button
          color="inherit"
          startIcon={<AddIcon />}
          onClick={() => handleAddRole()}
        >
          Add Role
        </Button>
      </Toolbar>
      <List>
        {sortedRoles.map(({ description: role }) => (
          <ListItem key={role} button onClick={onRoleClick}>
            <ListItemText id={`role-${role}`} primary={role} />
            <ListItemSecondaryAction>
              <IconButton onClick={confirmationDialog.onOpen}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <ConfirmationDialog
        dialogText="The user will no longer have the selected role"
        affirmativeText="Remove"
        open={confirmationDialog.open}
        onNegative={confirmationDialog.onNegative}
        onAffirmative={confirmationDialog.onAffirmative}
      />
    </div>
  );
};

export default RolesPanel;
