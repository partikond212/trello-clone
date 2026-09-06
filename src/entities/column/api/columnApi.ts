import type { Column } from "../model/column"

type ColumnResponse = {
 title: string;
 boardId: string;
 order: number;
 _id: string;
columnId?:string,
}

const COLUMNS_API = 'http://localhost:5000/api/columns'


export const getColumns = async(boardId:string):Promise<Column[]> => {
    const res = await fetch(`${COLUMNS_API}?boardId=${boardId}`)
    if(!res.ok) throw new Error('Не удалось получить колонки данной доски');

    const data:ColumnResponse[] =  await  res.json()
return  data.map((column) => ({
    title:column.title,
    boardId:column.boardId,
    order:column.order || 0,
    id:column._id,}


    
))

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
    if(!res.ok) throw new Error('Не удалось получить колонки данной доски');

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
      if(!res.ok) throw new Error('Не удалось удалить колонку данной доски');
}



export const  editColumn = async(columnId:string,title:string) => {
    const res = await fetch(`${COLUMNS_API}/${columnId}`,{
        method:"PATCH",
        headers: {"Content-Type":'application/json'},
        body:JSON.stringify({
            title
        })
    })
    if(!res.ok) throw new Error('Не удалось отредактировать колонку данной доски');
    const data:ColumnResponse = await res.json()
    return {
        title:data.title,
        columnId:data.columnId

    }
}