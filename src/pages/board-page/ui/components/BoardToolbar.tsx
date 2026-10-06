import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import type { BoardT } from "../../model/useBoard";
import UserAvatar from "@/entities/user/ui/UserAvatar";
import styles from "./BoardToolbar.module.css";

type BoardToolbarProps = {
  board: BoardT;
  onBtnClick: () => void;
  onInvite: () => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
};
const BoardToolbar: FC<BoardToolbarProps> = ({
  board,
  onBtnClick,
  onInvite,
  selectedTag,
  onTagChange,
}) => {
  const navigate = useNavigate();
  const handleNavToBoardsPage = () => {
    navigate("/");
  };
  const members = [board.owner, ...(board.members ?? [])];

  return (
    <header className={styles.boardToolBar}>
      <div className={styles.leftActionBlock}>
        <button
          className={styles.navToBoardsButton}
          onClick={handleNavToBoardsPage}
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
          Назад
        </button>
        <span className={styles.boardTitle}>{board.title}</span>
        <div className={styles.boardMembers}>
          {members.map((member) => (
            <UserAvatar
              className={styles.boardMember}
              user={member}
              key={member.id}
            />
          ))}
          <button onClick={onInvite} className={styles.addNewMember}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="grey"
              stroke-width="2.4"
              stroke-linecap="round"
            >
              <path data-dc-tpl="156" d="M12 5v14"></path>
              <path data-dc-tpl="157" d="M5 12h14"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.rightActionBlock}>
        <div className={styles.filterTheColumns}>
          <svg
            data-dc-tpl="160"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5E6C84"
            stroke-width="2.2"
            stroke-linecap="round"
          >
            <path data-dc-tpl="161" d="M4 6h16"></path>
            <path data-dc-tpl="162" d="M7 12h10"></path>
            <path data-dc-tpl="163" d="M10 18h4"></path>
          </svg>
          <div className={styles.selectBlock}>
            <select
              value={selectedTag}
              onChange={(e) => onTagChange(e.target.value)}
            >
              <option value="Все">Все метки </option>
              <option value="Баг">Баг</option>
              <option value="Фича">Фича</option>
              <option value="Дизайн">Дизайн</option>
              <option value="Срочно">Срочно</option>
              <option value="Инфра">Инфра</option>
              <option value="Документы">Документы</option>
            </select>
          </div>
        </div>
        <button
          onClick={onBtnClick}
          className={styles.createNewColumn}
          aria-label="Добавить колонку"
        >
          <svg
            data-dc-tpl="169"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
          >
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
          <span className={styles.createNewColumnLabel}>Добавить колонку</span>
        </button>
      </div>
    </header>
  );
};

export default BoardToolbar;
