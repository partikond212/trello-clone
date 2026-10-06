import { useQuery } from '@tanstack/react-query';
import { getComments } from '../api/commentApi';

const useComments = (cardId:string) => {
return useQuery({
    queryKey:['comments',cardId],
    queryFn:() => getComments(cardId),
    enabled:!!cardId
})
};

export default useComments;