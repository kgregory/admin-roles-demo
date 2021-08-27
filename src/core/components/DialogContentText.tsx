import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles((theme) => ({
  error: { color: theme.palette.error.main }
}));

export default function DialogContentTextWrapper({ error, ...props }) {
  const classes = useStyles();
  const classOverrides = error ? { root: classes.error } : undefined;
  return <DialogContentText classes={classOverrides} {...props} />;
}
