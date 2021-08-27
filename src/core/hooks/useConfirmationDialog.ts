import React from "react";

interface UseConfirmationDialogResults {
  open: boolean;
  onOpen: () => void;
  onNegative: () => void;
  onAffirmative: () => void;
}

const useConfirmationDialog = (
  onConfirmed: () => void
): UseConfirmationDialogResults => {
  const [isOpen, setIsOpen] = React.useState(false);
  return React.useMemo(
    () => ({
      open: isOpen,
      onOpen: () => {
        setIsOpen(true);
      },
      onNegative: () => {
        setIsOpen(false);
      },
      onAffirmative: () => {
        setIsOpen(false);
        onConfirmed();
      }
    }),
    [isOpen, onConfirmed]
  );
};

export default useConfirmationDialog;
