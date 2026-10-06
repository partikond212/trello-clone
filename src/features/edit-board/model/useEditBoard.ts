import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { editBoard } from '../../../entities/board/api/boardApi';

const useEditBoard = () => {
    const queryClient  =  useQueryClient()
return useMutation({
    mutationFn:({id,title,image,color,coverState} : {id:string,title:string,image?:string,color?:string,coverState?:string}) => editBoard(id,title,image,color,coverState),
    onSuccess:() => {
        queryClient.invalidateQueries({queryKey:['boards']})
        queryClient.invalidateQueries({queryKey:['board']})
    }
})
};

export default useEditBoard;