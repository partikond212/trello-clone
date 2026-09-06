import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteColumn } from '../../../entities/column/api/columnApi';

const useDeleteColumn = (boardId:string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:(columnId:string) => deleteColumn(columnId),
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['columns',boardId]})
        }
    })
};

export default useDeleteColumn;