import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import type { ButtonProps } from "@material-ui/core/Button";
import type { IconButtonProps } from "@material-ui/core/IconButton";

interface AppBarButtonProps {
  as?: React.ComponentType<ButtonProps & IconButtonProps>;
}

const useStyles = makeStyles(() => ({
  button: {
    "&$buttonDisabled": {
      color: "rgba(255, 255, 255, 0.26)"
    }
  },
  buttonDisabled: {}
}));

const AppBarButton: React.FC<
  AppBarButtonProps & ButtonProps & IconButtonProps
> = ({ as: Component = Button, ...other }) => {
  const classes = useStyles();
  return (
    <Component
      color="inherit"
      classes={{ root: classes.button, disabled: classes.buttonDisabled }}
      {...other}
    />
  );
};

export default AppBarButton;
