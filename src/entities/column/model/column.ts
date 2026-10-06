import { useQuery } from "@tanstack/react-query";
import { getColumn, getColumns } from "../api/columnApi";

export type Column = {
    title?:string,
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
export const useColumn = (columnId:string) => {
    return useQuery({
        queryFn:() => getColumn(columnId),
        queryKey:['column',columnId],
        enabled:!!columnId
    })
}