import { createComment } from '@/entities/comment/api/commentApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateComment= (cardId:string) => {
    const queryClient = useQueryClient()
return useMutation({
    mutationFn:({text}:{text:string}) => createComment(text,cardId),
    onSuccess:() => {
        queryClient.invalidateQueries({queryKey:['comments']})
    }
})
};

export default useCreateComment;