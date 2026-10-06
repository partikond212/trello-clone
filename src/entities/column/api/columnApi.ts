import type { Column } from "../model/column"
import { API_BASE_URL } from "@/shared/config/apiBaseUrl"
import { throwApiError } from "@/shared/utils/apiError"

type ColumnResponse = {
 title?: string;
 boardId: string;
 order: number;
 _id: string;
}

const COLUMNS_API = `${API_BASE_URL}/api/columns`


export const getColumns = async(boardId:string):Promise<Column[]> => {
    const res = await fetch(`${COLUMNS_API}?boardId=${boardId}`)
    if(!res.ok) await throwApiError(res, 'Не удалось получить колонки данной доски');

    const data:ColumnResponse[] =  await  res.json()
return  data.map((column) => ({
    title:column.title,
    boardId:column.boardId,
    order:column.order || 0,
    id:column._id,}


    
))

}

export const getColumn= async(columnId:string):Promise<Column> => {
    const res = await fetch(`${COLUMNS_API}/${columnId}`)
    if(!res.ok) await throwApiError(res, 'Не удалось получить колонку');

    const data:ColumnResponse =  await  res.json()
    return  {
        id:data._id,
        title:data.title,
        order:data.order,
        boardId:data.boardId
    }


    


}

export const createColumn = async(title:string,boardId:string,order:number=0):Promise<Column> => {
    const res = await fetch(`${COLUMNS_API}`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            title,
            boardId,
            order
        })

    })
    if(!res.ok) await throwApiError(res, 'Не удалось создать колонку');

    const data:ColumnResponse =  await  res.json()
return  {
    title:data.title,
    boardId:data.boardId,
    order:data.order || 0,
    id:data._id,
}

}


export const deleteColumn  = async(columnId:string):Promise<void> => {
    const res = await fetch(`${COLUMNS_API}/${columnId}`,{
        method:"DELETE"
    })
      if(!res.ok) await throwApiError(res, 'Не удалось удалить колонку');
}



export const  editColumn = async(columnId:string,order?:number,title?:string) => {
    const res = await fetch(`${COLUMNS_API}/${columnId}`,{
        method:"PATCH",
        headers: {"Content-Type":'application/json'},
        body:JSON.stringify({
            title,
            order
        })
    })
    if(!res.ok) await throwApiError(res, 'Не удалось отредактировать колонку');
    const data:ColumnResponse = await res.json()
    return {
        title:data.title,
        columnId:data._id,
        order:data.order

    }
}