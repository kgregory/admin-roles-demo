import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

interface ModalDialogHeadingProps {
  id?: string;
  isProcessing: boolean;
  title?: string;
}

const ModalDialogHeading: React.FC<ModalDialogHeadingProps> = ({
  id,
  isProcessing,
  title
}) =>
  title != null ? (
    <>
      {isProcessing && <LinearProgress />}
      <Toolbar>
        <Typography id={id} variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </>
  ) : null;

export default ModalDialogHeading;
