import  {deleteCard}  from '@/entities/card/api/cardApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteCard = (columnId:string) => {
    const queryClient = useQueryClient()
return useMutation({
    mutationFn:({cardId}:{cardId:string}) => deleteCard(cardId),
    onSuccess:() => {
        queryClient.invalidateQueries({queryKey:['cards',columnId]})
    }
})
};

export default useDeleteCard;