import { Router } from 'express';
import multer from 'multer';
import { authenticateJWT } from '../middleware/auth.js';
import { uploadSingleFile } from '../controllers/UploadController.js';

const router = Router();

const ALLOWED_MIME_TYPES = new Set([
  // Images — profile photos and scanned documents
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  // Documents — resumes and SOPs
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      callback(new Error('Only JPG, PNG, WEBP, HEIC images or PDF, DOC, DOCX files are allowed'));
      return;
    }
    callback(null, true);
  },
});

router.post(
  '/',
  authenticateJWT,
  (req, res, next) => {
    upload.single('file')(req, res, (error) => {
      if (error) return res.status(400).json({ success: false, message: error.message });
      next();
    });
  },
  uploadSingleFile
);

export default router;
