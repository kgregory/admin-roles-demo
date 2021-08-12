import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AdminAppBar from "../AdminAppBar";
import CardEditor from "../CardEditor";
import RolesPermissionsCard from "../RolesPermissionsCard";
import toolbarRelativeStyles from "../toolbarRelativeStyles";
import ContactCard from "./ContactCard";
import DeactivateButton from "./DeactivateButton";

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
  const user = {
    name: { first: "Ken", last: "Gregory" },
    email: "kjg@storis.com",
    createdAt: new Date("1980-07-25T23:50:00").toISOString(),
    lastActivity: new Date().toISOString()
  };
  return (
    <div className={classes.root}>
      <AdminAppBar>User Details</AdminAppBar>
      <Container className={classes.content}>
        <Grid spacing={2} container className={classes.section}>
          <Grid item xs={12} md={4} className={classes.section}>
            <ContactCard {...user} />
            <CardEditor label="STORIS User ID" value="KJG" />
            <DeactivateButton />
          </Grid>
          <Grid item xs={12} md={8} className={classes.section}>
            <RolesPermissionsCard
              onRoleClick={() => onChangeView("roledetails")}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
