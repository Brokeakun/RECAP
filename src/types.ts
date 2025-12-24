// Type definitions untuk Google Drive files

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
  thumbnailLink?: string;
  createdTime?: string;
  modifiedTime?: string;
  fileExtension?: string;
}

export interface GoogleDriveResponse {
  files: GoogleDriveFile[];
}

// Utility function untuk detect file type
export function getFileType(mimeType: string, fileName: string): 'image' | 'video' | 'document' | 'audio' | 'archive' | 'other' {
  if (mimeType.includes('image/')) return 'image';
  if (mimeType.includes('video/')) return 'video';
  if (mimeType.includes('audio/')) return 'audio';
  if (mimeType.includes('application/pdf') || mimeType.includes('document') || mimeType.includes('word') || mimeType.includes('sheet') || mimeType.includes('presentation')) return 'document';
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar') || mimeType.includes('7z') || mimeType.includes('gzip')) return 'archive';
  return 'other';
}

// Get icon for file type
export function getFileIcon(mimeType: string, fileName: string): string {
  const type = getFileType(mimeType, fileName);
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  
  switch (type) {
    case 'image': return '🖼️';
    case 'video': return '🎬';
    case 'audio': return '🎵';
    case 'document': 
      if (ext === 'pdf') return '📄';
      if (ext === 'docx' || ext === 'doc') return '📝';
      if (ext === 'xlsx' || ext === 'xls') return '📊';
      if (ext === 'pptx' || ext === 'ppt') return '📽️';
      return '📋';
    case 'archive': return '📦';
    default: return '📎';
  }
}
