import { editCard } from '@/entities/card/api/cardApi';
import type { Card } from '@/entities/card/model/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const useEditCard = (card:Card) => {
const queryClient = useQueryClient()
return useMutation({
    mutationFn:({title,description}:{title:string,description?:string}) => editCard(card,title,description),
    onSuccess:()=> {
        queryClient.invalidateQueries({queryKey:['cards']})
        queryClient.invalidateQueries({queryKey:['card']})
    }
})
};

export default useEditCard;