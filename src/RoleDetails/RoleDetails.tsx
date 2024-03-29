import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AdminAppBar from "core/components/AdminAppBar";
import CardEditor from "core/components/CardEditor";
import useDialog from "core/hooks/useDialog";
import toolbarRelativeStyles from "core/utils/toolbarRelativeStyles";
import type { DemoView } from "core/types";
import PermissionsUsersCard from "./PermissionsUsersCard";
import DeleteButton from "./DeleteButton";
import EditRoleName from "./EditRoleName";
import EditUserGroup from "./EditUserGroup";

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
      (value) => (value as number) + theme.spacing(3)
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

interface RoleDetailsProps {
  onChangeView: (view: DemoView) => void;
}

export default function RoleDetails({ onChangeView }: RoleDetailsProps) {
  const classes = useStyles();
  const roleName = "Manager";
  const userGroup = "Associates With Keys";
  const roleNameDialog = useDialog();
  const userGroupDialog = useDialog();
  const roleState: "initial" | "loading" | "error" = "initial";
  return (
    <div className={classes.root}>
      <AdminAppBar child onChangeView={onChangeView}>
        Role Details
      </AdminAppBar>
      <Container className={classes.content}>
        <Grid spacing={2} container className={classes.section}>
          <Grid item xs={12} md={4} className={classes.section}>
            <CardEditor
              label="Role Name"
              value={roleName}
              onClick={roleNameDialog.onOpen}
            />
            <CardEditor
              label="STORIS User Group"
              value={userGroup}
              onClick={userGroupDialog.onOpen}
            />
            <DeleteButton />
          </Grid>
          <Grid item xs={12} md={8} className={classes.section}>
            <PermissionsUsersCard
              userGroup={userGroup}
              roleState={roleState}
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
