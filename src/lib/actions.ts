
'use server';

import { put, list, del } from '@vercel/blob';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { db } from './db';

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
  revalidatePath('/photos');
  return blob;
}

export async function listImages() {
  const ip = getIP();
  const folderName = ip.replace(/[:.]/g, '-');

  const { blobs } = await list({
    prefix: `photos/${folderName}/`,
  });

  return blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
}

export async function deleteImage(url: string) {
    await del(url);
    revalidatePath('/photos');
}

// --- Notes Actions ---

async function initNotesTable() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id SERIAL PRIMARY KEY,
                title TEXT,
                content TEXT,
                ip_address VARCHAR(45) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `, []);
    } catch (error) {
        console.error("Error initializing notes table:", error);
        throw new Error("Could not initialize notes table.");
    }
}

export async function getNotes() {
    await initNotesTable();
    const ip = getIP();
    try {
        const result = await db.query('SELECT id, title, content, updated_at FROM notes WHERE ip_address = $1 ORDER BY updated_at DESC', [ip]);
        return result.rows;
    } catch (error) {
        console.error("Failed to fetch notes:", error);
        return [];
    }
}

export async function createNote() {
    await initNotesTable();
    const ip = getIP();
    const defaultTitle = "New Note";
    const defaultContent = "";
    try {
        const result = await db.query('INSERT INTO notes (title, content, ip_address) VALUES ($1, $2, $3) RETURNING id, title, content, updated_at', [defaultTitle, defaultContent, ip]);
        revalidatePath('/notes');
        return result.rows[0];
    } catch (error) {
        console.error("Failed to create note:", error);
        throw new Error("Could not create new note.");
    }
}

export async function updateNote(id: number, title: string, content: string) {
    const ip = getIP();
    try {
        const result = await db.query('UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND ip_address = $4 RETURNING id, title, content, updated_at', [title, content, id, ip]);
        revalidatePath('/notes');
        return result.rows[0];
    } catch (error) {
        console.error("Failed to update note:", error);
        throw new Error("Could not update note.");
    }
}

export async function deleteNote(id: number) {
    const ip = getIP();
    try {
        await db.query('DELETE FROM notes WHERE id = $1 AND ip_address = $2', [id, ip]);
        revalidatePath('/notes');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete note:", error);
        return { success: false, message: 'Could not delete note.' };
    }
}
