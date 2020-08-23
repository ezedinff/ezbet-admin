import * as React from "react";
import Modal from "antd/lib/modal/Modal";
export interface ConfirmationOptions {
  title: string;
}

interface ConfirmationDialogProps extends ConfirmationOptions {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  onSubmit,
  onClose,
  children
}) => {
  return (
    <Modal
    title="Basic Modal"
    visible={open}
    onOk={onSubmit}
    onCancel={onClose}
    >
        <p>Hello</p>
    </Modal>
  );
};