import React, { type FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useModal from "@/shared/hooks/useModal";
import NotificationsList from "./components/NotificationsList";
import { useAuth } from "@/app/context/AuthContext";
import UserAvatar from "@/entities/user/ui/UserAvatar";
import CreateBoardModal from "@/features/create-board/ui/CreateBoardModal";
import { useNotification } from "@/app/context/NotificationContext";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import styles from "./Header.module.css";
const Header: FC = () => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const {
    isModalOpen: isCreateOpen,
    closeModal: closeCreate,
    openModal: openCreate,
  } = useModal();
  const { showNotification } = useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const query = searchParams.get("q") ?? "";
  const navigate = useNavigate();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value }, { replace: true });
  };
  const toggleNotificationsMenu = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleAuth = () => {
    navigate("/user/me");
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerSearchAndLogo}>
        <div className={styles.headerLogo}>
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#fff" />
            <rect x="7" y="7" width="7" height="18" rx="2" fill="#0079BF" />
            <rect x="18" y="7" width="7" height="11" rx="2" fill="#0079BF" />
          </svg>
          <span>Trello-clone</span>
        </div>
        <div className={styles.headerSearchField}>
          <svg
            className={styles.searchSvg}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="8"
              cy="8"
              r="5.5"
              stroke="#fff"
              strokeWidth="1.8"
            />
            <line
              x1="12"
              y1="12"
              x2="16.5"
              y2="16.5"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <input
            onChange={(e) => handleSearchChange(e)}
            value={query}
            className={styles.headerInput}
            type="text"
            autoFocus
            placeholder="Поиск досок и карточек"
          />
        </div>
      </div>
      <div className={styles.headerActions}>
        <div className={styles.addBoardBlock}>
          <button
            className={styles.addBoardBtn}
            onClick={openCreate}
            aria-label="Создать доску"
          >
            <span aria-hidden="true">+</span>
            <span className={styles.addBoardLabel}>Создать доску</span>
          </button>
        </div>
        <div className={styles.incomingNotifications}>
          <NotificationsList isOpen={isModalOpen} />
          <button onClick={toggleNotificationsMenu}>
            <svg width="32" height="32" viewBox="0 0 36 36" aria-hidden="true">
              <circle cx="18" cy="18" r="18" fill="#3d99ce" />
              <path
                d="M18 10c-3.3 0-6 2.7-6 6v3.5L10 22h16l-2-2.5V16c0-3.3-2.7-6-6-6Z"
                fill="none"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M16 24a2 2 0 0 0 4 0"
                fill="none"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className={styles.userProfile}>
          <button onClick={() => handleAuth()}>
            {user ? (
              <UserAvatar user={user} />
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 36 36"
                aria-hidden="true"
              >
                <circle cx="18" cy="18" r="18" fill="#fff" />
                <circle cx="18" cy="14" r="6" fill="#3d99ce" />
                <path d="M6 32c0-7 5.4-11 12-11s12 4 12 11" fill="#3d99ce" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <CreateBoardModal
        onSuccess={() => showNotification("Доска успешно создана!", "success")}
        onError={(error) =>
          showNotification(
            getErrorMessage(error, "Не удалось создать доску"),
            "error",
          )
        }
        isModalOpen={isCreateOpen}
        onClose={closeCreate}
      />
    </header>
  );
};

export default Header;
