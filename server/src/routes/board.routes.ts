import {Router} from 'express'
 import {getBoards,createBoard, getBoardById, deleteBoardById,updateBoard, joinBoard, createInviteToken} from '../controllers/board.controller'
import { requireAuth } from '../middleware/auth.middleware'

 const router  = Router()

 router.get('/',requireAuth,getBoards)
 router.post('/',requireAuth,createBoard)
 router.get('/:id',getBoardById)
router.delete('/:id',deleteBoardById)
router.patch('/:id',updateBoard)
router.post('/join/:token',requireAuth,joinBoard)
router.post('/:id/invite-token',requireAuth,createInviteToken)
 export default router