import { Request,Response } from "express";
import { Comment } from "../models/Comment.model";


export const getComments = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.query;
    const filter = cardId ? { cardId: cardId as string } : {};
    const comments = await Comment.find(filter).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Не удалось получить комментарии' });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const {text,cardId,createdAt} = req.body
    if(!text || !cardId) {
        return res.status(400).json({error:'Не все поля заполнены!'})

    }
    const comment = new Comment({
        text,
        cardId,
        createdAt
    })
    await comment.save()
    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({error:'Не удалось создать комментарий' })

  }
};
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const card =await Comment.findByIdAndDelete(req.params.id)
    if(!card) {
      return  res.status(400).json({error:'Комментарий не найден!'})

    }
    res.json({message:'Коммент удалён!'})
  } catch (error) {
    res.status(500).json({error:'Не удалось удалить комментарий' })

  }
};

export const editComment =  async (req: Request, res: Response) => {
  try {
    const{text} = req.body
    const  comment = await Comment.findByIdAndUpdate(req.params.id,{text},{new:true})
    if(!comment) return  res.status(404).json({message:'Не удалось найти нужный коммент'})
    return res.json(comment)
  }
  catch (e){
    res.status(500).json({e:'Не удалось отредактировать коммент'})
  }
 }