import * as React from "react";
import { ConfirmationDialog, ConfirmationOptions } from "./confirm-dialog";
import Modal from "antd/lib/modal/Modal";

const ConfirmationServiceContext = React.createContext<
  (options: ConfirmationOptions) => Promise<void>
>(Promise.reject);

export const useConfirmation = () =>
  React.useContext(ConfirmationServiceContext);

  //ts-ignore
export const ConfirmationServiceProvider = (props: any) => {
  const [
    confirmationState,
    setConfirmationState
  ] = React.useState<ConfirmationOptions | null>(null);

  const [open, setOpen] = React.useState<boolean>(false);

  const awaitingPromiseRef = React.useRef<{
    resolve: () => void;
    reject: () => void;
  }>();

  const openConfirmation = (options: ConfirmationOptions) => {
    setConfirmationState(options);
    setOpen(true);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleSubmit = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }

    setOpen(false);
  };

  const handleClosed = () => {
    setConfirmationState(null);
  };

  return (
        <ConfirmationDialog
            open={open}
            title={"Hello"}
            onSubmit={handleSubmit}
            onClose={handleClosed}
            children={props.children}
        />
    );
};