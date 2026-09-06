
import type { FC } from 'react';
interface ICreateBoardButtonProps {
  onOpen:() => void;
}
const CreateBoardButton:FC<ICreateBoardButtonProps> = ({onOpen}) => {
  return (
    <button onClick={() => onOpen()}>
    Создать доску
    </button>
  );
};

export default CreateBoardButton;