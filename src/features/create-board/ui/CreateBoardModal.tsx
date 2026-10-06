import { useState, type FC } from "react";
import { createPortal } from "react-dom";
import useCreateBoard from "../model/useCreateBoard";

import FileUpload from "../../../shared/ui/file-upload/FileUpload";
import ColorPicker from "@/shared/ui/color-picker/ui/ColorPicker";
import useTypewriter from "@/shared/hooks/useTypewriter";
import styles from "./CreateBoard.module.css";

interface ICreateBoardModalProps {
  onClose: () => void;
  isModalOpen: boolean;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}
const CreateBoardModal: FC<ICreateBoardModalProps> = ({
  onClose,
  isModalOpen,
  onError,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const { mutate, isPending } = useCreateBoard();
  const [color, setColor] = useState("#0079BF");
  const [coverState, setCoverState] = useState<"color" | "image">();
  const typedText = useTypewriter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || trimmed.length === 0) return;
    mutate(
      { title: trimmed, image, color, coverState },
      {
        onSuccess: () => {
          setTitle("");
          setImage("");
          setColor("");
          onClose();
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          if (onError) onError(error as Error);
        },
      },
    );
  };
  // Если модалка закрыта — не рендерим её вообще
  if (!isModalOpen) return null;
  else {
    return createPortal(
      <div className={styles.overlay}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h3>Создать доску</h3>
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
                  label={
                    image ? "Изменить изображение" : "Добавить изображение"
                  }
                />
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
                {isPending ? "Создание..." : "Создать"}
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.body,
    );
  }
};

export default CreateBoardModal;
