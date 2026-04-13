import fs from 'fs';
import path from 'path';
import multer from 'multer';

const uploadsRoot = path.resolve(process.cwd(), 'uploads');

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const normalizePublicPath = (absoluteFilePath) => {
  const relativePath = path.relative(uploadsRoot, absoluteFilePath);
  return `/uploads/${relativePath.split(path.sep).join('/')}`;
};

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    let folderName = 'mentor-documents';

    if (file.fieldname === 'profilePhoto') {
      folderName = 'mentor-avatars';
    }

    if (file.fieldname === 'resume') {
      folderName = 'mentee-resumes';
    }

    const destinationDir = path.join(uploadsRoot, folderName);
    ensureDir(destinationDir);
    callback(null, destinationDir);
  },
  filename: (_req, file, callback) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg';
    const uniquePart = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${file.fieldname}-${uniquePart}${ext}`);
  },
});

const createUploader = (allowedMimeTypes, errorMessage) =>
  multer({
    storage,
    fileFilter: (_req, file, callback) => {
      if (!allowedMimeTypes.has(file.mimetype)) {
        callback(new Error(errorMessage));
        return;
      }

      callback(null, true);
    },
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  });

const mentorUpload = createUploader(
  new Set(['image/jpeg', 'image/png', 'image/webp']),
  'Only JPG, PNG, and WEBP image uploads are allowed'
);

const menteeUpload = createUploader(
  new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]),
  'Only PDF, DOC, and DOCX files are allowed for resume upload'
);

const mentorUploadFieldsHandler = mentorUpload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'collegeDocument', maxCount: 1 },
]);

const menteeUploadFieldsHandler = menteeUpload.fields([{ name: 'resume', maxCount: 1 }]);

const mentorProfileUpload = (req, res, next) => {
  mentorUploadFieldsHandler(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message || 'File upload failed',
      });
    }

    const profilePhoto = req.files?.profilePhoto?.[0];
    const collegeDocument = req.files?.collegeDocument?.[0];

    req.uploadedFiles = {
      profilePhotoUrl: profilePhoto ? normalizePublicPath(profilePhoto.path) : undefined,
      collegeDocumentUrl: collegeDocument ? normalizePublicPath(collegeDocument.path) : undefined,
    };

    next();
  });
};

const menteeProfileUpload = (req, res, next) => {
  menteeUploadFieldsHandler(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message || 'File upload failed',
      });
    }

    const resume = req.files?.resume?.[0];

    req.uploadedFiles = {
      resumeUrl: resume ? normalizePublicPath(resume.path) : undefined,
    };

    next();
  });
};

export { mentorProfileUpload, menteeProfileUpload };
