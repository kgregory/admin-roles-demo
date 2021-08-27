import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AdminAppBar from "core/components/AdminAppBar";
import CardEditor from "core/components/CardEditor";
import toolbarRelativeStyles from "core/utils/toolbarRelativeStyles";
import useDialog from "core/hooks/useDialog";
import DeleteButton from "./DeleteButton";
import DetailsCard from "./DetailsCard";
import PermissionsCard from "./PermissionsCard";
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

interface AppDetailsProps {
  onChangeView: (view: string) => void;
}

export default function AppDetails({ onChangeView }: AppDetailsProps) {
  const classes = useStyles();
  const userIdDialog = useDialog();
  const appState: "initial" | "loading" | "error" = "initial";
  const app = {
    name: "Data Warehouse",
    createdAt: new Date("1980-07-25T23:50:00").toISOString(),
    lastActivity: new Date().toISOString(),
    userId: "KJG"
  };
  return (
    <div className={classes.root}>
      <AdminAppBar onChangeView={onChangeView}>App Details</AdminAppBar>
      <Container className={classes.content}>
        <Grid spacing={2} container className={classes.section}>
          <Grid item xs={12} md={4} className={classes.section}>
            <DetailsCard
              name={app.name}
              createdAt={app.createdAt}
              lastActivity={app.lastActivity}
            />
            <CardEditor
              label="STORIS User ID"
              value={app.userId}
              onClick={userIdDialog.onOpen}
            />
            <DeleteButton />
          </Grid>
          <Grid item xs={12} md={8} className={classes.section}>
            <PermissionsCard />
          </Grid>
        </Grid>
      </Container>
      <EditUserId {...{ ...userIdDialog, appState, userId: app.userId }} />
    </div>
  );
}
