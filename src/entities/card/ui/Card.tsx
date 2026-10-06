import { type FC } from "react";
import type { Card as CardModel } from "../model/card";
import ConfirmModal from "@/shared/ui/modals/confirm-modal/ConfirmModal";
import EditCardModal from "@/features/edit-card/ui/EditCardModal";
import useModal from "@/shared/hooks/useModal";
import useDeleteCard from "@/features/delete-card/model/useDeleteCard";
import { useNotification } from "@/app/context/NotificationContext";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import { useNavigate } from "react-router-dom";

import CardTags from "./components/card-tags/CardTags";
import { getDueDateStatus } from "@/shared/utils/dueDate";
import { formatDueDate } from "@/shared/utils/formatDueDate";

interface ICardProps {
  card: CardModel;
}
import styles from "./Card.module.css";
import { PRIORITY_LABELS } from "@/shared/constants/priority-labels";
import useComments from "@/entities/comment/model/useComments";

const Card: FC<ICardProps> = ({ card }) => {
  const { showNotification } = useNotification();
  const dueDateStatus = getDueDateStatus(card.dueDate);
  const navigate = useNavigate();
  const {
    isModalOpen: isConfirmOpen,
    openModal: openConfirm,
    closeModal: closeConfirm,
  } = useModal();
  const {
    isModalOpen: isEditOpen,
    openModal: openEdit,
    closeModal: closeEdit,
  } = useModal();
  const { data: comments } = useComments(card.id);
  const { mutate: deleteCard, isPending: isDeleting } = useDeleteCard(
    card.columnId,
  );

  const handleNavToCardPage = (cardId: string) => {
    navigate(`/cards/${cardId}`);
  };
  const handleDelete = () => {
    deleteCard(
      { cardId: card.id },
      {
        onSuccess: () => {
          closeConfirm();
          showNotification("Карточка удалена", "success");
        },
        onError: (error) =>
          showNotification(
            getErrorMessage(error, "Не удалось удалить карточку"),
            "error",
          ),
      },
    );
  };

  return (
    <div className={styles.card} onClick={() => handleNavToCardPage(card.id)}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div className={styles.cardTags}>
            <CardTags card={card} />
          </div>
          <div className={styles.cardActions}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openEdit();
              }}
            >
              <svg
                data-dc-tpl="264"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path data-dc-tpl="265" d="M4 16v4h4L19 9l-4-4z"></path>
                <path data-dc-tpl="266" d="M14.5 5.5l4 4"></path>
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openConfirm();
              }}
            >
              <svg
                data-dc-tpl="268"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path data-dc-tpl="269" d="M4 7h16"></path>
                <path data-dc-tpl="270" d="M9 7V5h6v2"></path>
                <path data-dc-tpl="271" d="M6 7l1 13h10l1-13"></path>
                <path data-dc-tpl="272" d="M10 11v6"></path>
                <path data-dc-tpl="273" d="M14 11v6"></path>
              </svg>
            </button>
          </div>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          {card.description && (
            <p className={styles.cardDescription}>{card.description}</p>
          )}
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardPriority}>
            {card.priority && (
              <span
                className={`${styles.cardPriorityBadge} ${styles[card.priority]}`}
              >
                {PRIORITY_LABELS[card.priority]}
              </span>
            )}
          </div>
          <>
            {dueDateStatus !== "none" && (
              <span
                className={`${styles.dueDateBadge} ${styles[dueDateStatus]}`}
              >
                {formatDueDate(card.dueDate!)}
              </span>
            )}
          </>
          <div className={styles.tasks}>
            <svg
              data-dc-tpl="252"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect
                data-dc-tpl="253"
                x="3"
                y="3"
                width="18"
                height="18"
                rx="4"
              ></rect>
              <path data-dc-tpl="254" d="M8 12.5l2.5 2.5L16 9.5"></path>
            </svg>
            {card.tasks?.filter((t) => t.isDone).length}/{card.tasks?.length}
          </div>
          {comments && (
            <span className={styles.commentsCount}>
              <svg
                data-dc-tpl="257"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  data-dc-tpl="258"
                  d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"
                ></path>
              </svg>
              {comments.length}
            </span>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        title={`Удалить карточку «${card.title}»?`}
        message="Действие нельзя отменить."
        confirmLabel={isDeleting ? "Удаление..." : "Удалить"}
        onConfirm={handleDelete}
        onCancel={closeConfirm}
      />

      <EditCardModal card={card} isOpen={isEditOpen} closeModal={closeEdit} />
    </div>
  );
};

export default Card;
