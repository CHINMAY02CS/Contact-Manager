// src/components/ConfirmationModal.tsx
import React from "react";
import Modal from "./shared/Modal";
import { DeleteHeaderIcon } from "./Icons";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText: string;
  titleCount?: number;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText,
  titleCount,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span>
          <DeleteHeaderIcon />
          Delete Contact {titleCount ? `(${titleCount})` : ""}
        </span>
      }
      width="400px"
    >
      <div className="confirmation-content">
        <p>{message}</p>
        <p>This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-delete" onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
