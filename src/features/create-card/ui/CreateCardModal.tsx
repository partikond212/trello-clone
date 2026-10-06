import { useState, type FC } from "react";
import useCreateCard from "../model/useCreateCard";

import type { Column } from "@/entities/column/model/column";
import styles from "./CreateCard.module.css";

interface ICreateCardModalProps {
  column: Column;
  onClose: () => void;
  isModalOpen: boolean;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}
const CreateCardModal: FC<ICreateCardModalProps> = ({
  column,
  onClose,
  isModalOpen,
  onError,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const { mutate, isPending } = useCreateCard(column.id);

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
        onError: (error: Error) => {
          if (onError) onError(error);
        },
      },
    );
  };

  return (
    <div className={`${styles.modal} ${isModalOpen ? styles.active : ""}`}>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок карточки…"
            className={styles.inputCardTitle}
          />
        </div>

        <div className={styles.actionButtons}>
          <button
            className={styles.addCardBtn}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Добавляем..." : "Добавить"}
          </button>
          <button className={styles.rejectBtn} type="button" onClick={onClose}>
            Отмена
          </button>
          <span className={styles.advice}>Enter - добавить</span>
        </div>
      </form>
    </div>
  );
};

export default CreateCardModal;
