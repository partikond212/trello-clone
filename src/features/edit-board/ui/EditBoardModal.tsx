import { useState, type FC } from "react";
import useEditBoard from "../model/useEditBoard";
import type { Image } from "../../../shared/utils/uploadImage";
import FileUpload from "../../../shared/ui/file-upload/FileUpload";
import type { BoardT } from "../../../pages/board-page/model/useBoard";
import ColorPicker from "@/shared/ui/color-picker/ui/ColorPicker";

import styles from "./EditBoardModal.module.css";
import useTypewriter from "@/shared/hooks/useTypewriter";
interface IEditBoardModal {
  onClose: () => void;
  isModalOpen: boolean;
  board: BoardT;
  onError: (error: Error) => void;
  onSuccess: () => void;
}

const EditBoardModal: FC<IEditBoardModal> = ({
  onClose,
  isModalOpen,
  board,
  onError,
  onSuccess,
}) => {
  const [color, setColor] = useState(board.color || "#0079BF");
  const [coverState, setCoverState] = useState(board.coverState);
  const [title, setTitle] = useState(board.title);
  const [image, setImage] = useState<Image>(board.image || "");
  const { mutate, isPending } = useEditBoard();
  const typedText = useTypewriter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || trimmed.length === 0) return;
    mutate(
      { id: board.id, title: trimmed, image, color, coverState },
      {
        onSuccess: () => {
          onClose();
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          if (onError) onError(error as Error);
        },
      },
    );
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Редактировать доску</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.addTitleBlock}>
            <label htmlFor="title">Название доски</label>
            <input
              id="title"
              type="text"
              placeholder={`Например: ${typedText}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className={styles.chooseButtons}>
            <button type="button" onClick={() => setCoverState("color")}>
              Обложка
            </button>
            <button type="button" onClick={() => setCoverState("image")}>
              Изображение
            </button>
          </div>
          {coverState === "image" ? (
            <div className={styles.fileUpload}>
              <FileUpload
                onSuccess={setImage}
                label={image ? "Изменить изображение" : "Добавить изображение"}
              />
              {board.image && (
                <p style={{ marginTop: "12px" }}>Изображение выбрано ✅</p>
              )}
            </div>
          ) : (
            <div className={styles.uploadCover}>
              <div className={styles.colorPicker}>
                <span>Выберите цвет обложки </span>
                <ColorPicker color={color} setColor={setColor} />
              </div>
              <div className={styles.colorInput}>
                <label htmlFor="colorInputField">Введите его вручную</label>
                <input
                  id="colorInputField"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className={styles.actionButtons}>
            <button type="button" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" disabled={isPending}>
              {isPending ? "Изменение..." : "Изменить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBoardModal;
