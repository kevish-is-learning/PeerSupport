import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Root folder prefix for all uploads.
 * Keeps dev / staging / prod isolated.
 */
const ROOT_FOLDER = process.env.CLOUDINARY_FOLDER || 'peersupport';

/**
 * Build a full Cloudinary folder path.
 * e.g. getFolder('mentor_abc12345', 'avatar') → 'peersupport/mentor_abc12345/avatar'
 */
export const getFolder = (username, subfolder) =>
  `${ROOT_FOLDER}/${username}/${subfolder}`;

/**
 * Extract the Cloudinary public_id from a secure_url so we can call destroy().
 * Works for both image and raw resource types.
 *
 * Example input:  https://res.cloudinary.com/<cloud>/image/upload/v123/peersupport/mentor_abc/avatar/file.jpg
 * Example output: peersupport/mentor_abc/avatar/file
 *
 * For raw assets (PDFs) the extension must be kept in the public_id.
 */
export const extractPublicId = (url) => {
  if (!url || !url.includes('res.cloudinary.com')) return null;

  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/');

    // Find the 'upload' segment — everything after the version segment is the public_id
    const uploadIdx = parts.indexOf('upload');
    if (uploadIdx === -1) return null;

    // Skip the version segment (e.g. "v1716509123")
    const afterUpload = parts.slice(uploadIdx + 1);
    const versionRegex = /^v\d+$/;
    const startIdx = versionRegex.test(afterUpload[0]) ? 1 : 0;

    const publicIdWithExt = afterUpload.slice(startIdx).join('/');

    return publicIdWithExt;
  } catch {
    return null;
  }
};

/**
 * Remove the file extension from a public_id (for image resources).
 * Cloudinary image public_ids should NOT include the extension.
 */
export const stripExtension = (publicId) => {
  if (!publicId) return null;
  return publicId.replace(/\.[^/.]+$/, '');
};

/**
 * Whether two Cloudinary URLs point to the same stored asset. Cloudinary
 * changes the version in a URL whenever an asset is overwritten, so comparing
 * the URLs alone is not enough before deciding whether an old file is safe to
 * delete.
 */
export const isSameCloudinaryAsset = (firstUrl, secondUrl) => {
  const firstPublicId = extractPublicId(firstUrl);
  const secondPublicId = extractPublicId(secondUrl);

  if (!firstPublicId || !secondPublicId) return false;

  const firstResourceType = firstUrl.includes('/raw/upload/') ? 'raw' : 'image';
  const secondResourceType = secondUrl.includes('/raw/upload/') ? 'raw' : 'image';
  const normalize = (publicId, resourceType) =>
    resourceType === 'raw' ? publicId : stripExtension(publicId);

  return firstResourceType === secondResourceType
    && normalize(firstPublicId, firstResourceType) === normalize(secondPublicId, secondResourceType);
};

/**
 * Delete an asset from Cloudinary by its URL.
 * Automatically detects whether it's an image or raw resource.
 */
export const destroyAsset = async (url) => {
  if (!url || !url.includes('res.cloudinary.com')) return;

  const fullPublicId = extractPublicId(url);
  if (!fullPublicId) return;

  try {
    // Determine resource type from URL path
    const isRaw = url.includes('/raw/upload/');

    if (isRaw) {
      // Raw assets (PDFs) keep their extension in the public_id
      await cloudinary.uploader.destroy(fullPublicId, { resource_type: 'raw' });
    } else {
      // Image assets — strip extension from public_id
      const imagePublicId = stripExtension(fullPublicId);
      await cloudinary.uploader.destroy(imagePublicId, { resource_type: 'image' });
    }
  } catch (error) {
    // Log but don't throw — deletion failures shouldn't break the flow
    console.warn(`[Cloudinary] Failed to delete asset: ${url}`, error.message);
  }
};

export default cloudinary;
