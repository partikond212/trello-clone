import React, { useState, type FC } from "react";
import useJoinBoard from "../model/useJoinBoard";
import { useNotification } from "@/app/context/NotificationContext";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
import styles from "./JoinBoardModal.module.css";

type JoinBoardModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const JoinBoardModal: FC<JoinBoardModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  //TODO:Появилась проблема,которая состоит в том ,что пользователь,не являющийся владельцем может удалить доску владельца
  const [link, setLink] = useState("");
  const { mutate: joinBoard } = useJoinBoard();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let inviteToken: string | undefined;
    try {
      inviteToken = new URL(link).pathname.split("/").pop();
    } catch {
      showNotification("Это не похоже на ссылку-приглашение", "error");
      return;
    }
    if (!inviteToken) {
      showNotification("Вставьте ссылку-приглашение", "error");
      return;
    }
    joinBoard(inviteToken, {
      onSuccess: (board) => {
        setTimeout(() => {
          navigate(`/boards/${board._id}`);
          showNotification("Вы успешно присоединились к доске!", "success");
        }, 500);
      },
      onError: (error) => {
        showNotification(
          getErrorMessage(error, "Не удалось присоединиться к доске"),
          "error",
        );
      },
    });
  };

  return (
    <div className={`${styles.overlay} ${isModalOpen ? styles.active : ""}`}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className={styles.JoinBoardModal}>
          <input
            type="text"
            value={link}
            placeholder="Вставьте сюда ссылку-приглашение "
            className={styles.linkInput}
            onChange={(e) => setLink(e.target.value)}
          />
          <div className={styles.actionButtons}>
            <button
              className={styles.rejectJoining}
              type="button"
              onClick={() => closeModal()}
            >
              Отменить
            </button>
            <button className={styles.joinToBoardBtn} type="submit">
              Присоединиться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinBoardModal;
