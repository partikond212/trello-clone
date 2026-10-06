import { Router } from "express";
import { createComment, deleteComment, editComment, getComments } from "../controllers/comment.controller";

const router = Router()

router.get('/',getComments)
router.post('/',createComment)
router.delete('/:id',deleteComment)
router.patch('/:id',editComment)

export default router