import { useState, type FC } from "react";
import { useParams } from "react-router-dom";
import { useBoard } from "../model/useBoard";
import Header from "../../../widgets/header/ui/Header";
import {
  useColumns,
  type Column as ColumnEntity,
} from "../../../entities/column/model/column";
import Column from "@/entities/column/ui/Column";
import useModal from "../../../shared/hooks/useModal";
import styles from "./BoardPage.module.css";
import CreateColumnModal from "../../../features/create-column/ui/CreateColumnModal";
import { useNotification } from "../../../app/context/NotificationContext";
import DeleteColumnModal from "../../../features/delete-column/ui/DeleteColumnModal";
import useDeleteColumn from "../../../features/delete-column/model/useDeleteColumn";
import EditColumnModal from "../../../features/edit-column/ui/EditColumnModal";

const BoardPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showNotification } = useNotification();
  const { isModalOpen, closeModal, openModal } = useModal();
  const {
    isModalOpen: isEditOpen,
    closeModal: closeEdit,
    openModal: openEdit,
  } = useModal();
  const {
    isModalOpen: isDeleteModalOpen,
    closeModal: onClose,
    setIsModalOpen: setIsDeleteModalOpen,
  } = useModal();
  const { data: board, isLoading } = useBoard(id!);
  const { data: columns } = useColumns(id!);
  const [deletingColumn, setDeletingColumn] = useState<ColumnEntity | null>(null);
  const [editingColumn, setEditingColumn] = useState<ColumnEntity | null>(null);
  const { mutate: deleteColumn } = useDeleteColumn(id!);
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  if (!board) return <div>Доска не найдена</div>;
  const handleCancelDelete = () => {
    showNotification("Вы отменили удаление колонки", "info");
    setDeletingColumn(null);
    onClose();
  };
  const handleConfirmDelete = () => {
    if (!deletingColumn) return;
    setDeletingColumn(deletingColumn);
    setIsDeleteModalOpen(true);
    console.log(deletingColumn);
    deleteColumn(deletingColumn.id, {
      onSuccess: () => {
        showNotification("Вы успешно удалили колонку", "success");
        onClose();
      },
      onError: () => {
        showNotification("Колонку не удалось удалить", "error");
      },
    });
  };
  const sortedColumns = [...(columns || []).sort((a, b) => a.order - b.order)];
  const handleCreateColumn = () => {
    openModal();
  };
  const handleDelete = (column: ColumnEntity) => {
    setDeletingColumn(column);
    setIsDeleteModalOpen(true);
  };

  const handleCloseEdit = () => {
    closeEdit();
    showNotification("Вы отказались редактировать колонку", "info");
  };

  const editErrorHandler = () => {
    showNotification("У вас не получилось отредактировать колонку", "error");
    closeEdit();
  };
  const handleEdit = (column: ColumnEntity) => {
    setEditingColumn(column);
    openEdit();
  };
  const handleConfirmEdit = () => {
    showNotification("Вы отредактировали колонку!", "success");
    closeEdit();
  };
  return (
    <div>
      <Header
        title={board.title}
        actions={
          <button onClick={() => handleCreateColumn()}>Добавить колонку</button>
        }
      />
      <div className={styles.boardColumns}>
        {sortedColumns.map((column: ColumnEntity) => (
          <Column
            onDelete={() => handleDelete(column)}
            onDeleteSuccess={handleConfirmDelete}
            onDeleteCancel={handleCancelDelete}
            key={column.id}
            column={column}
            onEdit={() => handleEdit(column)}
          />
        ))}
      </div>
      <CreateColumnModal
        onError={() => showNotification("Не удалось создать колонку", "error")}
        onSuccess={() => showNotification("Колонка успешно создана", "success")}
        board={board}
        isModalOpen={isModalOpen}
        onClose={closeModal}
      />
     
      <DeleteColumnModal
        onCancel={() => handleCancelDelete()}
        onConfirm={() => handleConfirmDelete()}
        title={"Удалить колонку?"}
        isOpen={isDeleteModalOpen}
        message={"Вы уверены что хотите удалить эту колонку?"}
      />

      {editingColumn && (
        <EditColumnModal
          onClose={() => handleCloseEdit()}
          onSuccess={() => handleConfirmEdit()}
          isModalOpen={isEditOpen}
          column={editingColumn}
          onError={editErrorHandler}
        />
      )}
    </div>
  );
};

export default BoardPage;
