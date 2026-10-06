import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { editBoard } from '../../../entities/board/api/boardApi';

const useEditBoard = () => {
    const queryClient  =  useQueryClient()
return useMutation({
    mutationFn:({id,title,image,color,coverState,order} : {id:string,title:string,image?:string,color?:string,coverState?:string,order:number}) => editBoard(id,title,image,color,coverState,order),
    onSuccess:() => {
        queryClient.invalidateQueries({queryKey:['boards']})
        queryClient.invalidateQueries({queryKey:['board']})
    }
})
};

export default useEditBoard;