import { getDriveFiles } from '../../../../lib/googleDrive';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const files = await getDriveFiles();
    return NextResponse.json(files);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch files from Google Drive' }, { status: 500 });
  }
}
