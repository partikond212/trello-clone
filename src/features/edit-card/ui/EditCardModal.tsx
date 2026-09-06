import React, { useState, type FC } from "react";
import Modal from "../../../shared/ui/modals/Modal";
import type { Card } from "@/entities/card/model/card";
import useEditCard from "@/features/edit-card/model/useEditCard";
import { useNotification } from "@/app/context/NotificationContext";

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
        onError: () => showNotification("Не удалось обновить", "error"),
      },
    );
  };
  return (
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
        <div>
          <button type="button" onClick={closeModal}>
            Отмена
          </button>
          <button type="submit" disabled={isEditing}>
            {isEditing ? "Сохраняется..." : "Сохранить"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCardModal;
