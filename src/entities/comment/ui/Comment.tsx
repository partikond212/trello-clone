import React, { useState, type FC } from "react";
import type { CommentT } from "../model/Comment";
import styles from "./Comment.module.css";
import DeleteComment from "@/features/delete-comment/ui/DeleteComment";
import useEditComment from "@/features/edit-comment/model/useEditComment";
import { useNotification } from "@/app/context/NotificationContext";
type CommentTProps = {
  comment: CommentT;
};
const Comment: FC<CommentTProps> = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [innerText, setInnerText] = useState(comment.text);
  const [text, setText] = useState(comment.text);
  const { showNotification } = useNotification();
  const { mutate } = useEditComment();

  const handleSave = () => {
    mutate(
      { text, commentId: comment.id },
      {
        onSuccess: () => {
          showNotification("Вы обновили коммент!", "success");
          setIsEditing(false);
          setInnerText(text);
        },
        onError: () => {
          showNotification("Вы не обновили коммент", "error");
        },
      },
    );
  };
  const handleCancelEditing = () => {
    setIsEditing(false);
    setText(innerText);
  };
  return (
    <div className={styles.comment}>
      {isEditing ? (
        <textarea
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <p className={styles.commentText}>{comment.text}</p>
      )}
      <div className={styles.commentMenu}>
        {isEditing ? (
          <>
            <button onClick={handleCancelEditing}>Отмена</button>
            <button onClick={handleSave}>Сохранить</button>
          </>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>
            <img
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tINCh0LrQsNGH0LDQvdC+INGBINGB0LDQudGC0LAgc3ZnNC5ydSAvIERvd25sb2FkZWQgZnJvbSBzdmc0LnJ1IC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxnIGlkPSJFZGl0IC8gRWRpdF9QZW5jaWxfMDIiPg0KPHBhdGggaWQ9IlZlY3RvciIgZD0iTTQgMTYuMDAwMVYyMC4wMDAxTDggMjAuMDAwMUwxOC44Njg2IDkuMTMxNDZMMTguODY5NSA5LjEzMDYxQzE5LjI2NSA4LjczNTE2IDE5LjQ2MjggOC41MzczNiAxOS41MzY5IDguMzA5MkMxOS42MDIxIDguMTA4MzUgMTkuNjAyMiA3Ljg5MjAxIDE5LjUzNjkgNy42OTExN0MxOS40NjI3IDcuNDYyODQgMTkuMjY0NiA3LjI2NDc0IDE4Ljg2ODYgNi44Njg3MkwxNy4xMjg4IDUuMTI4OTJDMTYuNzM0NSA0LjczNDYgMTYuNTM2OSA0LjUzNzA0IDE2LjMwOTEgNC40NjMwMUMxNi4xMDgyIDQuMzk3NzUgMTUuODkxOSA0LjM5Nzc1IDE1LjY5MSA0LjQ2MzAxQzE1LjQ2MyA0LjUzNzA5IDE1LjI2NTIgNC43MzQ4OCAxNC44NzA0IDUuMTI5NzZMMTQuODY4NiA1LjEzMTQ2TDQgMTYuMDAwMVoiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjwvZz4NCjwvc3ZnPg=="
              alt="Редактировать"
            />
          </button>
        )}
        <DeleteComment comment={comment} />
      </div>
    </div>
  );
};

export default Comment;
