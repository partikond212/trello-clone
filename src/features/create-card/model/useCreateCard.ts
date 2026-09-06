import { createCard } from '@/entities/card/api/cardApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CreateCardVars = { title: string; description?: string };
const useCreateCard = (columnId:string) => {
    const queryClient = useQueryClient()
 return useMutation({
   mutationFn: (vars: CreateCardVars) => createCard({ ...vars, columnId }),
    onSuccess:() => {
        queryClient.invalidateQueries({queryKey:['cards',columnId]})
    }
 })
};

export default useCreateCard;