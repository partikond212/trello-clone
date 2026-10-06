import {Request,Response} from 'express'
import {Board} from '../models/Board.model'
import { AuthedRequest } from '../middleware/auth.middleware';
import crypto from 'crypto'
import mongoose from 'mongoose';
export const getBoards = async(req:AuthedRequest,res:Response ) => {
    try { 
       const boards = await Board.aggregate([
        { $match: {
    $or: [
      { owner: new mongoose.Types.ObjectId(req.userId) },
      { members: new mongoose.Types.ObjectId(req.userId) },
    ]
}},

  // 1. подтянуть колонки каждой доски
  { $lookup: {
      from: 'columns',          // имя коллекции (мн. число, lowercase)
      localField: '_id',
      foreignField: 'boardId',
      as: 'columns',
  }},
  // 2. подтянуть карточки — по id колонок из шага 1
  { $lookup: {
      from: 'cards',
      localField: 'columns._id',
      foreignField: 'columnId',
      as: 'cards',
  }},
  { $lookup: {
    from: 'users',
    localField: 'owner',
    foreignField: '_id',
    as: 'owner',
}},
{ $unwind: '$owner' },
{ $lookup: {
    from: 'users',
    localField: 'members',
    foreignField: '_id',
    as: 'members',
}},

  // 3. посчитать и выкинуть сами массивы
  { $addFields: {
      columnsCount: { $size: '$columns' },
      cardsCount: { $size: '$cards' },
  }},
  { $project: {  'owner.passwordHash': 0, 'members.passwordHash': 0,columns: 0, cards: 0,inviteToken:0 } },
]);
        res.json(boards)
    }
    catch (error){
  res.status(500).json({error:"Не удалось получить данные о досках"});
    }
}

export const createBoard = async (req:AuthedRequest,res:Response ) => {
    try{
        const {title,image,color,coverState} = req.body;
        const board = new Board({
            title,image,color,coverState,owner:req.userId})
        await board.save()
        res.status(201).json(board)
    }
    catch (error) {
        res.status(500).json({error:'Не удалось создать доску2'})
    }
    
    
}

export const joinBoard = async (req: AuthedRequest, res: Response) => {
    try {
        const inviteToken = req.params.token;
        const board = await Board.findOneAndUpdate(
            { inviteToken },
            { $addToSet: { members: req.userId } },
            { new: true },
        );
        if (!board) {
          return res.status(404).json({ message: 'Не нашли подходящей доски' })
        }
        res.status(200).json(board)
    }
    catch (error) {
        res.status(500).json(error)
    }
}


export const createInviteToken = async (req: AuthedRequest, res: Response) => {
    try {
        
      
        const board =  await Board.findById(req.params.id)
       
        if (!board) {
          return res.status(404).json({ message: 'Не нашли подходящей доски' })
        }

        if (!board.owner?.equals(req.userId)) {

return res.status(403).json({message:'Forbidden'})
        }
        const inviteToken = crypto.randomBytes(16).toString('hex')
        const newBoard =await Board.findByIdAndUpdate(req.params.id,{inviteToken},{new:true})
        res.status(200).json(newBoard)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

export const getBoardById = async (req: Request, res: Response) => {
  try {
    const board = await Board.findById(req.params.id)  .populate('owner', '-passwordHash')
  .populate('members', '-passwordHash');;
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
    const {title,image,color,coverState } = req.body
    const board = await Board.findByIdAndUpdate(req.params.id,{title,image,color,coverState},{new:true})
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