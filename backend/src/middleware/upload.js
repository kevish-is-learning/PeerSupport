import multer from 'multer';
import cloudinary, { getFolder } from '../config/cloudinary.js';
import { prisma } from '../config/database.js';

// ─── Multer: memory storage (files stay as buffers, never touch disk) ────────

const memoryStorage = multer.memoryStorage();

const createUploader = (allowedMimeTypes, errorMessage) =>
  multer({
    storage: memoryStorage,
    fileFilter: (_req, file, callback) => {
      if (!allowedMimeTypes.has(file.mimetype)) {
        callback(new Error(errorMessage));
        return;
      }
      callback(null, true);
    },
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  });

const mentorUpload = createUploader(
  new Set(['image/jpeg', 'image/png', 'image/webp']),
  'Only JPG, PNG, and WEBP image uploads are allowed'
);

const menteeUpload = createUploader(
  new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]),
  'Only JPG, PNG, WEBP images (for profile photo) or PDF, DOC, DOCX files (for resume) are allowed'
);

const mentorUploadFieldsHandler = mentorUpload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'collegeDocument', maxCount: 1 },
]);

const menteeUploadFieldsHandler = menteeUpload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]);

// ─── Cloudinary streaming helper ─────────────────────────────────────────────

/**
 * Upload a multer file buffer to Cloudinary.
 *
 * @param {Buffer} buffer        – file contents
 * @param {object} options       – Cloudinary upload options (folder, public_id, resource_type …)
 * @returns {Promise<string>}    – the secure_url of the uploaded asset
 */
const uploadToCloudinary = (buffer, options) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });
    stream.end(buffer);
  });

// ─── Username resolver ───────────────────────────────────────────────────────

/**
 * Try to resolve the user's profile username for folder naming.
 * Falls back to a deterministic `<role>_<userId-prefix>` pattern if no profile exists yet.
 */
const resolveUsername = async (userId, role) => {
  if (role === 'MENTOR') {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { username: true },
    });
    return profile?.username || `mentor_${userId.substring(0, 8)}`;
  }

  const profile = await prisma.menteeProfile.findUnique({
    where: { userId },
    select: { username: true },
  });
  return profile?.username || `mentee_${userId.substring(0, 8)}`;
};

// ─── Middleware: Mentor profile uploads ──────────────────────────────────────

const mentorProfileUpload = (req, res, next) => {
  mentorUploadFieldsHandler(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message || 'File upload failed',
      });
    }

    const profilePhoto = req.files?.profilePhoto?.[0];
    const collegeDocument = req.files?.collegeDocument?.[0];

    // Nothing to upload → carry on
    if (!profilePhoto && !collegeDocument) {
      req.uploadedFiles = {};
      return next();
    }

    try {
      const username = await resolveUsername(req.user.id, 'MENTOR');

      const uploads = {};

      if (profilePhoto) {
        const uniqueId = `${username}_${Date.now()}`;
        uploads.profilePhotoUrl = await uploadToCloudinary(profilePhoto.buffer, {
          folder: getFolder(username, 'avatar'),
          public_id: uniqueId,
          resource_type: 'image',
          overwrite: true,
        });
      }

      if (collegeDocument) {
        const uniqueId = `${username}_doc_${Date.now()}`;
        uploads.collegeDocumentUrl = await uploadToCloudinary(collegeDocument.buffer, {
          folder: getFolder(username, 'pdfs'),
          public_id: uniqueId,
          resource_type: 'image',
          overwrite: true,
        });
      }

      req.uploadedFiles = uploads;
      next();
    } catch (uploadError) {
      console.error('[Cloudinary] Upload failed:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Cloud upload failed. Please try again.',
      });
    }
  });
};

// ─── Middleware: Mentee profile uploads ──────────────────────────────────────

const menteeProfileUpload = (req, res, next) => {
  menteeUploadFieldsHandler(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message || 'File upload failed',
      });
    }

    const profilePhoto = req.files?.profilePhoto?.[0];
    const resume = req.files?.resume?.[0];

    // Nothing to upload → carry on
    if (!profilePhoto && !resume) {
      req.uploadedFiles = {};
      return next();
    }

    try {
      const username = await resolveUsername(req.user.id, 'MENTEE');

      const uploads = {};

      if (profilePhoto) {
        const uniqueId = `${username}_${Date.now()}`;
        uploads.profilePhotoUrl = await uploadToCloudinary(profilePhoto.buffer, {
          folder: getFolder(username, 'avatar'),
          public_id: uniqueId,
          resource_type: 'image',
          overwrite: true,
        });
      }

      if (resume) {
        const uniqueId = `${username}_resume_${Date.now()}`;
        uploads.resumeUrl = await uploadToCloudinary(resume.buffer, {
          folder: getFolder(username, 'pdfs'),
          public_id: uniqueId,
          resource_type: 'raw',
          overwrite: true,
        });
      }

      req.uploadedFiles = uploads;
      next();
    } catch (uploadError) {
      console.error('[Cloudinary] Upload failed:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Cloud upload failed. Please try again.',
      });
    }
  });
};

export { mentorProfileUpload, menteeProfileUpload };
