import { useState, type FC } from "react";
import useCreateCard from "../model/useCreateCard";

import styles from "./CreateCard.module.css";
import type { Column } from "@/entities/column/model/column";

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
  const [description, setDescription] = useState("");
  const { mutate, isPending } = useCreateCard(column.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || trimmed.length === 0) return;
    mutate(
      { title: trimmed, description },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          onClose();
          if (onSuccess) onSuccess();
        },
        onError: (error: Error) => {
          if (onError) onError(error);
        },
      },
    );
  };
  // Если модалка закрыта — не рендерим её вообще
  if (!isModalOpen) return null;
  else {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2>Создать карточку</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Введите название карточки"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <input
              type="text"
              placeholder="Введите описание карточки"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoFocus
            />

            <div className={styles.actionButtons}>
              <button type="button" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" disabled={isPending}>
                {isPending ? "Создание..." : "Создать"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default CreateCardModal;
