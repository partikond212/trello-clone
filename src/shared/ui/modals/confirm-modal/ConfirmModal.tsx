import { type FC } from "react";
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
  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
