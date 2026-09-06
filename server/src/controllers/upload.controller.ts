import { Request, Response } from 'express';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

const upload = multer({ storage: multer.memoryStorage() });

export const uploadImage = [
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Файл не загружен' });
      }

      const db = mongoose.connection.db;
      if (!db) {
        throw new Error('Database connection not established');
      }

      const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
      const filename = `${Date.now()}-${req.file.originalname}`;

      const uploadStream = bucket.openUploadStream(filename, {
        contentType: req.file.mimetype,
      });

      uploadStream.write(req.file.buffer);
      uploadStream.end();

      await new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
      });

      const fileUrl = `http://localhost:5000/api/uploads/${uploadStream.id}`;
      res.json({ url: fileUrl });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Ошибка загрузки' });
    }
  },
];

export const getImage = async (req: Request, res: Response) => {
  try {
    const db = mongoose.connection.db;
    if (!db) {
      return res.status(500).json({ error: 'Database connection error' });
    }

    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.status(404).json({ error: 'File not found' });
    });

    downloadStream.on('end', () => {
      res.end();
    });
  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({ error: 'Failed to get image' });
  }
};