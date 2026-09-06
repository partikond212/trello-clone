import { type FC } from "react";
import type { Card } from "../model/card";
import styles from "./Card.module.css";
import ConfirmModal from "@/shared/ui/modals/confirm-modal/ConfirmModal";
import useModal from "@/shared/hooks/useModal";
import useDeleteCard from "@/features/delete-card/model/useDeleteCard";
import type { Column } from "@/entities/column/model/column";

interface ICardProps {
  card: Card;
  column: Column;
}
const Card: FC<ICardProps> = ({ card, column }) => {
  const {
    isModalOpen: isConfirmModalOpen,
    closeModal: closeConfirmModal,
    openModal: openConfirmModal,
  } = useModal();
  const {
    isModalOpen: isEditModalOpen,
    closeModal: closeEditModal,
    openModal: openEditModal,
  } = useModal();
  const { mutate: deleteCard } = useDeleteCard(
    column.id,
  );

  const handleCancel = () => {
    deleteCard({card.id},{});
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          {card.description && (
            <p className={styles.cardDescription}>{card.description}</p>
          )}
        </div>
        <div className={styles.cardInfo}>
          {card.notesCount && (
            <div className={styles.notes}>заметок:{card.notesCount}</div>
          )}
          {card.completedTaskCount && (
            <div className={styles.tasks}>
              завершенных задач : {card.completedTaskCount}
            </div>
          )}
        </div>
      </div>
      <div className={styles.cardActions}>
        <button onClick={openEditModal}>
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tINCh0LrQsNGH0LDQvdC+INGBINGB0LDQudGC0LAgc3ZnNC5ydSAvIERvd25sb2FkZWQgZnJvbSBzdmc0LnJ1IC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxnIGlkPSJFZGl0IC8gRWRpdF9QZW5jaWxfMDIiPg0KPHBhdGggaWQ9IlZlY3RvciIgZD0iTTQgMTYuMDAwMVYyMC4wMDAxTDggMjAuMDAwMUwxOC44Njg2IDkuMTMxNDZMMTguODY5NSA5LjEzMDYxQzE5LjI2NSA4LjczNTE2IDE5LjQ2MjggOC41MzczNiAxOS41MzY5IDguMzA5MkMxOS42MDIxIDguMTA4MzUgMTkuNjAyMiA3Ljg5MjAxIDE5LjUzNjkgNy42OTExN0MxOS40NjI3IDcuNDYyODQgMTkuMjY0NiA3LjI2NDc0IDE4Ljg2ODYgNi44Njg3MkwxNy4xMjg4IDUuMTI4OTJDMTYuNzM0NSA0LjczNDYgMTYuNTM2OSA0LjUzNzA0IDE2LjMwOTEgNC40NjMwMUMxNi4xMDgyIDQuMzk3NzUgMTUuODkxOSA0LjM5Nzc1IDE1LjY5MSA0LjQ2MzAxQzE1LjQ2MyA0LjUzNzA5IDE1LjI2NTIgNC43MzQ4OCAxNC44NzA0IDUuMTI5NzZMMTQuODY4NiA1LjEzMTQ2TDQgMTYuMDAwMVoiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjwvZz4NCjwvc3ZnPg=="
            alt=""
          />
        </button>

        <button>
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tINCh0LrQsNGH0LDQvdC+INGBINGB0LDQudGC0LAgc3ZnNC5ydSAvIERvd25sb2FkZWQgZnJvbSBzdmc0LnJ1IC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjxyZWN0IHg9IjIiIHk9IjQiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgc3Ryb2tlLXdpZHRoPSIwIiByeD0iMCIgZmlsbD0iIzA1OWNmNyIgb3BhY2l0eT0iMC4xIj48L3JlY3Q+PHBvbHlsaW5lIHBvaW50cz0iMjAgMTMgMjAgMjIgMiAyMiAyIDQgMTEgNCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPSIxNiAyIDIyIDIgMjIgOCI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIxMiIgeDI9IjIxLjYiIHkyPSIyLjQiPjwvbGluZT48L3N2Zz4="
            alt=""
          />
        </button>
        <button onClick={openConfirmModal}>
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tINCh0LrQsNGH0LDQvdC+INGBINGB0LDQudGC0LAgc3ZnNC5ydSAvIERvd25sb2FkZWQgZnJvbSBzdmc0LnJ1IC0tPgo8c3ZnIGZpbGw9IiMwMDAwMDAiIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMTUgNCBDIDE0LjQ3NjU2MyA0IDEzLjk0MTQwNiA0LjE4MzU5NCAxMy41NjI1IDQuNTYyNSBDIDEzLjE4MzU5NCA0Ljk0MTQwNiAxMyA1LjQ3NjU2MyAxMyA2IEwgMTMgNyBMIDcgNyBMIDcgOSBMIDggOSBMIDggMjUgQyA4IDI2LjY0NDUzMSA5LjM1NTQ2OSAyOCAxMSAyOCBMIDIzIDI4IEMgMjQuNjQ0NTMxIDI4IDI2IDI2LjY0NDUzMSAyNiAyNSBMIDI2IDkgTCAyNyA5IEwgMjcgNyBMIDIxIDcgTCAyMSA2IEMgMjEgNS40NzY1NjMgMjAuODE2NDA2IDQuOTQxNDA2IDIwLjQzNzUgNC41NjI1IEMgMjAuMDU4NTk0IDQuMTgzNTk0IDE5LjUyMzQzOCA0IDE5IDQgWiBNIDE1IDYgTCAxOSA2IEwgMTkgNyBMIDE1IDcgWiBNIDEwIDkgTCAyNCA5IEwgMjQgMjUgQyAyNCAyNS41NTQ2ODggMjMuNTU0Njg4IDI2IDIzIDI2IEwgMTEgMjYgQyAxMC40NDUzMTMgMjYgMTAgMjUuNTU0Njg4IDEwIDI1IFogTSAxMiAxMiBMIDEyIDIzIEwgMTQgMjMgTCAxNCAxMiBaIE0gMTYgMTIgTCAxNiAyMyBMIDE4IDIzIEwgMTggMTIgWiBNIDIwIDEyIEwgMjAgMjMgTCAyMiAyMyBMIDIyIDEyIFoiLz48L3N2Zz4="
            alt=""
          />
        </button>
      </div>

      <ConfirmModal
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        title={`Вы точно хотите удалить карточку ${card.title}`}
        isOpen={isConfirmModalOpen}
      />
    </div>
  );
};

export default Card;
