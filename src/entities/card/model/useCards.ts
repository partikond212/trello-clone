import { useQuery } from '@tanstack/react-query';
import { fetchCards } from '../api/cardApi';

const useCards = (columnId:string) => {
  return useQuery({
    queryKey:['cards',columnId],
    queryFn:() => fetchCards(columnId),
    enabled:!!columnId
  })
};

export default useCards;