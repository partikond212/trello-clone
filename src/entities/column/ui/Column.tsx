import { useState, useEffect, type FC, useRef } from "react";
import type { Column as ColumnModel } from "../model/column";
import type { Card as CardModel } from "../../card/model/card";
import useCards from "../../card/model/useCards";
import Card from "../../card/ui/Card";
import ColumnMenu from "./components/ColumnMenu";
import CreateCardModal from "@/features/create-card/ui/CreateCardModal";
import useModal from "@/shared/hooks/useModal";
import { useNotification } from "@/app/context/NotificationContext";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import styles from "./Column.module.css";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { createPortal } from "react-dom";
type ColumnProps = {
  column: ColumnModel;
  onDeleteSuccess: () => void;
  onDeleteCancel: () => void;
  onDelete: () => void;
  onEdit: () => void;
  selectedTag: string;
  localCards?: CardModel[];
};

const Column: FC<ColumnProps> = ({
  column,
  onDelete,
  onEdit,
  selectedTag,
  localCards,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isModalOpen: isCreateCardOpen,
    closeModal: closeCreateCard,
    openModal,
    setIsModalOpen: setIsCreateModalOpen,
  } = useModal();
  const { data: serverCards } = useCards(column.id);
  const cards = localCards ?? serverCards;
  const { showNotification } = useNotification();
  const columnRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const visibleCards = cards?.filter(
    (card) => selectedTag === "Все" || card.tags?.includes(selectedTag),
  );

  const handleEdit = () => {
    onEdit();
    setIsMenuOpen(false);
  };
  const handleAddCard = () => {
    openModal();
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (columnRef.current && !columnRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        setIsCreateModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setIsCreateModalOpen]);

  return (
    <div className={styles.column} ref={columnRef}>
      <div className={styles.columnHeader}>
        <div className={styles.leftHeaderSide}>
          <svg
            data-dc-tpl="198"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="#A5ADBA"
          >
            <circle data-dc-tpl="199" cx="9" cy="6" r="1.6"></circle>
            <circle data-dc-tpl="200" cx="15" cy="6" r="1.6"></circle>
            <circle data-dc-tpl="201" cx="9" cy="12" r="1.6"></circle>
            <circle data-dc-tpl="202" cx="15" cy="12" r="1.6"></circle>
            <circle data-dc-tpl="203" cx="9" cy="18" r="1.6"></circle>
            <circle data-dc-tpl="204" cx="15" cy="18" r="1.6"></circle>
          </svg>
          <div className={styles.columnTitle}>{column.title}</div>
        </div>
        <div className={styles.columnActionsButton}>
          <button onClick={() => toggleMenu()}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <circle data-dc-tpl="212" cx="5" cy="12" r="1.8"></circle>
              <circle data-dc-tpl="213" cx="12" cy="12" r="1.8"></circle>
              <circle data-dc-tpl="214" cx="19" cy="12" r="1.8"></circle>
            </svg>
          </button>
        </div>
        <ColumnMenu
          onEdit={() => handleEdit()}
          isMenuOpen={isMenuOpen}
          onDelete={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          addCard={() => handleAddCard()}
        />
      </div>
      <div className={styles.columnCards}>
        <Droppable droppableId={column.id} type="CARD">
          {(provided, snapshot) => (
            <div
              className={styles.columnCards}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {visibleCards?.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided, snapshot) => {
                    const cardEl = (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card card={card} />
                      </div>
                    );
                    return snapshot.isDragging
                      ? createPortal(cardEl, document.body)
                      : cardEl;
                  }}
                </Draggable>
              ))}
              {!visibleCards?.length && (
                <div
                  className={`${styles.emptyColumnMessage} ${snapshot.isDraggingOver ? styles.active : ""}`}
                >
                  Перетащите карточку сюда
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

      <button
        className={`${styles.addCardButton} ${isCreateCardOpen ? styles.hideButton : ""}`}
        onClick={() => handleAddCard()}
      >
        <svg
          data-dc-tpl="285"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
        >
          <path data-dc-tpl="286" d="M12 5v14"></path>
          <path data-dc-tpl="287" d="M5 12h14"></path>
        </svg>
        Добавить карточку
      </button>

      <CreateCardModal
        column={column}
        onClose={closeCreateCard}
        isModalOpen={isCreateCardOpen}
        onSuccess={() => showNotification("Вы создали карточку", "success")}
        onError={(error) =>
          showNotification(
            getErrorMessage(error, "Не удалось создать карточку"),
            "error",
          )
        }
      />
    </div>
  );
};

export default Column;
