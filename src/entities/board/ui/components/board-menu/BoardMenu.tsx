import { type FC } from "react";
import styles from "./BoardMenu.module.css";
export type BoardMenuProps = {
  isMenuOpen: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  NavToBoardPage: () => void;
};

const BoardMenu: FC<BoardMenuProps> = ({
  isMenuOpen,
  onEdit,
  onDelete,
  NavToBoardPage,
}) => {
  return (
    <div className={`${styles.menu}  ${!isMenuOpen ? styles.hidden : ""}`}>
      <button onClick={NavToBoardPage}>Открыть доск</button>
      <button onClick={onEdit}>Редактировать</button>
      <button onClick={onDelete}>Удалить доску</button>
    </div>
  );
};

export default BoardMenu;
