import React from "react";
import "./ConfirmationModal.css";

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmButtonText = "Deletar",
  cancelButtonText = "Cancelar",
}) {
  if (!isOpen) return null;

  return (
    <div className="modal__overlay" onClick={onCancel}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <p className="modal__message">{message}</p>
        <div className="modal__buttons">
          <button className="modal__button modal__button-cancel" onClick={onCancel}>
            {cancelButtonText}
          </button>
          <button className="modal__button modal__button-confirm" onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
