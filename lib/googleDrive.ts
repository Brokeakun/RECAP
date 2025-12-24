import { google } from 'googleapis';
import type { GoogleDriveFile } from '../src/types';

export async function getDriveFiles(): Promise<GoogleDriveFile[]> {
  const { GDRIVE_CLIENT_EMAIL, GDRIVE_PRIVATE_KEY, GDRIVE_FOLDER_ID } = process.env;

  if (!GDRIVE_CLIENT_EMAIL || !GDRIVE_PRIVATE_KEY || !GDRIVE_FOLDER_ID) {
    throw new Error('Missing Google Drive API credentials in environment variables');
  }

  // Handle private key format - support both quoted and unquoted, with \n or real newlines
  let privateKey = GDRIVE_PRIVATE_KEY;
  
  // Remove quotes if present
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  
  // Replace escaped newlines
  privateKey = privateKey.replace(/\\n/g, '\n');
  
  // Validate key format
  if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    throw new Error('Invalid private key format: missing BEGIN marker');
  }
  if (!privateKey.includes('-----END PRIVATE KEY-----')) {
    throw new Error('Invalid private key format: missing END marker');
  }

  const auth = new google.auth.JWT({
    email: GDRIVE_CLIENT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });
  
  try {
    const response = await drive.files.list({
      q: `'${GDRIVE_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, webContentLink, thumbnailLink, createdTime, modifiedTime, fileExtension)',
      orderBy: 'modifiedTime desc',
      pageSize: 100,
      supportsAllDrives: true,
    });

    return (response.data.files || []) as GoogleDriveFile[];
  } catch (error) {
    console.error('Error fetching files from Google Drive:', error);
    throw new Error('Failed to fetch files from Google Drive');
  }
}
