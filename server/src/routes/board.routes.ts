import {Router} from 'express'
 import {getBoards,createBoard, getBoardById, deleteBoardById,updateBoard} from '../controllers/board.controller'

 const router  = Router()

 router.get('/',getBoards)
 router.post('/',createBoard)
 router.get('/:id',getBoardById)
router.delete('/:id',deleteBoardById)
router.patch('/:id',updateBoard)
 export default router