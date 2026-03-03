/**
 * Upload Middleware
 * Multer configuration for file uploads.
 * Pattern: Factory / Strategy
 */

import multer from 'multer';
import path from 'path';
import { BadRequestError } from '../errors/index.js';
import Environment from '../config/environment.js';

class UploadMiddleware {
  /**
   * Allowed image MIME types.
   */
  static ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  /**
   * Creates a multer instance with disk storage.
   * @param {string} destination - Upload folder name
   * @returns {multer.Multer}
   */
  static #createStorage(destination) {
    const env = Environment.getInstance();
    return multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, path.join(env.uploadDir, destination));
      },
      filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    });
  }

  /**
   * File filter for images only.
   */
  static #imageFilter(_req, file, cb) {
    if (UploadMiddleware.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestError('Only JPEG, PNG, GIF, and WebP images are allowed'), false);
    }
  }

  /**
   * Returns middleware for single avatar upload.
   */
  static avatar() {
    const env = Environment.getInstance();
    const upload = multer({
      storage: UploadMiddleware.#createStorage('avatars'),
      fileFilter: UploadMiddleware.#imageFilter,
      limits: { fileSize: env.maxFileSize },
    });
    return upload.single('avatar');
  }

  /**
   * Returns middleware for post image attachments.
   * @param {number} maxCount - Max number of images (default: 5)
   */
  static postImages(maxCount = 5) {
    const env = Environment.getInstance();
    const upload = multer({
      storage: UploadMiddleware.#createStorage('posts'),
      fileFilter: UploadMiddleware.#imageFilter,
      limits: { fileSize: env.maxFileSize },
    });
    return upload.array('images', maxCount);
  }
}

export default UploadMiddleware;
