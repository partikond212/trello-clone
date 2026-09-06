import { useState, type FC } from 'react';
import useEditColumn from '../model/useEditColumn';
import type { Column } from '../../../entities/column/model/column';
import styles from './EditColumnModal.module.css';

interface IEditColumnModal {
  onClose: () => void;
  isModalOpen: boolean;
  column: Column;
  onError: (error: Error) => void;
  onSuccess: () => void;
}

const EditColumnModal: FC<IEditColumnModal> = ({
  onClose,
  isModalOpen,
  column,
  onError,
  onSuccess,
}) => {
  const [title, setTitle] = useState(column.title);
  const { mutate, isPending } = useEditColumn();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    mutate(
      { id: column.id, title: trimmed },
      {
        onSuccess: () => {
          onClose();
          onSuccess();
        },
        onError: (error) => onError(error as Error),
      }
    );
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Редактирование колонки</h2>
        <form onSubmit={handleSubmit}>
          <p>Название колонки</p>
          <input
            type="text"
            placeholder="Введите название колонки"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div className={styles.actionButtons}>
            <button type="button" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" disabled={isPending}>
              {isPending ? 'Сохраняется...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditColumnModal;
