import { useEffect, useRef, useState, type FC } from "react";
import type { BoardT as BoardModel } from "../../../pages/board-page/model/useBoard";
import { useNavigate } from "react-router-dom";
import BoardMenu from "./components/board-menu/BoardMenu";
import UserAvatar from "@/entities/user/ui/UserAvatar";
import styles from "./Board.module.css";

interface IBoardProps {
  board: BoardModel;
  onEdit: () => void;
  onDelete: () => void;
}
const Board: FC<IBoardProps> = ({ board, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const users = [board.owner, ...(board.members ?? [])];

  const navigate = useNavigate();
  const boardRef = useRef<HTMLDivElement>(null);
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    onDelete();
  };
  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };
  const handleNavToBoardPage = () => {
    navigate(`/boards/${board.id}`);
  };
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    onEdit();
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (boardRef.current && !boardRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setIsMenuOpen]);

  return (
    <div ref={boardRef} className={styles.board}>
      {board.coverState === "image" ? (
        <div className={styles.BoardImage}>
          <img src={board.image} alt={board.title} loading="lazy" />
          <button
            title="Меню доски"
            className={styles.menuButton}
            onClick={toggleMenu}
          >
            <svg
              data-dc-tpl="122"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle data-dc-tpl="123" cx="5" cy="12" r="1.8"></circle>
              <circle data-dc-tpl="124" cx="12" cy="12" r="1.8"></circle>
              <circle data-dc-tpl="125" cx="19" cy="12" r="1.8"></circle>
            </svg>
          </button>
        </div>
      ) : (
        <div
          className={styles.boardCover}
          style={{ background: board.color || "#0079BF" }}
        >
          <button
            title="Меню доски"
            className={styles.menuButton}
            onClick={toggleMenu}
          >
            <svg
              data-dc-tpl="122"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle data-dc-tpl="123" cx="5" cy="12" r="1.8"></circle>
              <circle data-dc-tpl="124" cx="12" cy="12" r="1.8"></circle>
              <circle data-dc-tpl="125" cx="19" cy="12" r="1.8"></circle>
            </svg>
          </button>
        </div>
      )}
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3>{board.title}</h3>
        </div>
        <div className={styles.cardsAndColumnsCount}>
          <p>
            <svg
              data-dc-tpl="106"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
            >
              <rect
                data-dc-tpl="107"
                x="3"
                y="4"
                width="5"
                height="16"
                rx="1.6"
              ></rect>
              <rect
                data-dc-tpl="108"
                x="10"
                y="4"
                width="5"
                height="11"
                rx="1.6"
              ></rect>
              <rect
                data-dc-tpl="109"
                x="17"
                y="4"
                width="4"
                height="7"
                rx="1.6"
              ></rect>
            </svg>
            {board.columnsCount} колонок
          </p>
          <p>
            <svg
              data-dc-tpl="111"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
            >
              <rect
                data-dc-tpl="112"
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2.5"
              ></rect>
              <path data-dc-tpl="113" d="M7 10h7"></path>
            </svg>{" "}
            {board.cardsCount} карточек
          </p>
        </div>
      </div>
      <div className={styles.boardUsers}>
        {users.map((u) => (
          <div>
            <UserAvatar className={styles.boardUser} key={u.id} user={u} />
          </div>
        ))}
      </div>
      <div className={styles.cardActions}>
        <BoardMenu
          NavToBoardPage={handleNavToBoardPage}
          onDelete={handleDelete}
          onEdit={handleEdit}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </div>
  );
};

export default Board;
