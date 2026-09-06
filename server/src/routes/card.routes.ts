import {Router} from 'express';
import { createCard, deleteCard, editCard, getCard, getCards } from '../controllers/card.controller';


const router = Router()

router.get('/',getCards)
router.post('/',createCard)
router.get('/:id',getCard)
router.delete('/:id',deleteCard)
router.patch('/:id',editCard)
export default router