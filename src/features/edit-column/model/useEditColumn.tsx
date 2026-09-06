import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editColumn } from "../../../entities/column/api/columnApi";

const useEditColumn = () => {
    const queryClient = useQueryClient()
 return useMutation({
    mutationFn:({id,title}:{id:string,title:string}) => editColumn(id,title),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['columns']})
        queryClient.invalidateQueries({queryKey:['column']})
    }
 })
};

export default useEditColumn;