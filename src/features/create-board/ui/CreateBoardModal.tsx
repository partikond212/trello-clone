import { useState, type FC } from 'react';
import useCreateBoard from '../model/useCreateBoard';

import FileUpload from '../../../shared/ui/file-upload/FileUpload';
import styles from './CreateBoard.module.css';

interface ICreateBoardModalProps {
  onClose:() => void;
  isModalOpen:boolean;
  onError?:(error:Error) => void;
  onSuccess?:()=> void;
}
const CreateBoardModal:FC<ICreateBoardModalProps> = ({onClose,isModalOpen,onError,onSuccess}) => {
  const [title,setTitle]  =  useState('')
  const [image,setImage] = useState('')
  const {mutate,isPending} = useCreateBoard()


const handleSubmit = (e:React.FormEvent) => {
  e.preventDefault()
  const trimmed  = title.trim()
  if(!trimmed || trimmed.length === 0) return;
  mutate({title:trimmed,image},{
    onSuccess:() => {
      setTitle('')
      setImage('')
      onClose()
      if (onSuccess) onSuccess()
    },
    onError : (error) => {
       if (onError) onError(error as Error)
      }
  })
}
  // Если модалка закрыта — не рендерим её вообще
  if (!isModalOpen) return null;
  else {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Создать доску</h2>
       <form onSubmit={handleSubmit}>
          <p>Название доски</p>
          <input
            type="text"
            placeholder="Введите название доски"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div style={{marginTop:'12px'}}>
            <FileUpload onSuccess={setImage} label ={image? 'Изменить изображение' :'Добавить изображение'}/>
            {image && <p style={{marginTop:'12px'}}>Изображение выбрано ✅</p>}
          </div>
          <div className={styles.actionButtons}>
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit" disabled={isPending}>
              {isPending ? 'Создание...' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
};

export default CreateBoardModal;