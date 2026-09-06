import {type Card} from "../model/card"
const CARDS_API = 'http://localhost:5000/api/cards'

type CardResponse ={ 
    _id:string,
    title:string,
    description?:string,
    columnId:string,
    order:number,
    notesCount?:number,
    completedTaskCount?:number,
}

export const fetchCards= async (columnId:string):Promise<Card[]> => {
        const res = await fetch(`${CARDS_API}?columnId=${columnId}`)

        if(!res.ok) throw new Error('Не удалось получить список карточек данной колонки')

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

    if(!res.ok)  throw new Error('Не удалось создать карточку')
    const data:CardResponse  = await res.json()

    return {
        id:data._id,
        title:data.title,
        description:data.description,
        columnId:data.columnId,
        order:data.order,
        notesCount:data.notesCount,
        completedTaskCount:data.completedTaskCount,

    }
}
export const getCard = async (id:string):Promise<Card> => {
    const res = await fetch(`${CARDS_API}/${id}`)
    if(!res.ok)  throw new Error('Не удалось найти карточку')
    const data:CardResponse  = await res.json()

    return {
        id:data._id,
        title:data.title,
        description:data.description || '',
        columnId:data.columnId,
        order:data.order || 0,
        notesCount:data.notesCount || 0,
        completedTaskCount:data.completedTaskCount || 0,
    }

}


export const deleteCard = async (cardId:string):Promise<void> => {
    const res = await fetch(`${CARDS_API}/${cardId}`,{method:"DELETE"})
    if(!res.ok )throw new Error('Не удалось удалить карточку данной колонки')


}



export const editCard = async (card:Card,title:string,description?:string):Promise<Card> => {
    const res = await fetch(`${CARDS_API}/${card.id}`,{
        method:"PATCH",
        body:JSON.stringify({
            title,
            description
            
        }),
        headers:{'Content-Type':'application/json'}
    })
    if(!res.ok)  throw new Error('Не удалось найти карточку')
    const data:CardResponse  = await res.json()

    return {
        id:data._id,
        title:data.title,
        description:data.description || '',
        columnId:data.columnId,
        order:data.order || 0,
        notesCount:data.notesCount || 0,
        completedTaskCount:data.completedTaskCount || 0,
    }

}