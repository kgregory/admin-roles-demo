import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AdminAppBar from "core/components/AdminAppBar";
import CardData from "core/components/CardData";
import toolbarRelativeStyles from "core/utils/toolbarRelativeStyles";
import type { DemoView } from "core/types";
import DeleteButton from "./DeleteButton";
import DetailsCard from "./DetailsCard";
import ResendButton from "./ResendButton";
import RolesCard from "./RolesCard";

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

interface InvitationDetailsProps {
  onChangeView: (view: DemoView) => void;
}

export default function InvitationDetails({
  onChangeView
}: InvitationDetailsProps) {
  const classes = useStyles();
  const invitation = {
    email: "kjg@storis.com",
    userId: "KJG",
    expirationDate: "2021-07-25"
  };
  return (
    <div className={classes.root}>
      <AdminAppBar child onChangeView={onChangeView}>
        Invitation Details
      </AdminAppBar>
      <Container className={classes.content}>
        <Grid spacing={2} container className={classes.section}>
          <Grid item xs={12} md={4} className={classes.section}>
            <DetailsCard
              email={invitation.email}
              expirationDate={invitation.expirationDate}
            />
            <CardData label="STORIS User ID" value={invitation.userId} />
            <ResendButton />
            <DeleteButton />
          </Grid>
          <Grid item xs={12} md={8} className={classes.section}>
            <RolesCard onRoleClick={() => onChangeView("roledetails")} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
