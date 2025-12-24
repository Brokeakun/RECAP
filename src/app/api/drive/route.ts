import { getDriveFiles } from '@/lib/googleDrive';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.log('API /api/drive called');
  try {
    console.log('Fetching files from Google Drive...');
    const files = await getDriveFiles();
    console.log(`Successfully fetched ${files.length} files`);
    return NextResponse.json(files);
  } catch (error) {
    console.error('Error in /api/drive:', error);
    // Return detailed error for debugging (remove in production if sensitive)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch files from Google Drive', details: errorMessage }, { status: 500 });
  }
}
