import React, { useState, type FC } from "react";
import Modal from "../../../shared/ui/modals/Modal";
import type { Card } from "@/entities/card/model/card";
import { createPortal } from "react-dom";
import useEditCard from "@/features/edit-card/model/useEditCard";
import { useNotification } from "@/app/context/NotificationContext";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import styles from "./EditCardModal.module.css";

type EditCardModalPropsType = {
  card: Card;
  isOpen: boolean;
  closeModal: () => void;
};

const EditCardModal: FC<EditCardModalPropsType> = ({
  card,
  closeModal,
  isOpen,
}) => {
  const { mutate, isPending: isEditing } = useEditCard(card);
  const { showNotification } = useNotification();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description ?? "");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { title, description },
      {
        onSuccess: () => {
          closeModal();
          showNotification("Карточка обновлена", "success");
        },
        onError: (error) =>
          showNotification(
            getErrorMessage(error, "Не удалось обновить карточку"),
            "error",
          ),
      },
    );
  };
  return createPortal(
    <Modal title="Редактировать карточку" isOpen={isOpen}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Название карточки"
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <input
          type="text"
          value={description}
          placeholder="Описание карточки"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={closeModal}
          >
            Отмена
          </button>
          <button type="submit" disabled={isEditing}>
            {isEditing ? "Сохраняется..." : "Сохранить"}
          </button>
        </div>
      </form>
    </Modal>,
    document.body,
  );
};

export default EditCardModal;
