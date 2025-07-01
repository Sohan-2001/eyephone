
'use server';

import { put, list } from '@vercel/blob';
import { headers } from 'next/headers';

function getIP() {
  const forwardedFor = headers().get('x-forwarded-for');
  const realIp = headers().get('x-real-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  if (realIp) {
    return realIp.trim();
  }
  return 'localhost';
}

export async function uploadImage(dataUri: string) {
  const ip = getIP();
  const folderName = ip.replace(/[:.]/g, '-');
  
  const buffer = Buffer.from(dataUri.split('base64,')[1], 'base64');
  const blob = await put(`photos/${folderName}/${Date.now()}.png`, buffer, {
    access: 'public',
    contentType: 'image/png',
  });
  return blob;
}

export async function listImages() {
  const ip = getIP();
  const folderName = ip.replace(/[:.]/g, '-');

  const { blobs } = await list({
    prefix: `photos/${folderName}/`,
  });

  return blobs;
}
