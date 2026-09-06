import { useQuery } from "@tanstack/react-query";
import { getColumns } from "../api/columnApi";

export type Column = {
    title:string,
    boardId:string,
    order:number,
    id:string,
}

export const useColumns = (boardId:string) => {
    return useQuery({
        queryFn:() => getColumns(boardId),
        queryKey:['columns',boardId],
        enabled:!!boardId
    })
}