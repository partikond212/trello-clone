import { Router } from 'express';
import { uploadImage, getImage } from '../controllers/upload.controller';

const router = Router();
router.post('/upload', uploadImage);
router.get('/uploads/:id', getImage);

export default router;