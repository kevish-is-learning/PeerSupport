import { Router } from 'express';
import multer from 'multer';
import { authenticateJWT } from '../middleware/auth.js';
import { uploadSingleFile } from '../controllers/UploadController.js';

const router = Router();

// Memory storage, limits to 10MB
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const allowed = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);
    callback(allowed.has(file.mimetype) ? null : new Error('Only JPG, PNG, WEBP, and HEIC images are allowed'), allowed.has(file.mimetype));
  },
});

router.post('/', authenticateJWT, (req, res, next) => {
  upload.single('file')(req, res, (error) => {
    if (error) return res.status(400).json({ success: false, message: error.message });
    next();
  });
}, uploadSingleFile);

export default router;
