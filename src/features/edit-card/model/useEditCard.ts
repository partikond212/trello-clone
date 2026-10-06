import { editCard } from '@/entities/card/api/cardApi';
import type { Card } from '@/entities/card/model/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type editCardvars ={title:string,description?:string,tasks?:Card['tasks'],tags?:Card['tags'],priority?:Card['priority'],dueDate?:Card['dueDate']}
const useEditCard = (card:Card) => {
const queryClient = useQueryClient()
return useMutation({
    mutationFn:({title,description,tasks,tags,priority,dueDate}:editCardvars) => editCard({card,title,description,tasks,tags,priority,dueDate}),
    onSuccess:()=> {
        queryClient.invalidateQueries({queryKey:['cards']})
        queryClient.invalidateQueries({queryKey:['card']})
    }
})
};

export default useEditCard;