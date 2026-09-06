import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { editBoard } from '../../../entities/board/api/boardApi';

const useEditBoard = () => {
    const queryClient  =  useQueryClient()
return useMutation({
    mutationFn:({id,image,title} : {id:string,title:string,image?:string}) => editBoard(id,title,image),
    onSuccess:() => {
        queryClient.invalidateQueries({queryKey:['boards']})
        queryClient.invalidateQueries({queryKey:['board']})
    }
})
};

export default useEditBoard;