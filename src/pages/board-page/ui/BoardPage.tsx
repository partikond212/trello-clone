import { useState, type FC } from "react";
import { flushSync } from "react-dom";
import { useParams } from "react-router-dom";
import { useBoard } from "../model/useBoard";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";

import Header from "../../../widgets/header/ui/Header";
import {
  useColumns,
  type Column as ColumnEntity,
} from "../../../entities/column/model/column";
import Column from "@/entities/column/ui/Column";
import useModal from "../../../shared/hooks/useModal";
import CreateColumnModal from "../../../features/create-column/ui/CreateColumnModal";
import { useNotification } from "../../../app/context/NotificationContext";
import DeleteColumnModal from "../../../features/delete-column/ui/DeleteColumnModal";
import useDeleteColumn from "../../../features/delete-column/model/useDeleteColumn";
import EditColumnModal from "../../../features/edit-column/ui/EditColumnModal";
import BoardToolbar from "./components/BoardToolbar";
import useCreateInvite from "@/features/create-invite/model/useCreateInvite";
import { useAuth } from "@/app/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import useMoveCard from "@/features/move-card/model/useMoveCard";
import useMediaQuery from "@/shared/hooks/useMediaQuery";
import useEditColumn from "@/features/edit-column/model/useEditColumn";
import type { Card } from "@/entities/card/model/card";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import styles from "./BoardPage.module.css";

const BoardPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const { showNotification } = useNotification();
  const { mutate: createInvite } = useCreateInvite();
  const { isModalOpen, closeModal, openModal } = useModal();
  const { mutate: moveCard } = useMoveCard();
  const { mutate: editColumn } = useEditColumn();
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery("(max-width: 768px)");
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
  const [deletingColumn, setDeletingColumn] = useState<ColumnEntity | null>(
    null,
  );
  const [selectedTag, setSelectedTag] = useState("Все");
  const [localColumns, setLocalColumns] = useState<ColumnEntity[] | null>(null);
  const [localCards, setLocalCards] = useState<Record<string, Card[]>>({});

  const safeFlushSync = (fn: () => void) => {
    try {
      flushSync(fn);
    } catch (error) {
      console.error("flushSync failed, falling back to normal update", error);
      fn();
    }
  };

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

  const handleCreateInvite = () => {
    createInvite(
      { id: board.id, token },
      {
        onSuccess: (data) => {
          showNotification(
            "Вы успешно скопировали ссылку на приглашение пользователя",
            "success",
          );
          const link = `${window.location.origin}/boards/join/${data}`;
          navigator.clipboard.writeText(link);
        },
        onError: (error) => {
          showNotification(
            getErrorMessage(error, "Не удалось создать ссылку-приглашение"),
            "error",
          );
        },
      },
    );
  };
  const handleConfirmDelete = () => {
    if (!deletingColumn) return;
    setDeletingColumn(deletingColumn);
    setIsDeleteModalOpen(true);
    deleteColumn(deletingColumn.id, {
      onSuccess: () => {
        showNotification("Вы успешно удалили колонку", "success");
        onClose();
      },
      onError: (error) => {
        showNotification(
          getErrorMessage(error, "Не удалось удалить колонку"),
          "error",
        );
      },
    });
  };
  const sortedColumns = [...(columns || []).sort((a, b) => a.order - b.order)];
  const displayColumns = localColumns ?? sortedColumns;
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

  const editErrorHandler = (error: Error) => {
    showNotification(
      getErrorMessage(error, "Не удалось отредактировать колонку"),
      "error",
    );
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
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (result.type === "COLUMN") {
      const columns = queryClient.getQueryData<ColumnEntity[]>([
        "columns",
        board.id,
      ]);
      if (!columns) return;

      const reordered = [...columns];
      const [moved] = reordered.splice(source.index, 1);
      if (!moved) return;
      reordered.splice(destination.index, 0, moved);

      const nextColumns = reordered.map((column, index) => ({
        ...column,
        order: index,
      }));

      // Сразу синхронно перерисовываем — без моргания назад
      safeFlushSync(() => setLocalColumns(nextColumns));
      queryClient.setQueryData(["columns", board.id], nextColumns);

      const clearLocalColumns = () => setLocalColumns(null);

      reordered.forEach((column, index) => {
        if (column.order === index) return;
        editColumn(
          { id: column.id, order: index },
          {
            onSuccess: () => {
              clearLocalColumns();
              queryClient.invalidateQueries({
                queryKey: ["columns", board.id],
              });
            },
            onError: (error) => {
              console.error("MOVE COLUMN FAILED", error);
              clearLocalColumns();
              showNotification(
                getErrorMessage(error, "Не удалось сохранить порядок колонок"),
                "error",
              );
              queryClient.invalidateQueries({
                queryKey: ["columns", board.id],
              });
            },
          },
        );
      });
      return;
    }

    if (result.type === "CARD") {
      const sameColumn = source.droppableId === destination.droppableId;

      const sourceCards = [
        ...(queryClient.getQueryData<Card[]>(["cards", source.droppableId]) ??
          []),
      ];
      const destCards = sameColumn
        ? sourceCards
        : [
            ...(queryClient.getQueryData<Card[]>([
              "cards",
              destination.droppableId,
            ]) ?? []),
          ];

      const [moved] = sourceCards.splice(source.index, 1);
      if (!moved) return;
      destCards.splice(destination.index, 0, moved);

      const nextSource = sourceCards.map((c, i) => ({
        ...c,
        order: i,
        columnId: source.droppableId,
      }));
      const nextDest = sameColumn
        ? nextSource
        : destCards.map((c, i) => ({
            ...c,
            order: i,
            columnId: destination.droppableId,
          }));

      // Сразу синхронно перерисовываем — без моргания назад
      safeFlushSync(() =>
        setLocalCards((prev) => ({
          ...prev,
          [source.droppableId]: nextSource,
          [destination.droppableId]: nextDest,
        })),
      );
      queryClient.setQueryData(["cards", source.droppableId], nextSource);
      if (!sameColumn) {
        queryClient.setQueryData(["cards", destination.droppableId], nextDest);
      }

      const clearLocalCards = () =>
        setLocalCards((prev) => {
          const next = { ...prev };
          delete next[source.droppableId];
          delete next[destination.droppableId];
          return next;
        });

      const notifyAndInvalidate = (error?: unknown) => {
        clearLocalCards();
        if (error) {
          console.error("MOVE CARD FAILED", error);
          showNotification(
            getErrorMessage(error, "Не удалось переместить карточку"),
            "error",
          );
        }
        queryClient.invalidateQueries({
          queryKey: ["cards", source.droppableId],
        });
        if (!sameColumn) {
          queryClient.invalidateQueries({
            queryKey: ["cards", destination.droppableId],
          });
        }
      };

      destCards.forEach((card, index) => {
        const columnId = destination.droppableId;
        if (card.order === index && card.columnId === columnId) return;
        moveCard(
          { card, columnId, order: index },
          {
            onSuccess: () => notifyAndInvalidate(),
            onError: (error) => notifyAndInvalidate(error),
          },
        );
      });

      if (!sameColumn) {
        sourceCards.forEach((card, index) => {
          if (card.order === index) return;
          moveCard(
            { card, columnId: source.droppableId, order: index },
            {
              onSuccess: () => notifyAndInvalidate(),
              onError: (error) => notifyAndInvalidate(error),
            },
          );
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.boardPage}>
        <Header />
        <div className={styles.boardColumnsWrapper}>
          <BoardToolbar
            board={board}
            onInvite={handleCreateInvite}
            onBtnClick={handleCreateColumn}
            onTagChange={setSelectedTag}
            selectedTag={selectedTag}
          />
          <div className={styles.boardColumns}>
            <Droppable
              droppableId="board"
              direction={isMobile ? "vertical" : "horizontal"}
              type="COLUMN"
            >
              {(provided) => (
                <div
                  className={styles.boardColumns}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {displayColumns.map((column, index) => (
                    <Draggable
                      key={column.id}
                      draggableId={column.id}
                      index={index}
                      isDragDisabled={isMobile}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...(isMobile ? {} : provided.dragHandleProps)}
                        >
                          <Column
                            onDelete={() => handleDelete(column)}
                            onDeleteSuccess={handleConfirmDelete}
                            onDeleteCancel={handleCancelDelete}
                            column={column}
                            onEdit={() => handleEdit(column)}
                            selectedTag={selectedTag}
                            localCards={localCards[column.id]}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
        <CreateColumnModal
          onError={(error) =>
            showNotification(
              getErrorMessage(error, "Не удалось создать колонку"),
              "error",
            )
          }
          onSuccess={() =>
            showNotification("Колонка успешно создана", "success")
          }
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
    </DragDropContext>
  );
};

export default BoardPage;
