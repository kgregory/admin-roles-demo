import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AdminAppBar from "core/components/AdminAppBar";
import toolbarRelativeStyles from "core/utils/toolbarRelativeStyles";
import type { DemoView } from "core/types";
import AppsTable from "./AppsTable";
import AppsList from "./AppsList";

const useStyles = makeStyles((theme) => ({
  // this is what our theme usually uses
  "@global": {
    body: {
      background: "#fafafa",
      margin: 0
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
  listContent: {
    ...toolbarRelativeStyles(
      "marginTop",
      theme,
      (value) => (value as number) - 1
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
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

interface AppsProps {
  onChangeView: (view: DemoView) => void;
}

const Apps = ({ onChangeView }: AppsProps) => {
  const classes = useStyles();
  const onClick = () => onChangeView("appdetails");
  return (
    <div className={classes.root}>
      <AdminAppBar onChangeView={onChangeView}>Apps</AdminAppBar>
      <Hidden xsDown>
        <Container className={classes.content}>
          <AppsTable onClick={onClick} />
        </Container>
      </Hidden>
      <Hidden smUp>
        <div className={classes.listContent}>
          <AppsList onClick={onClick} />
        </div>
      </Hidden>
      <Zoom in>
        <Fab
          aria-label="Add App to Workspace"
          className={classes.fab}
          color="secondary"
        >
          <AddIcon />
        </Fab>
      </Zoom>
    </div>
  );
};

export default Apps;
