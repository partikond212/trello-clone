import { useState, type FC } from 'react';
import useEditBoard from '../model/useEditBoard';
import type { Image } from '../../../shared/utils/uploadImage';
import FileUpload from '../../../shared/ui/file-upload/FileUpload';
import type { Board } from '../../../pages/board-page/model/useBoard';
import styles from './EditBoardModal.module.css';

interface IEditBoardModal {
  onClose: () => void;
  isModalOpen: boolean;
  board: Board;
  onError:(error:Error) => void;
  onSuccess:() => void;
}

const EditBoardModal: FC<IEditBoardModal> = ({ onClose, isModalOpen, board,onError,onSuccess }) => {
  const [title, setTitle] = useState(board.title);
  const [image, setImage] = useState<Image>(board.image || '');
  const { mutate, isPending } = useEditBoard();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || trimmed.length === 0) return;
    mutate(
      { id: board.id, title: trimmed, image },
      {
        onSuccess: () => {
          onClose();
          if(onSuccess) onSuccess()
        },
        onError:(error) => {
          if(onError) onError(error as Error)
        }
      }
    );
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Редактировать доску</h2>
        <form onSubmit={handleSubmit}>
          <p>Название доски</p>
          <input
            type="text"
            placeholder="Введите название доски"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div style={{ marginTop: '12px' }}>
            <FileUpload
              onSuccess={setImage}
              label={image ? 'Изменить изображение' : 'Добавить изображение'}
            />
            {image && <p style={{ marginTop: '12px' }}>Изображение выбрано ✅</p>}
          </div>
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

export default EditBoardModal;