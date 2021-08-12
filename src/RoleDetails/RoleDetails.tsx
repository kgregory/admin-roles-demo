import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DeleteButton from "./DeleteButton";
import EditRoleName from "./EditRoleName";
import EditUserGroup from "./EditUserGroup";
import PermissionsUsersCard from "../PermissionsUsersCard";
import toolbarRelativeStyles from "../toolbarRelativeStyles";
import AdminAppBar from "../AdminAppBar";
import CardEditor from "../CardEditor";
import useDialog from "../useDialog";

const useStyles = makeStyles((theme) => ({
  // this is what our theme usually uses
  "@global": {
    body: {
      background: "#fafafa"
    }
  },
  root: {
    flexGrow: 1
  },
  content: {
    ...toolbarRelativeStyles(
      "marginTop",
      theme,
      (value) => value + theme.spacing(3)
    ),
    marginBottom: theme.spacing(3)
  },
  section: {
    "& > *": {
      marginBottom: theme.spacing(3)
    },
    "& > *:last-child": {
      marginBottom: theme.spacing(0)
    }
  }
}));

export default function RoleDetails({ onChangeView }) {
  const classes = useStyles();
  const roleName = "Manager";
  const userGroup = "Associates With Keys";
  const roleNameDialog = useDialog();
  const userGroupDialog = useDialog();
  const roleState: "initial" | "loading" | "error" = "initial";
  return (
    <div className={classes.root}>
      <AdminAppBar>Role Details</AdminAppBar>
      <Container className={classes.content}>
        <Grid spacing={2} container className={classes.section}>
          <Grid item xs={12} md={4} className={classes.section}>
            <CardEditor
              label="Role Name"
              value={roleName}
              onClick={roleNameDialog.onOpen}
            />
            <CardEditor
              label="User Group"
              value={userGroup}
              onClick={userGroupDialog.onOpen}
            />
            <DeleteButton />
          </Grid>
          <Grid item xs={12} md={8} className={classes.section}>
            <PermissionsUsersCard
              userGroup={userGroup}
              onUserClick={() => onChangeView("userdetails")}
            />
          </Grid>
        </Grid>
      </Container>
      <EditRoleName {...{ ...roleNameDialog, roleState, roleName }} />
      <EditUserGroup {...{ ...userGroupDialog, roleState, userGroup }} />
    </div>
  );
}
