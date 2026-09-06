// entities/board/model/useBoard.ts
import { useQuery } from '@tanstack/react-query';
import { fetchBoardById } from '../../../entities/board/api/boardApi';

export type Board = {
  id: string;
  title: string;

  image?:string
  columnsCount?:number,
  cardsCount?:number,
};

export const useBoard = (id: string) => {
  return useQuery({
    queryKey: ['board', id],
    queryFn: () => fetchBoardById(id),
    enabled: !!id,
  });
};