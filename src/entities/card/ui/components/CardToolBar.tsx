import { useState, type FC } from "react";
import type { Card } from "../../model/card";
import type { BoardT } from "@/pages/board-page/model/useBoard";
import type { Column } from "@/entities/column/model/column";
import { Link, useNavigate } from "react-router-dom";

import styles from "./CardToolBar.module.css";
type CardToolBarProps = {
  card: Card;
  column: Column;
  board: BoardT;
  onCardDelete: () => void;
  onSave: (title: string) => void;
};
const CardToolBar: FC<CardToolBarProps> = ({
  card,
  column,
  board,
  onCardDelete,
  onSave,
}) => {
  const navigate = useNavigate();
  const [cardTitle, setCardTitle] = useState(card.title);
  const handleNavToBoardPage = () => {
    navigate(`/boards/${board.id}`);
  };
  const handleEditCard = () => {
    onSave(cardTitle);
  };
  return (
    <header className={styles.cardToolBarWrapper}>
      <div className={styles.cardToolBar}>
        <nav className={styles.pageNavigation} aria-label="breadcrumb">
          <Link className={styles.navElement} to={"/"}>
            Мои доски
          </Link>
          /
          <Link className={styles.navElement} to={`/boards/${board.id}`}>
            {board.title}
          </Link>
          /<span className={styles.navElement}>{column.title}</span>
        </nav>
        <div className={styles.bottomToolBar}>
          <button
            className={styles.navToBoardsButton}
            onClick={handleNavToBoardPage}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          <input
            type="text"
            value={cardTitle}
            className={styles.inputCardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <button className={styles.saveCardChanges} onClick={handleEditCard}>
            Сохранить
          </button>
          <div className={styles.trashCanBlock}>
            <button onClick={onCardDelete} className={styles.trashCanWrapper}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#BF2600"
                stroke-width="2.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 7h16"></path>
                <path d="M9 7V5h6v2"></path>
                <path d="M6 7l1 13h10l1-13"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CardToolBar;
