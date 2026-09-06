import {useEffect, useRef, useState,  type FC, } from 'react';
import type { Board as BoardModel } from '../../../pages/board-page/model/useBoard';
import {  useNavigate } from 'react-router-dom';
import styles from './Board.module.css'
import BoardMenu from './components/board-menu/BoardMenu';
import { useColumns } from '../../column/model/column';
import useCards from '../../card/model/useCards';


interface IBoardProps  {
    board:BoardModel;
    onEdit:() => void;
    onDelete:() => void;
}
const Board:FC<IBoardProps> = ({board,onEdit,onDelete}) => {
  const [isMenuOpen,setIsMenuOpen] = useState(false)
  const {data:columns} = useColumns(board.id!)
  const { data: cards} = useCards(board.id!)
  const navigate = useNavigate()
  const boardRef = useRef<HTMLDivElement>(null)
    const handleDelete = (e:React.MouseEvent) => {
      e.stopPropagation()
      setIsMenuOpen(false)
      onDelete()
    }
      const toggleMenu = (e:React.MouseEvent<HTMLButtonElement>) => {
 e.stopPropagation()
  setIsMenuOpen((prev) => !prev)
  }
    const handleNavToBoardPage = () => {
    navigate(`/boards/${board.id}`);
  };
  const handleEdit = (e:React.MouseEvent) => {
    e.preventDefault()
    onEdit()
    setIsMenuOpen(false)
  }
  useEffect(() => {
    const handleClickOutside = (e:MouseEvent) => {
      if(boardRef.current && !boardRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click',handleClickOutside)
   return () => document.removeEventListener('click',handleClickOutside)
  },[setIsMenuOpen])
  const columnsCount = columns?.length ?? 0
  const cardsCount = cards?.length ?? 0
  return (
    <div ref={boardRef} className={styles.board}>
      {board.image && <div className={styles.BoardImage}>
        <img src={board.image} alt={board.title} loading='lazy' />
      </div>}
     <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3>{board.title}</h3>
          <button aria-label="Меню доски" className={styles.menuButton} onClick={toggleMenu}>⋮</button>
        </div>
    <p> колонок :{columnsCount }   •  карточек : {cardsCount }</p>
      </div>
      <div className={styles.cardActions}>
      <BoardMenu NavToBoardPage={handleNavToBoardPage} onDelete={handleDelete} onEdit={handleEdit} isMenuOpen={isMenuOpen}/>
     
    </div>
    
    </div>
  );
};

export default Board;