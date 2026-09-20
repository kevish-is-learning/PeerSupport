import cloudinary, { getFolder } from '../config/cloudinary.js';

const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
]);

export const uploadSingleFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const requestedFolder = req.body.folder;
    const allowedFolders = new Set(['avatar', 'general', 'documents']);
    const folder = allowedFolders.has(requestedFolder) ? requestedFolder : 'general';
    const userId = req.user.id;
    const shortId = userId.substring(0, 8);
    const uniqueId = `file_${Date.now()}`;

    const isImage = IMAGE_MIME_TYPES.has(req.file.mimetype);

    // Images are normalised to webp. PDFs/DOCs are uploaded as resource_type
    // 'image' too — Cloudinary blocks unsigned public delivery of 'raw' files
    // (PDF/ZIP) by default as an anti-abuse measure, which would make every
    // resume/SOP link 401 in production. 'image' delivery has no such
    // restriction and still serves the original file unmodified.
    const uploadOptions = isImage
      ? {
          folder: getFolder(`user_${shortId}`, folder),
          public_id: uniqueId,
          resource_type: 'image',
          format: 'webp',
          overwrite: true,
        }
      : {
          folder: getFolder(`user_${shortId}`, 'documents'),
          public_id: uniqueId,
          resource_type: 'image',
          overwrite: true,
        };

    const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        console.error('[Cloudinary] Direct upload failed:', error);
        return res.status(500).json({ success: false, message: 'Cloud upload failed' });
      }
      return res.status(200).json({
        success: true,
        url: result.secure_url,
        message: 'File uploaded successfully',
      });
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error('UploadController error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
