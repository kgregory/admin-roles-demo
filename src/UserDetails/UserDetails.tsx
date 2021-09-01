import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { users } from "core/constants/data";
import AdminAppBar from "core/components/AdminAppBar";
import CardEditor from "core/components/CardEditor";
import useDialog from "core/hooks/useDialog";
import toolbarRelativeStyles from "core/utils/toolbarRelativeStyles";
import type { DemoView } from "core/types";
import RolesPermissionsCard from "./RolesPermissionsCard";
import ContactCard from "./ContactCard";
import DeactivateButton from "./DeactivateButton";
import EditUserId from "./EditUserId";

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

interface UserDetailsProps {
  onChangeView: (view: DemoView) => void;
}

export default function UserDetails({ onChangeView }: UserDetailsProps) {
  const classes = useStyles();
  const userIdDialog = useDialog();
  const userState: "initial" | "loading" | "error" = "initial";
  const [user] = users;
  return (
    <div className={classes.root}>
      <AdminAppBar child onChangeView={onChangeView}>
        User Details
      </AdminAppBar>
      <Container className={classes.content}>
        <Grid spacing={2} container className={classes.section}>
          <Grid item xs={12} md={4} className={classes.section}>
            <ContactCard {...user} />
            <CardEditor
              label="STORIS User ID"
              value={user.userId}
              onClick={userIdDialog.onOpen}
            />
            <DeactivateButton />
          </Grid>
          <Grid item xs={12} md={8} className={classes.section}>
            <RolesPermissionsCard
              onRoleClick={() => onChangeView("roledetails")}
              userState={userState}
            />
          </Grid>
        </Grid>
      </Container>
      <EditUserId {...{ ...userIdDialog, userState, userId: user.userId }} />
    </div>
  );
}
