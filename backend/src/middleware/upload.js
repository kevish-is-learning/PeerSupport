import multer from 'multer';
import { randomUUID } from 'node:crypto';
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
  new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']),
  'Only JPG, PNG, WEBP, and HEIC image uploads are allowed'
);

const menteeUpload = createUploader(
  new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]),
  'Only JPG, PNG, WEBP, HEIC images (for profile photo) or PDF, DOC, DOCX files (for resume) are allowed'
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

// ─── Name helpers ────────────────────────────────────────────────────────────

/**
 * Sanitize a name for use in Cloudinary public_id / folder paths.
 * Lowercases, replaces spaces/special chars with underscores, collapses runs.
 */
const sanitizeName = (name) =>
  (name || 'unknown')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')   // replace non-alphanumeric with _
    .replace(/_+/g, '_')          // collapse multiple underscores
    .replace(/^_|_$/g, '')        // trim leading/trailing underscores
    .substring(0, 40);            // keep it reasonable length

/**
 * Resolve the user's folder username AND their display name for file naming.
 * Falls back gracefully if no profile exists yet (onboarding flow).
 */
const resolveUserInfo = async (userId, role) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  const displayName = sanitizeName(user?.name);

  if (role === 'MENTOR') {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { username: true },
    });
    return {
      folderName: profile?.username || `mentor_${userId.substring(0, 8)}`,
      displayName,
      prefix: 'mentor',
    };
  }

  const profile = await prisma.menteeProfile.findUnique({
    where: { userId },
    select: { username: true },
  });
  return {
    folderName: profile?.username || `mentee_${userId.substring(0, 8)}`,
    displayName,
    prefix: 'mentee',
  };
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
      const { folderName, displayName, prefix } = await resolveUserInfo(req.user.id, 'MENTOR');

      const uploads = {};

      if (profilePhoto) {
        // e.g. mentor_john_doe_avatar
        // A replacement needs a distinct ID. Reusing one would make cleanup
        // of the previous URL delete the newly uploaded avatar.
        const publicId = `${prefix}_${displayName}_avatar_${randomUUID()}`;
        uploads.profilePhotoUrl = await uploadToCloudinary(profilePhoto.buffer, {
          folder: getFolder(folderName, 'avatar'),
          public_id: publicId,
          resource_type: 'image',
          format: 'webp',
        });
      }

      if (collegeDocument) {
        // e.g. mentor_john_doe_college_doc
        const publicId = `${prefix}_${displayName}_college_doc_${randomUUID()}`;
        uploads.collegeDocumentUrl = await uploadToCloudinary(collegeDocument.buffer, {
          folder: getFolder(folderName, 'pdfs'),
          public_id: publicId,
          resource_type: 'image',
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
      const { folderName, displayName, prefix } = await resolveUserInfo(req.user.id, 'MENTEE');

      const uploads = {};

      if (profilePhoto) {
        // e.g. mentee_jane_doe_avatar
        const publicId = `${prefix}_${displayName}_avatar_${randomUUID()}`;
        uploads.profilePhotoUrl = await uploadToCloudinary(profilePhoto.buffer, {
          folder: getFolder(folderName, 'avatar'),
          public_id: publicId,
          resource_type: 'image',
          format: 'webp',
        });
      }

      if (resume) {
        // e.g. mentee_jane_doe_resume
        // PDFs must be uploaded as resource_type 'image' on Cloudinary — this enables
        // visual processing, thumbnail generation, and proper Content-Type handling.
        const publicId = `${prefix}_${displayName}_resume_${randomUUID()}`;

        console.log('[Upload] Uploading resume →', {
          folder: getFolder(folderName, 'pdfs'),
          publicId,
          originalName: resume.originalname,
          mimetype: resume.mimetype,
          size: resume.size,
        });

        uploads.resumeUrl = await uploadToCloudinary(resume.buffer, {
          folder: getFolder(folderName, 'pdfs'),
          public_id: publicId,
          resource_type: 'image',
        });

        console.log('[Upload] Resume uploaded successfully →', uploads.resumeUrl);
      }

      req.uploadedFiles = uploads;
      next();
    } catch (uploadError) {
      console.error('[Cloudinary] Mentee upload failed:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Cloud upload failed. Please try again.',
      });
    }
  });
};

export { mentorProfileUpload, menteeProfileUpload };
