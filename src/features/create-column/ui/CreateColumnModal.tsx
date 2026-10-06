import { useState, type FC } from "react";
import useCreateColumn from "../model/useCreateColumn";
import type { BoardT } from "../../../pages/board-page/model/useBoard";
import styles from "./CreateColumnModal.module.css";

interface ICreateColumnModalProps {
  board: BoardT;
  onClose: () => void;
  isModalOpen: boolean;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}
const CreateColumnModal: FC<ICreateColumnModalProps> = ({
  board,
  onClose,
  isModalOpen,
  onError,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const { mutate, isPending } = useCreateColumn(board.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || trimmed.length === 0) return;
    mutate(
      { title: trimmed },
      {
        onSuccess: () => {
          setTitle("");
          onClose();
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          if (onError) onError(error as Error);
        },
      },
    );
  };

  return (
    <div className={`${styles.overlay} ${isModalOpen ? styles.active : ""}`}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Создать колонку</h2>
        <form onSubmit={handleSubmit}>
          <p>Название колонки</p>
          <div className={styles.inputColumnTitleBlock}>
            <input
              type="text"
              placeholder="Введите название колонки"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className={styles.inputColumnTitle}
            />
          </div>
          <div className={styles.actionButtons}>
            <button
              className={styles.rejectCreatingBtn}
              type="button"
              onClick={onClose}
            >
              Отмена
            </button>
            <button
              className={styles.acceptCreatingBtn}
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Создание..." : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateColumnModal;
