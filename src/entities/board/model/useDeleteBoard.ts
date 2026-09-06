import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteBoard } from "../api/boardApi";




const useDeleteBoard = () => {
    const queryClient =  useQueryClient();
return useMutation({
    mutationFn:(id:string) => deleteBoard(id),
onSuccess:() => {
    queryClient.invalidateQueries({queryKey:['boards']})
}
})
};

export default useDeleteBoard;