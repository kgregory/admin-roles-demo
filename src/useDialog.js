import React from "react";
import { useState } from "react";

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return React.useMemo(
    () => ({
      open: isOpen,
      onOpen: () => setIsOpen(true),
      onClose: () => setIsOpen(false)
    }),
    [isOpen]
  );
};

export default useDialog;
