import { useCallback, useState } from "react";

type UseConfirmDialogOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
};

export function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<UseConfirmDialogOptions>({});
  const [onConfirmCallback, setOnConfirmCallback] = useState<
    (() => void) | null
  >(null);

  const openDialog = useCallback(
    (options: UseConfirmDialogOptions, onConfirm: () => void) => {
      setOptions(options);
      setOnConfirmCallback(() => onConfirm);
      setOpen(true);
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setOpen(false);
    setOnConfirmCallback(null);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirmCallback?.();
    closeDialog();
  }, [onConfirmCallback, closeDialog]);

  return {
    dialogProps: {
      open,
      onConfirm: handleConfirm,
      onCancel: closeDialog,
      ...options,
    },
    openDialog,
    closeDialog,
  };
}
