import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AdminAppBar from "../AdminAppBar";
import CardEditor from "../CardEditor";
import RolesPermissionsCard from "../RolesPermissionsCard";
import toolbarRelativeStyles from "../toolbarRelativeStyles";
import useDialog from "../useDialog";
import { users } from "../data";
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

export default function UserDetails({ onChangeView }) {
  const classes = useStyles();
  const userIdDialog = useDialog();
  const userState: "initial" | "loading" | "error" = "initial";
  const [user] = users;
  return (
    <div className={classes.root}>
      <AdminAppBar onChangeView={onChangeView}>User Details</AdminAppBar>
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
