import { useState, type FC } from "react";
import Header from "../../../widgets/header/ui/Header";

import CreateBoardModal from "../../../features/create-board/ui/CreateBoardModal";
import useModal from "../../../shared/hooks/useModal";
import useBoards from "../model/useBoards";
import Board from "../../../entities/board/ui/Board";
import EditBoardModal from "../../../features/edit-board/ui/EditBoardModal";
import useDeleteBoard from "../../../entities/board/model/useDeleteBoard";
import ConfirmModal from "../../../shared/ui/modals/confirm-modal/ConfirmModal";
import { useNotification } from "../../../app/context/NotificationContext";
import { useSearchParams } from "react-router-dom";
import type { BoardT } from "@/pages/board-page/model/useBoard";
import styles from "./BoardsPage.module.css";
import JoinBoardModal from "@/features/join-board/ui/JoinBoardModal";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
const BoardsPage: FC = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const {
    isModalOpen: isCreateOpen,
    closeModal: closeCreate,
    openModal: openCreate,
  } = useModal();
  const {
    isModalOpen: isJoinModalOpen,
    closeModal: closeJoinModal,
    openModal: openJoinModal,
  } = useModal();
  const { mutate: deleteBoard } = useDeleteBoard();
  const [deletingBoard, setDeletingBoard] = useState<BoardT | null>(null);

  const {
    isModalOpen: isEditOpen,
    closeModal: closeEdit,
    openModal: openEdit,
  } = useModal();
  const { data: boards, isLoading, error } = useBoards();
  const [editingBoard, setEditingBoard] = useState<BoardT | null>(null);
  const { showNotification } = useNotification();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const filteredBoards = boards?.filter((b) =>
    b.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  const handleConfirmDelete = () => {
    if (!deletingBoard) return;
    setDeletingBoard(deletingBoard);
    setIsConfirmOpen(false);
    deleteBoard(deletingBoard.id, {
      onSuccess: () => {
        showNotification("Доска удалена", "success");
      },
      onError: (e) => {
        showNotification(getErrorMessage(e, "Не удалось удалить доску"), "error");
      },
    });
  };
  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setDeletingBoard(null);
    showNotification("Вы отменили удаление доски", "info");
  };

  const handleEdit = (board: BoardT) => {
    setEditingBoard(board);
    openEdit();
  };

  const handleDeleteClick = (board: BoardT) => {
    setDeletingBoard(board);
    setIsConfirmOpen(true);
  };
  if (isLoading) {
    return <span>Загрузка...</span>;
  }
  if (error) {
    showNotification(getErrorMessage(error, "Не удалось загрузить доски"), "error");
  }
  return (
    <div className={styles.BoardsPage}>
      <Header />
      <div className={styles.BoardsPageContent}>
        <div className={styles.boardsTitle}>
          <h1>Мои доски</h1>
          <div className={styles.boardsCounter}>{boards?.length} Досок</div>
        </div>
        <div>
          <p>Хотите присоединиться к чужой доске?</p>
          <button
            className={styles.joinBoardBtn}
            onClick={() => openJoinModal()}
          >
            Присоединиться
          </button>
        </div>
        <p>
          Рабочее пространство команды. Откройте доску, чтобы работать с
          канбаном, или создайте новую.
        </p>
        <div className={styles.boardsGrid}>
          {filteredBoards?.map((board) => (
            <Board
              key={board.id}
              board={board}
              onEdit={() => handleEdit(board)}
              onDelete={() => handleDeleteClick(board)}
            />
          ))}
          <button className={styles.addBoardButton} onClick={openCreate}>
            <svg
              data-dc-tpl="134"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
            >
              <path data-dc-tpl="135" d="M12 5v14"></path>
              <path data-dc-tpl="136" d="M5 12h14"></path>
            </svg>
            Создать доску
          </button>
        </div>
        <CreateBoardModal
          onSuccess={() =>
            showNotification("Доска успешно создана!", "success")
          }
          onError={(error) =>
            showNotification(
              getErrorMessage(error, "Не удалось создать доску"),
              "error",
            )
          }
          isModalOpen={isCreateOpen}
          onClose={closeCreate}
        />
        {editingBoard && (
          <EditBoardModal
            onSuccess={() => showNotification("Доска изменена", "success")}
            onError={(error) =>
              showNotification(
                getErrorMessage(error, "Не удалось отредактировать доску"),
                "error",
              )
            }
            isModalOpen={isEditOpen}
            onClose={closeEdit}
            board={editingBoard}
          />
        )}
        {deletingBoard && (
          <ConfirmModal
            title="Удалить доску?"
            message={`Доска «${deletingBoard.title}»,${deletingBoard.columnsCount} колонок и все карточки будут удалены. Действие нельзя отменить.`}
            isOpen={isConfirmOpen}
            onCancel={() => handleCancelDelete()}
            onConfirm={() => handleConfirmDelete()}
          />
        )}
        <JoinBoardModal
          isModalOpen={isJoinModalOpen}
          closeModal={closeJoinModal}
        />
      </div>
    </div>
  );
};

export default BoardsPage;
