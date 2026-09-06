import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import boardRoutes from './routes/board.routes';
import uploadRoutes from './routes/upload.routes';
import path from 'path';
import cardRoutes from './routes/card.routes'
import columnRoutes from './routes/column.routes'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();

    app.use('/api/boards', boardRoutes);
    app.use('/api/columns', columnRoutes);
    app.use('/api/cards',cardRoutes)
    app.use('/api', uploadRoutes); // ← добавь эту строку
    app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порте - ${PORT}`);
    });
  } catch (error) {
    console.error('Не удалось запустить сервер:', error);
    process.exit(1);
  }
};

startServer();