import {type Card} from "../model/card"
import { API_BASE_URL } from "@/shared/config/apiBaseUrl"
import { throwApiError } from "@/shared/utils/apiError"
const CARDS_API = `${API_BASE_URL}/api/cards`

type CardResponse ={ 
    _id:string,
    title:string,
    description?:string,
    columnId:string,
    order:number,
    notesCount?:number,
    completedTaskCount?:number,
    priority?:Card['priority'],
    tags?:string[],
    tasks?:Card['tasks'],
    dueDate?:Card['dueDate'],

    
}

export const fetchCards= async (columnId:string):Promise<Card[]> => {
        const res = await fetch(`${CARDS_API}?columnId=${columnId}`)

        if(!res.ok) await throwApiError(res, 'Не удалось получить список карточек данной колонки')

            const data:CardResponse[]  = await res.json()
        
    return data.map((card) => (
        {   
            id:card._id,
            title:card.title,
            description:card.description,
            columnId:card.columnId,
            order:card.order,
            notesCount:card.notesCount,
            completedTaskCount:card.completedTaskCount,
            priority:card.priority,
            tags:card.tags,
            tasks:card.tasks,
            dueDate:card.dueDate,
        }
    ))
}


type CreateCardDTO = { title: string; columnId: string; description?: string; order?: number };
export const createCard = async (dto: CreateCardDTO): Promise<Card> => {
  const res = await fetch(`${CARDS_API}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });

    if(!res.ok)  await throwApiError(res, 'Не удалось создать карточку')
    const data:CardResponse  = await res.json()

    return {
        id:data._id,
        title:data.title,
        description:data.description,
        columnId:data.columnId,
        order:data.order,
        completedTaskCount:data.completedTaskCount,


    }
}
export const getCard = async (id:string):Promise<Card> => {
    const res = await fetch(`${CARDS_API}/${id}`)
    if(!res.ok)  await throwApiError(res, 'Не удалось найти карточку')
    const data:CardResponse  = await res.json()

    return {
        id:data._id,
        title:data.title,
        description:data.description || '',
        columnId:data.columnId,
        order:data.order || 0,
        completedTaskCount:data.completedTaskCount || 0,
        priority:data.priority,
        tags:data.tags,
        tasks:data.tasks,
        dueDate:data.dueDate
    }

}


export const deleteCard = async (cardId:string):Promise<void> => {
    const res = await fetch(`${CARDS_API}/${cardId}`,{method:"DELETE"})
    if(!res.ok ) await throwApiError(res, 'Не удалось удалить карточку')


}


type editCardVars = {card:Card,title?:string,tags?:Card['tags'],priority?:Card['priority'],dueDate?:Card['dueDate'],tasks?:Card['tasks'],description?:string,columnId?: string, order?: number}

export const editCard = async ({card,title,tags,priority,dueDate,tasks,description,order,columnId}:editCardVars ):Promise<Card> => {
    const res = await fetch(`${CARDS_API}/${card.id}`,{
        method:"PATCH",
        body:JSON.stringify({
            title,
            description,
            tags,
            priority,
            dueDate,
            tasks,
            order,
            columnId
        }),
        headers:{'Content-Type':'application/json'}
    })
    if(!res.ok)  await throwApiError(res, 'Не удалось сохранить изменения карточки')
    const data:CardResponse  = await res.json()

    return {
        id:data._id,
        title:data.title,
        description:data.description || '',
        columnId:data.columnId,
        order:data.order || 0,
        completedTaskCount:data.completedTaskCount || 0,
        tags:data.tags,
        tasks:data.tasks,
        priority:data.priority,
        dueDate:data.dueDate,
    }

}
