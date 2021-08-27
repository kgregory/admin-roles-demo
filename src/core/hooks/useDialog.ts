import React from "react";

const useDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
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
