import { useQuery } from '@tanstack/react-query';
import {getCard} from '../api/cardApi.ts'

export const useCard = (cardId:string) => {
 return useQuery({
   queryKey:['card',cardId],
    queryFn:() => getCard(cardId),
    enabled:!!cardId,

 })
};

