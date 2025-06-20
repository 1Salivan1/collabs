"use client";

import { Box, Button, Modal, Typography } from "@mui/material";
import style from "./ConfirmationModalStyles.module.scss";

interface ConfirmationModalProps {
  isOpen: boolean;
  text: string;
  acceptText: string;
  cancelText: string;
  typeOfConfirmation: "common" | "delete";
  onAccept: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const ACCEPT_BUTTON_COLLORS = {
  common: "",
  delete: "#a70909",
};

const CANCEL_BUTTON_COLLORS = {
  common: "#676767",
  delete: "#676767",
};

const ConfirmationModal = ({
  isOpen,
  text,
  acceptText,
  cancelText,
  typeOfConfirmation,
  onAccept,
  onCancel,
  onClose,
}: ConfirmationModalProps) => {
  return (
    <Modal className={style.container} onClose={onClose} open={isOpen}>
      <Box className={style.modalContent}>
        <Typography className={style.modalText}>{text}</Typography>
        <Box className={style.buttonBlock}>
          <Button
            style={{
              backgroundColor: ACCEPT_BUTTON_COLLORS[typeOfConfirmation],
            }}
            onClick={onAccept}
          >
            {acceptText}
          </Button>
          <Button
            style={{
              backgroundColor: CANCEL_BUTTON_COLLORS[typeOfConfirmation],
            }}
            className={style.cancelButton}
            onClick={() => {
              onCancel();
              onClose();
            }}
          >
            {cancelText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
