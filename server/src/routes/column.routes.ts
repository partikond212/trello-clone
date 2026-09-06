import { Router } from "express";
import { createColumn, deleteColumn, editColumn, getColumn, getColumns } from "../controllers/column.controller";

const router = Router()

router.get('/',getColumns)
router.post('/',createColumn)
router.get('/:id',getColumn)
router.delete('/:id',deleteColumn)
router.patch('/:id',editColumn)

export  default router