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

const delay = (waitTime = 0): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, waitTime));

const CardButton = ({ label, icon, dialogText }) => {
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const confirmationDialog = useConfirmationDialog(() => {});
  const handleAffirmative = async () => {
    setLoading(true);
    await delay(2000);
    setLoading(false);
    confirmationDialog.onAffirmative();
  };
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
        onAffirmative={handleAffirmative}
        loading={loading}
      />
    </>
  );
};

export default CardButton;
