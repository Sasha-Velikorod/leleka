"use client";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./AddTaskModal.module.css";

interface AddTaskModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const AddTaskModal = ({ onClose, children }: AddTaskModalProps) => {
  const handleBackdropClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const modal = document.getElementById("modal-root") || document.body;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClose}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modal
  );
};

export default AddTaskModal;
