import cloudinary, { getFolder } from '../config/cloudinary.js';

export const uploadSingleFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const requestedFolder = req.body.folder;
    const allowedFolders = new Set(['avatar', 'general']);
    const folder = allowedFolders.has(requestedFolder) ? requestedFolder : 'general';
    const userId = req.user.id;
    const shortId = userId.substring(0, 8);
    const uniqueId = `file_${Date.now()}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: getFolder(`user_${shortId}`, folder),
        public_id: uniqueId,
        resource_type: 'image',
        format: 'webp',
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          console.error('[Cloudinary] Direct upload failed:', error);
          return res.status(500).json({ success: false, message: 'Cloud upload failed' });
        }
        return res.status(200).json({
          success: true,
          url: result.secure_url,
          message: 'File uploaded successfully',
        });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    console.error('UploadController error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
