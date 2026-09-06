import {type FC} from 'react';
export type BoardMenuProps ={
    isMenuOpen:boolean,
    onEdit:(e:React.MouseEvent) => void,
    onDelete:(e:React.MouseEvent) => void,
    NavToColumnPage: () => void,
}
import styles from './ColumnMenu.module.css';

const ColumnMenu:FC<BoardMenuProps> = ({isMenuOpen,onEdit,onDelete,NavToColumnPage}) => {

  if(!isMenuOpen) {
    return null
  }
  return (
    <div className={styles.menu}>
    <button onClick={onEdit}>Редактировать</button>
    <button onClick={onDelete}>Удалить</button>
    <button onClick={NavToColumnPage}>детали</button>
  </div>)
};

export default ColumnMenu;