import React, { forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import type { DialogProps } from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import type { SlideProps } from "@material-ui/core/Slide";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FullScreenDialogHeading from "./FullScreenDialogHeading";
import ModalDialogActions from "./ModalDialogActions";
import ModalDialogHeading from "./ModalDialogHeading";

export interface ResponsiveDialogProps extends DialogProps {
  closeButtonDisabled?: boolean;
  closeButtonText?: string | null;
  confirmButtonDisabled?: boolean;
  confirmButtonFunc?: React.MouseEventHandler<HTMLButtonElement>;
  confirmButtonText?: string;
  descriptionId?: string;
  isLocked?: boolean;
  isProcessing?: boolean;
  labelId?: string;
  onClose: DialogProps["onClose"];
  open: boolean;
  title?: string;
}

const Transition: React.ComponentType<SlideProps> = forwardRef((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  children,
  closeButtonDisabled = false,
  closeButtonText = "Cancel",
  confirmButtonDisabled = false,
  confirmButtonFunc,
  confirmButtonText,
  labelId,
  descriptionId,
  isLocked = false,
  isProcessing = false,
  onClose,
  title,
  ...other
}) => {
  const theme = useTheme();
  const defaultFullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const fullScreen = other?.fullScreen ?? defaultFullScreen;
  const transition = fullScreen ? Transition : undefined;
  const handleOnClose = React.useCallback(
    (event, reason) => {
      if (
        isLocked &&
        (reason === "backdropClicked" || reason === "escapeKeyDown")
      ) {
        return;
      }
      onClose(event, reason);
    },
    [isLocked, onClose]
  );
  return (
    <Dialog
      onClose={handleOnClose}
      fullScreen={fullScreen}
      TransitionComponent={transition}
      scroll={fullScreen ? "paper" : "body"}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      {...other}
    >
      {fullScreen ? (
        <FullScreenDialogHeading
          closeButtonDisabled={closeButtonDisabled}
          closeButtonLabel={closeButtonText ?? "Close"}
          confirmButtonDisabled={confirmButtonDisabled}
          confirmButtonFunc={confirmButtonFunc}
          confirmButtonText={confirmButtonText}
          id={labelId}
          isProcessing={isProcessing}
          onClose={onClose}
          title={title}
        />
      ) : (
        <ModalDialogHeading
          id={labelId}
          isProcessing={isProcessing}
          title={title}
        />
      )}
      {children}
      {!fullScreen && (
        <ModalDialogActions
          closeButtonDisabled={closeButtonDisabled}
          closeButtonText={closeButtonText ?? undefined}
          confirmButtonDisabled={confirmButtonDisabled}
          confirmButtonFunc={confirmButtonFunc}
          confirmButtonText={confirmButtonText}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
};

export default ResponsiveDialog;
