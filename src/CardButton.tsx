import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ConfirmationDialog from "./ConfirmationDialog";
import useConfirmationDialog from "./useConfirmationDialog";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(2)
  }
}));

const CardButton = ({ label, icon, dialogText }) => {
  const classes = useStyles();
  const confirmationDialog = useConfirmationDialog(() => {});
  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        startIcon={icon}
        className={classes.button}
        onClick={() => confirmationDialog.onOpen()}
      >
        {label}
      </Button>
      <ConfirmationDialog
        dialogText={dialogText}
        affirmativeText={label}
        open={confirmationDialog.open}
        onNegative={confirmationDialog.onNegative}
        onAffirmative={confirmationDialog.onAffirmative}
      />
    </>
  );
};

export default CardButton;
