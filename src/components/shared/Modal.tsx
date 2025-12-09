// src/components/shared/Modal.tsx
import React from "react";
import "../../styles/Modal.css";
import { CloseIcon } from "../Icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  children: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "500px",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ width }}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <div className="modal-close-btn" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
