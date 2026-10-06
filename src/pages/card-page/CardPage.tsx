import { useCard } from "@/entities/card/model/useCard";
import useComments from "@/entities/comment/model/useComments";
import { useNavigate, useParams } from "react-router-dom";
import { useState, type FC } from "react";
import Comment from "@/entities/comment/ui/Comment";
import CreateComment from "@/features/create-comment/ui/CreateComment";
import CardToolBar from "@/entities/card/ui/components/CardToolBar";
import { useBoard } from "../board-page/model/useBoard";
import { useColumn } from "@/entities/column/model/column";
import Header from "@/widgets/header/ui/Header";
import useModal from "@/shared/hooks/useModal";
import ConfirmModal from "@/shared/ui/modals/confirm-modal/ConfirmModal";
import useDeleteCard from "@/features/delete-card/model/useDeleteCard";
import { useNotification } from "@/app/context/NotificationContext";
import ChooseTagButton from "./components/choose-tag-button/ChooseTagButton";
import { chooseTagButtons } from "@/shared/constants/tags";
import CheckList from "./components/check-list/CheckList";
import type { Card } from "../../entities/card/model/card";
import styles from "./CardPage.module.css";
import useEditCard from "@/features/edit-card/model/useEditCard";
import { toInputDate } from "@/shared/utils/date";
const CardPage: FC = () => {
  const { id } = useParams();
  const { data: card, isLoading } = useCard(id!);
  const [cardPriority, setCardPriority] = useState<Card["priority"]>(
    card?.priority,
  );
  const [dueDate, setDueDate] = useState<Card["dueDate"]>(
    toInputDate(card?.dueDate),
  );

  const priorityOrder: Card["priority"][] = ["high", "mid", "low"];
  const priorityIndex = cardPriority ? priorityOrder.indexOf(cardPriority) : -1;
  const [description, setDescription] = useState(card?.description);
  const { data: column } = useColumn(card?.columnId ?? "");
  const { data: board } = useBoard(column?.boardId ?? "");
  const { mutate: deleteCard } = useDeleteCard(card?.columnId ?? "");
  const { data: comments } = useComments(id!);
  const [cardTasks, setCardTasks] = useState(card?.tasks);
  const navigate = useNavigate();
  const [cardTags, setCardTags] = useState(card?.tags ?? []);
  const [newTaskText, setNewTaskText] = useState("");
  const { showNotification } = useNotification();
  const total = cardTasks?.length ?? 0;
  const done = cardTasks?.filter((t) => t.isDone).length ?? 0;
  const progress = total ? (done / total) * 100 : 0;
  const {
    isModalOpen: isDeleteCardOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteCardModal,
  } = useModal();
  const { mutate: editCard } = useEditCard(card!);
  if (isLoading) {
    return <div>Загрузка...</div>;
  } else if (!card) return <h1>Не удалось загрузить карточку</h1>;
  else if (!board || !column) {
    return <div>Ошибка....</div>;
  }
  const handleSaveCardChanges = (title: string) => {
    editCard(
      {
        title,
        description,
        tasks: cardTasks,
        tags: cardTags,
        priority: cardPriority,
        dueDate: dueDate,
      },
      {
        onSuccess: () => {
          showNotification("Вы сохранили карточку", "success");
        },
        onError: () => {
          showNotification("Вы не сохранили карточку", "error");
        },
      },
    );
  };
  const handleAddTask = () => {
    const trimmed = newTaskText.trim();
    if (!trimmed) return;
    setCardTasks((prev) => [
      ...(prev ?? []),
      { taskTitle: trimmed, isDone: false },
    ]);
    setNewTaskText("");
  };
  const toggleTask = (index: number) => {
    setCardTasks((prev) =>
      prev?.map((task, i) =>
        i === index ? { ...task, isDone: !task.isDone } : task,
      ),
    );
  };
  const toggleTag = (tagName: string) => {
    setCardTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName],
    );
  };
  const handleDeleteCard = () => {
    deleteCard(
      { cardId: card.id },
      {
        onSuccess: () => {
          showNotification("Вы удалили данную карточку", "success");
          closeDeleteCardModal();
          setTimeout(() => {
            navigate(`/boards/${board.id}`);
          }, 1000);
        },
        onError: () => {
          closeDeleteCardModal();
          showNotification("Вы не смогли удалить карточку", "error");
        },
      },
    );
  };

  return (
    <div>
      <Header />
      <CardToolBar
        onCardDelete={() => openDeleteModal()}
        card={card}
        column={column}
        board={board}
        onSave={handleSaveCardChanges}
      />
      <div className={styles.page}>
        <div className={styles.inputFields}>
          <div className={styles.cardDescription}>
            <label htmlFor="inputCardDescription">Описание</label>
            <textarea
              placeholder="Добавьте детали, ссылки, критерии приёмки…"
              id="inputCardDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.cardCheckList}>
            <label htmlFor="Thumb">
              ЧЕК-ЛИСТ {cardTasks?.filter((t) => t.isDone).length ?? 0} /
              {cardTasks?.length ?? 0}
            </label>
            <div id="Thumb" className={styles.checkListThumbWrapper}>
              <div
                className={styles.checkListThumb}
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
            <CheckList onToggle={toggleTask} cardTasks={cardTasks} />
            <div className={styles.addCheckListEl}>
              <input
                type="text"
                placeholder="Добавить пункт"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
              />
              <button onClick={handleAddTask}>Добавить</button>
            </div>
          </div>
          <section className={styles.commentsSection}>
            <span className={styles.sectionTitle}>Оставьте комментарий</span>
            <div className={styles.createComment}>
              <CreateComment card={card} />
            </div>

            <div className={styles.commentsList}>
              {comments?.map((c) => (
                <Comment key={c.id} comment={c} />
              ))}
            </div>
          </section>
        </div>
        <div className={styles.settingsFields}>
          <div className={styles.cardTags}>
            <label htmlFor="Btn_tags">МЕТКИ</label>
            <div id="Btn_tags" className={styles.chooseTagsBtns}>
              {chooseTagButtons.map((button) => (
                <ChooseTagButton
                  onToggle={() => toggleTag(button.tagName)}
                  isSelected={cardTags.includes(button.tagName)}
                  key={button.tagName}
                  tagName={button.tagName}
                  tagColor={button.tagColor}
                />
              ))}
            </div>
          </div>
          <div className={styles.cardPriority}>
            <label htmlFor="priority">ПРИОРИТЕТ</label>
            <div className={styles.priorityBtns} id="priority">
              <div
                className={styles.priorityThumb}
                style={{
                  transform: `translateX(${priorityIndex * 100}%)`,
                }}
              ></div>
              <button
                className={`${styles.priorityBtn} ${cardPriority === "high" ? styles.high : ""}`}
                onClick={() => setCardPriority("high")}
              >
                Высокий
              </button>
              <button
                className={`${styles.priorityBtn} ${cardPriority === "mid" ? styles.mid : ""}`}
                onClick={() => setCardPriority("mid")}
              >
                Средний
              </button>
              <button
                className={`${styles.priorityBtn} ${cardPriority === "low" ? styles.low : ""}`}
                onClick={() => setCardPriority("low")}
              >
                Низкий
              </button>
            </div>
          </div>
          <div className={styles.cardDeadLine}>
            <label htmlFor="deadline">Срок</label>
            <div className={styles.inputCardDeadline}>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        title={`Вы уверены что хотите удалить эту карточку?`}
        isOpen={isDeleteCardOpen}
        onConfirm={() => handleDeleteCard()}
        onCancel={() => closeDeleteCardModal()}
      />
    </div>
  );
};

export default CardPage;
