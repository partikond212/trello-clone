import { Response,Request } from "express";
import { Column } from "../models/Column.model";
import { truncate } from "fs/promises";



export const getColumns = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.query;
    const filter = boardId ? { boardId } : {};
    const columns = await Column.find(filter).sort({ order: 1 });
    res.json(columns);
  } catch (error) {
    console.error('Get columns error:', error);
    res.status(500).json({ error: 'Не удалось получить колонки' });
  }
};
export const getColumn = async(req:Request,res:Response) => {
    try {
        const column = await Column.findById(req.params.id)
        res.json(column)
    }
    catch(e){ 
        res.status(500).json({e:'Не удалось получить колонку с сервера'})
    }
}


export const createColumn = async(req:Request,res:Response) => {
    try {
        const {title,boardId,order} = req.body
          if (!title || !boardId) {
      return res.status(400).json({ error: 'Title and boardId are required' });
    }
        const column = new Column({
            title,
            boardId,
            order
        })
        await column.save()
        res.status(201).json(column)
    }
    catch(e){ 
        res.status(500).json({e:'Не удалось создать колонку '})
    }
}

export const deleteColumn = async(req:Request,res:Response) => {
    try {
     const column = await Column.findByIdAndDelete(req.params.id)
     if(!column){
    return res.status(404).json({error:'Не удалось найти колонку'})
     }
     res.json({message:'Колонка удалена'})
     
    }
    catch(e){ 
        res.status(500).json({e:'Не удалось удалить колонку '})
    }
}

export const editColumn = async(req:Request,res:Response) => {
    try {
        const {title} = req.body
     const column = await Column.findByIdAndUpdate(req.params.id,{title},{new:true})
     if(!column){
    return res.status(404).json({error:'Не удалось найти колонку'})
     }
     res.json(column)
     
    }
    catch(e){ 
        res.status(500).json({e:'Не удалось отредактировать колонку '})
    }
}