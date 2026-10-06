import { type FC } from "react";
export type BoardMenuProps = {
  isMenuOpen: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  addCard: () => void;
};
import styles from "./ColumnMenu.module.css";

const ColumnMenu: FC<BoardMenuProps> = ({
  isMenuOpen,
  onEdit,
  onDelete,
  addCard,
}) => {
  return (
    <div className={`${styles.menu} ${isMenuOpen ? styles.active : ""}`}>
      <button onClick={addCard}>Добавить карточку</button>
      <button onClick={onEdit}>Переименовать колонку</button>
      <button onClick={onDelete}>Удалить</button>
    </div>
  );
};

export default ColumnMenu;
