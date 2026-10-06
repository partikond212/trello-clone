import { useMutation, useQueryClient } from "@tanstack/react-query";
import {createBoard} from '../../../entities/board/api/boardApi'
import { useAuth } from "@/app/context/AuthContext";

const useCreateBoard = () => {
    const queryClient = useQueryClient();
    const {token} = useAuth()
    return useMutation({
        mutationFn:({title,image,color,coverState}:{title:string,image?:string,color?:string,coverState?:"color" | 'image',}) => createBoard(title,image,color,coverState,token),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey:['boards']})
        }
    })
};

export default useCreateBoard;