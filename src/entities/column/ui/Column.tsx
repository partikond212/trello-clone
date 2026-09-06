import { useState, type FC } from "react";
import styles from "./Column.module.css";
import type { Column as ColumnModel } from "../model/column";
import useCards from "../../card/model/useCards";
import Card from "../../card/ui/Card";
import ColumnMenu from "./components/ColumnMenu";
import { useNavigate } from "react-router-dom";
import CreateCardModal from "@/features/create-card/ui/CreateCardModal";
import useModal from "@/shared/hooks/useModal";
import { useNotification } from "@/app/context/NotificationContext";
type ColumnProps = {
  column: ColumnModel;
  onDeleteSuccess: () => void;
  onDeleteCancel: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const Column: FC<ColumnProps> = ({ column, onDelete, onEdit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isModalOpen: isCreateCardOpen,
    closeModal: closeCreateCard,
    openModal,
  } = useModal();
  const { data: cards } = useCards(column.id);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleNavToColumnPage = () => {
    navigate(`/columns/${column.id}`);
  };
  const handleEdit = () => {
    onEdit();
  };
  const handleAddCard = () => {
    openModal();
  };
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <div className={styles.columnTitle}>{column.title}</div>
        <div className={styles.columnActionsButton}>
          <button onClick={() => toggleMenu()}>⋮</button>
        </div>
        <ColumnMenu
          onEdit={() => handleEdit()}
          isMenuOpen={isMenuOpen}
          onDelete={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          NavToColumnPage={() => handleNavToColumnPage()}
        />
      </div>
      <div className={styles.columnCards}>
        {cards?.map((card) => (
          <Card key={card.id} card={card} column={column} />
        ))}
      </div>
      <button className={styles.addCardbutton} onClick={() => handleAddCard()}>
        + Добавить карточку
      </button>

      <CreateCardModal
        column={column}
        onClose={closeCreateCard}
        isModalOpen={isCreateCardOpen}
        onSuccess={() => showNotification("Вы создали карточку", "success")}
        onError={() => showNotification("Вы не создали карточку", "error")}
      />
    </div>
  );
};

export default Column;
