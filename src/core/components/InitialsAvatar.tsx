import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const InitialsAvatar = ({ name = { first: "Unnamed", last: "User" } }) => {
  const classes = useStyles();
  const initials = React.useMemo(() => {
    const { first, last } = name || {};
    const firstInitial = (first || "").match(/^[a-z]/gi) || [];
    const lastInitial = (last || "").match(/^[a-z]/gi) || [];
    const userInitials = [...firstInitial, ...lastInitial]
      .join("")
      .toUpperCase();
    return userInitials !== "" ? userInitials : undefined;
  }, [name]);

  return <Avatar className={classes.avatar}>{initials}</Avatar>;
};

export default InitialsAvatar;
