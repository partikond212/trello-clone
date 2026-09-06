import { useMutation, useQueryClient } from "@tanstack/react-query";
import {createBoard} from '../../../entities/board/api/boardApi'

const useCreateBoard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({title,image}:{title:string,image?:string}) => createBoard(title,image),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey:['boards']})
        }
    })
};

export default useCreateBoard;