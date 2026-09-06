import {type FC} from 'react';
import styles from './BoardMenu.module.css';
export type BoardMenuProps ={
    isMenuOpen:boolean,
  onEdit:(e:React.MouseEvent) => void,
  onDelete:(e:React.MouseEvent) => void,
  NavToBoardPage: () => void
}

const BoardMenu:FC<BoardMenuProps> = ({isMenuOpen,onEdit,onDelete,NavToBoardPage}) => {

  if(!isMenuOpen) {
    return null
  }
  return (
    <div className={styles.menu}>
    <button onClick={onEdit}>Редактировать</button>
    <button onClick={onDelete}>Удалить</button>
    <button onClick={NavToBoardPage}>детали</button>
  </div>)
};

export default BoardMenu;