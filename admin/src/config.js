export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://aayushinstitute.onrender.com';

export const getUploadUrl = (filename) => {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:')) {
    return filename;
  }
  const clean = filename.startsWith('/') ? filename : `/${filename}`;
  return `${BACKEND_URL}${clean}`;
};
