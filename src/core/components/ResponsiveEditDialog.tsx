import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ResponsiveDialog from "./ResponsiveDialog";

const useStyles = makeStyles((theme) => ({
  dialog: {
    [theme.breakpoints.up("sm")]: {
      minWidth: 600 - theme.spacing(14)
    }
  }
}));

const ResponsiveEntryDialog = (props) => {
  const classes = useStyles();
  return <ResponsiveDialog {...props} classes={{ paper: classes.dialog }} />;
};

export default ResponsiveEntryDialog;
