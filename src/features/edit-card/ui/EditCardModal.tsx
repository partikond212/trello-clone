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
  const [description, setDescription] = useState(card.description);
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
    <Modal
      title={`Вы точно хотите изменить карточку ${card.title}`}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Новое название карточки"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Новое описание карточки"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{isEditing ? "Изменяется" : "Изменить"}</button>
      </form>
    </Modal>
  );
};

export default EditCardModal;
