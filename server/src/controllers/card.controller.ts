import {Request,Response} from 'express'
import { Card } from '../models/Card.model'

export const getCards = async (req: Request, res: Response) => {
    try {
        const { columnId } = req.query
        const filter = columnId ? { columnId: columnId as string } : {}
       const cards = await Card.find(filter).sort({ order: 1 })

        res.json(cards)
    }
    catch (e) {
        res.status(500).json({ e: 'Не удалось получить карточки с сервера' })
        console.error(e)
    }
}
export const getCard = async(req:Request,res:Response) => {
    try {
        const card = await Card.findById(req.params.id)
        res.json(card)
    }
    catch(e) {
        res.status(500).json({e:'Не удалось получить  данную карточку с сервера'})
    }
}


export const createCard = async(req:Request,res:Response) => {
    try {
        const {title,description,columnId,order } = req.body
        const card = new Card({
            title,
            description,
            columnId,
            order,
            
        })
        await card.save()
        res.status(201).json(card)
    }
    catch(e) {
        res.status(500).json({e:'Не удалось получить  данную карточку с сервера'})
        console.error(e)
    }
}

export const deleteCard = async(req:Request,res:Response) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.id)
        if(!card) {
          return  res.status(404).json({error:'Карточка не найдена'})
        }
        res.json({message:'Карточка удалена',id:req.params.id})
    }
    catch(e) {
        res.status(500).json({e:'Не удалось удалить  данную карточку '})
        console.error(e)
    }
}



export const editCard = async(req:Request,res:Response) => {
    try {
        const {title,description,dueDate,tags,priority,tasks,order,columnId} = req.body
        const card = await Card.findByIdAndUpdate(req.params.id,{title,description,dueDate,tags,priority,tasks,order,columnId} ,{new:true})
        if(!card) {
            return res.status(404).json({error:'Карточка не найдена'})
        }
        res.json(card)
    }
    catch(e) {
        res.status(500).json({e:'Не удалось обновить  данную карточку '})
        console.error(e)
    }
}

