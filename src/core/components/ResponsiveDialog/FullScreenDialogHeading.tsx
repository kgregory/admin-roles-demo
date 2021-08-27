import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import AppBarButton from "./AppBarButton";

interface FullScreenDialogHeadingProps {
  closeButtonDisabled: boolean;
  closeButtonLabel: string;
  confirmButtonDisabled: boolean;
  confirmButtonFunc?: React.MouseEventHandler<HTMLButtonElement>;
  confirmButtonText?: string;
  id?: string;
  isProcessing: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
}

const useStyles = makeStyles((theme) => ({
  // In fullscreen, DialogContent needs padding to account for AppBar
  bottomMargin: {
    marginBottom: theme.spacing(2)
  },
  titleText: {
    flex: 1,
    marginLeft: 20
  }
}));

const FullScreenDialogHeading: React.FC<FullScreenDialogHeadingProps> = (
  props
) => {
  const {
    closeButtonDisabled,
    closeButtonLabel,
    confirmButtonDisabled,
    confirmButtonFunc,
    confirmButtonText,
    id,
    isProcessing,
    onClose,
    title
  } = props;
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.bottomMargin}>
      {isProcessing && <LinearProgress />}
      <Toolbar data-testid="FullScreenDialogToolbar">
        <AppBarButton
          as={IconButton}
          aria-label={closeButtonLabel}
          edge="start"
          onClick={onClose}
          disabled={closeButtonDisabled}
        >
          <CloseIcon />
        </AppBarButton>
        <Typography
          id={id}
          variant="h6"
          color="inherit"
          className={classes.titleText}
        >
          {title}
        </Typography>
        {confirmButtonText != null && (
          <div>
            <AppBarButton
              onClick={confirmButtonFunc}
              disabled={confirmButtonDisabled}
            >
              {confirmButtonText}
            </AppBarButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default FullScreenDialogHeading;
