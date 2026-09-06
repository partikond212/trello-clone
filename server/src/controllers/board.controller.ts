import {Request,Response} from 'express'
import {Board} from '../models/Board.model'

export const getBoards = async(req:Request,res:Response ) => {
    try { 
        const boards = await Board.find() 
        res.json(boards)
    }
    catch (error){
  res.status(500).json({error:"Не удалось получить данные о досках1"});
    }
}

export const createBoard = async (req:Request,res:Response ) => {
    try{
        const {title,image} = req.body;
        const board = new Board({
            title,image})
        await board.save()
        res.status(201).json(board)
    }
    catch (error) {
        res.status(500).json({error:'Не удалось создать доску2'})
    }
}

export const getBoardById = async (req: Request, res: Response) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ error: 'Доска не найдена' });
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить доску' });
  }
}

export const deleteBoardById = async (req: Request, res: Response) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) {
      return res.status(404).json({ error: 'Доска не найдена' });
    }
    res.json({ message: 'Доска удалена', id: req.params.id });
  } catch (error) {
    console.error('Delete board error:', error);
    res.status(500).json({ error: 'Не удалось удалить доску' });
  }
};

export const updateBoard =async(req:Request,res:Response,) => {
  try {
    const {title,image } = req.body
    const board = await Board.findByIdAndUpdate(req.params.id,{title,image},{new:true})
    if (!board) {
      return res.status(404).json({ error: 'Доска не найдена' });
    }
    res.json(board);

  }
  catch (error) {
    console.error('Edit board error:', error);
    res.status(500).json({ error: 'Не удалось отредактировать доску' });
  }
  
}