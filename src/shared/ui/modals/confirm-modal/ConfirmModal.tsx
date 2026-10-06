import { type FC } from "react";
import { createPortal } from "react-dom";
import styles from "./ConfirmModal.module.css";

export type ConfirmModalType = {
  onCancel: () => void;
  onConfirm: () => void;
  message?: string;
  title: string;
  isOpen: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
};
const ConfirmModal: FC<ConfirmModalType> = ({
  onCancel,
  onConfirm,
  message,
  title,
  isOpen,
  confirmLabel = "Удалить",
  cancelLabel = "Отмена",
}) => {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.trashCanBlock}>
          <div className={styles.trashCanWrapper}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#BF2600"
              stroke-width="2.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 7h16"></path>
              <path d="M9 7V5h6v2"></path>
              <path d="M6 7l1 13h10l1-13"></path>
              <path d="M10 11v6"></path>
              <path d="M14 11v6"></path>
            </svg>
          </div>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmModal;
