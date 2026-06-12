import { Router } from 'express';
import multer from 'multer';
import { authenticateJWT } from '../middleware/auth.js';
import { uploadSingleFile } from '../controllers/UploadController.js';

const router = Router();

// Memory storage, limits to 10MB
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } 
});

router.post('/', authenticateJWT, upload.single('file'), uploadSingleFile);

export default router;
