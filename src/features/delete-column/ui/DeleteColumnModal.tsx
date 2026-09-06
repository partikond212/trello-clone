import {type FC} from 'react';
import styles from './DeleteColumnModal.module.css'

export type DeleteColumnModalType ={
 onCancel:() => void,
 onConfirm:() => void,
 message:string,
 title:string,
 isOpen:boolean,
 confirmLabel?:string,
 cancelLabel?:string,

}
const DeleteColumnModal:FC<DeleteColumnModalType> = ({onCancel,onConfirm,message,title,isOpen,confirmLabel='Удалить',cancelLabel='Отмена'}) => {
    if(!isOpen) {
        return null
    }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteColumnModal;