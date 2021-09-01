import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AdminAppBar from "core/components/AdminAppBar";
import toolbarRelativeStyles from "core/utils/toolbarRelativeStyles";
import type { DemoView } from "core/types";
import AppsTable from "./AppsTable";

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

interface AppsProps {
  onChangeView: (view: DemoView) => void;
}

const Apps = ({ onChangeView }: AppsProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AdminAppBar onChangeView={onChangeView}>Apps</AdminAppBar>
      <Container className={classes.content}>
        <AppsTable />
      </Container>
    </div>
  );
};

export default Apps;
