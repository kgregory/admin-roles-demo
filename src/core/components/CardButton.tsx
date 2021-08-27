import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ConfirmationDialog from "./ConfirmationDialog";
import useConfirmationDialog from "../hooks/useConfirmationDialog";
import delay from "../utils/delay";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(2)
  }
}));

interface CardButtonProps {
  label: string;
  icon: React.ReactNode;
  dialogText?: string;
}

const CardButton = ({ label, icon, dialogText }: CardButtonProps) => {
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const confirmationDialog = useConfirmationDialog(() => {});

  const handleAffirmative = async () => {
    setLoading(true);
    await delay(2000);
    setLoading(false);
    confirmationDialog.onAffirmative();
  };

  /** awful mode thing for demo purposes */
  const isConfirmable = dialogText != null;

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        startIcon={icon}
        className={classes.button}
        onClick={() => (isConfirmable ? confirmationDialog.onOpen() : () => {})}
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
