import { useMemo, useState } from "react";

interface UseConfirmationDialogResults {
  open: boolean;
  onOpen: () => void;
  onNegative: () => void;
  onAffirmative: () => void;
}

const useConfirmationDialog = (
  onConfirmed: () => void
): UseConfirmationDialogResults => {
  const [isOpen, setIsOpen] = useState(false);
  return useMemo(
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
