import { deleteComment } from '@/entities/comment/api/commentApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const useDeleteComment = () => {
    const queryClient = useQueryClient()
return useMutation({
    mutationFn:(commentId:string) => deleteComment(commentId),
    onSuccess:() => {
        queryClient.invalidateQueries({queryKey:['comments']})
    }
})
};

export default useDeleteComment;