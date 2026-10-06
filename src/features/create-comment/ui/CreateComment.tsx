import React, { useState, type FC } from "react";
import useCreateComment from "../model/useCreateComment";
import type { Card } from "@/entities/card/model/card";
import { useNotification } from "@/app/context/NotificationContext";
import styles from "./CreateComment.module.css";
import { useAuth } from "@/app/context/AuthContext";
import UserAvatar from "@/entities/user/ui/UserAvatar";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
type CreateCommentType = {
  card: Card;
};
const CreateComment: FC<CreateCommentType> = ({ card }) => {
  const { mutate } = useCreateComment(card.id);
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { text },
      {
        onSuccess: () => {
          showNotification("Вы успешно добавили комментарий!", "success");
          setText("");
        },
        onError: (error) => {
          showNotification(
            getErrorMessage(error, "Не удалось добавить комментарий"),
            "error",
          );
          setText("");
        },
      },
    );
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <UserAvatar user={user} />
      <textarea
        className={styles.input}
        autoFocus
        placeholder="Введите комментарий"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={!text.trim()}
        >
          отправить
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
