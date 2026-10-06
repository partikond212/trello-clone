import { editComment } from '@/entities/comment/api/commentApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type EditCommentProps = {
    text:string,
    commentId:string
}
const useEditComment = () => {
    const queryClient = useQueryClient()
return useMutation({
    mutationFn:({text,commentId}:EditCommentProps) => editComment(text,commentId),
    onSuccess:() => {
        queryClient.invalidateQueries({queryKey:['comments']})
    }
})
};

export default useEditComment;