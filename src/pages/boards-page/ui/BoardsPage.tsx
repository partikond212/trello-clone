import {useState, type FC} from 'react';
import Header from '../../../widgets/header/ui/Header';
import CreateBoardButton from '../../../features/create-board/ui/CreateBoardButton';
import CreateBoardModal from '../../../features/create-board/ui/CreateBoardModal';
import useModal from '../../../shared/hooks/useModal';
import useBoards, { type BoardType} from '../model/useBoards';
import Board from '../../../entities/board/ui/Board';
import styles from './BoardsPage.module.css';
import EditBoardModal from '../../../features/edit-board/ui/EditBoardModal';
import Notification from '../../../shared/ui/notification/Notification';
import useDeleteBoard from '../../../entities/board/model/useDeleteBoard';
import ConfirmModal from '../../../shared/ui/modals/confirm-modal/ConfirmModal';
import {useNotification} from '../../../app/context/NotificationContext';
const BoardsPage:FC = () => {
   const [isConfirmOpen,setIsConfirmOpen] = useState(false)
 
const {mutate:deleteBoard} = useDeleteBoard()
const [deletingBoard,setDeletingBoard] = useState<BoardType | null>(null)

  const {isModalOpen:isCreateOpen,closeModal:closeCreate,openModal:openCreate} =useModal()
  const {isModalOpen:isEditOpen,closeModal:closeEdit,openModal:openEdit} =useModal()
  const {data:boards,isLoading,error} = useBoards()
  const [editingBoard,setEditingBoard] = useState<BoardType| null>(null)
  const {showNotification} = useNotification()

 


  const handleConfirmDelete = () => {
    if(!deletingBoard) return;
    setDeletingBoard(deletingBoard)
    setIsConfirmOpen(false)
    deleteBoard(deletingBoard.id,{
      onSuccess:() => {
       showNotification('Доска удалена', 'success')
      },
    onError: (e) => {
      showNotification(`Ошибка: ${e.message}`,'error')
    }
    })
  }
  const handleCancelDelete = () => {
    setIsConfirmOpen(false)
    setDeletingBoard(null)
    showNotification('Вы отменили удаление доски','info')
  }



  const handleEdit = (board:BoardType) => {
    setEditingBoard(board)
    openEdit()
  }

  const handleDeleteClick = (board:BoardType) => {
    setDeletingBoard(board)
    setIsConfirmOpen(true)
  }
  if(isLoading) {
    return <span>Загрузка...</span>
  }
  if (error)return  <Notification type={ 'error'} message={error.message 
  }/>;
  return (
    <div className={styles.BoardsPage}>
     <Header title={"Trello clone"} actions={<CreateBoardButton onOpen={openCreate} />}/>
     <h1>Мои доски</h1>
  <div className={styles.boardsGrid}>
      {boards?.length === 0 && <p>Досок нет.Создайте первую!</p>}
      {boards?.map((board) => (
       <Board key={board.id} board={board} onEdit={()=> handleEdit(board)} onDelete={(() => handleDeleteClick(board))}/>
      ))}
  </div>
      <CreateBoardModal onSuccess={()=> showNotification('Доска успешно создана!','success')} onError={(error)=> showNotification(`Ошибка:${error.message}`,'error')} isModalOpen={isCreateOpen} onClose={closeCreate}/>
      {editingBoard && 
      <EditBoardModal onSuccess={()=> showNotification('Доска изменена','success')} onError={() => showNotification('Не удалось отредактировать доску ','error')} isModalOpen={isEditOpen} onClose={closeEdit} board={editingBoard}/>}
  {deletingBoard && <ConfirmModal title='Удалить доску?'  message={`Вы уверены, что хотите удалить доску c названием "${deletingBoard.title}"? Это действие нельзя отменить.`} isOpen={isConfirmOpen} onCancel={() => handleCancelDelete()} onConfirm={() => handleConfirmDelete()}/>}
    </div>
  );
};

export default BoardsPage;