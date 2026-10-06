// entities/board/model/useBoard.ts
import { useQuery } from '@tanstack/react-query';
import { fetchBoardById } from '../../../entities/board/api/boardApi';
import type { User } from '@/entities/user/model/User';

export type BoardT = {
  id: string;
  title: string;
  color?:string,
  image?:string
  columnsCount?:number,
  cardsCount?:number,
  coverState?:'color' | 'image',
  members?:User[],
  owner:User,
  inviteToken?:string,
};

export const useBoard = (id: string) => {
  return useQuery({
    queryKey: ['board', id],
    queryFn: () => fetchBoardById(id),
    enabled: !!id,
  });
};