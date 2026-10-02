/**
 * Google profile photos come back as small thumbnails (e.g. `...=s96-c`).
 * Rewrite the size suffix to `=s0`, which serves the original-resolution photo.
 * Non-Google URLs are returned unchanged.
 */
export const toFullSizeGooglePhoto = (url) => {
  if (!url || !/^https:\/\/[^/]*googleusercontent\.com\//.test(url)) return url;
  return url.replace(/=s\d+(-c)?$/, '=s0').replace(/([?&])sz=\d+/, '$1sz=1024');
};
