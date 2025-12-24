import type { NextApiRequest, NextApiResponse } from 'next';
import { getDriveFiles } from '../../lib/googleDrive';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const files = await getDriveFiles();
    res.status(200).json(files);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
}
