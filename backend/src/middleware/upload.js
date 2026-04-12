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
    const folderName = file.fieldname === 'profilePhoto' ? 'mentor-avatars' : 'mentor-documents';
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

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const fileFilter = (_req, file, callback) => {
  if (!allowedMimeTypes.has(file.mimetype)) {
    callback(new Error('Only JPG, PNG, and WEBP image uploads are allowed'));
    return;
  }

  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const mentorUploadFieldsHandler = upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'collegeDocument', maxCount: 1 },
]);

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

export { mentorProfileUpload };
