
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

// --- Notes & Folders Actions ---

async function initDatabase() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS folders (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                ip_address VARCHAR(45) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `, []);

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
        
        // Add folder_id column to notes table if it doesn't exist
        const result = await db.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='notes' AND column_name='folder_id'
        `, []);

        if (result.rowCount === 0) {
            await db.query(`
                ALTER TABLE notes 
                ADD COLUMN folder_id INTEGER REFERENCES folders(id) ON DELETE SET NULL;
            `, []);
        }
    } catch (error) {
        console.error("Error initializing database schema:", error);
        throw new Error("Could not initialize database.");
    }
}

// FOLDER ACTIONS
export async function getFolders() {
    await initDatabase();
    const ip = getIP();
    try {
        const result = await db.query('SELECT * FROM folders WHERE ip_address = $1 ORDER BY name ASC', [ip]);
        return result.rows;
    } catch (error) {
        console.error("Failed to fetch folders:", error);
        return [];
    }
}

export async function createFolder(name: string) {
    await initDatabase();
    const ip = getIP();
    try {
        const result = await db.query('INSERT INTO folders (name, ip_address) VALUES ($1, $2) RETURNING *', [name, ip]);
        revalidatePath('/notes');
        return result.rows[0];
    } catch (error) {
        console.error("Failed to create folder:", error);
        throw new Error("Could not create new folder.");
    }
}

export async function deleteFolder(id: number) {
    await initDatabase();
    const ip = getIP();
    try {
        await db.query('DELETE FROM folders WHERE id = $1 AND ip_address = $2', [id, ip]);
        revalidatePath('/notes');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete folder:", error);
        return { success: false, message: 'Could not delete folder.' };
    }
}


// NOTE ACTIONS
export async function getNotes(folderId?: number | 'all') {
    await initDatabase();
    const ip = getIP();
    try {
        let query = 'SELECT id, title, content, updated_at, folder_id FROM notes WHERE ip_address = $1';
        const params: (string | number)[] = [ip];

        if (typeof folderId === 'number') {
            query += ' AND folder_id = $2';
            params.push(folderId);
        }
        
        query += ' ORDER BY updated_at DESC';
        
        const result = await db.query(query, params);
        return result.rows;
    } catch (error) {
        console.error("Failed to fetch notes:", error);
        return [];
    }
}

export async function createNote(folderId?: number | null) {
    await initDatabase();
    const ip = getIP();
    const defaultTitle = "New Note";
    const defaultContent = "";
    try {
        const result = await db.query(
            'INSERT INTO notes (title, content, ip_address, folder_id) VALUES ($1, $2, $3, $4) RETURNING id, title, content, updated_at, folder_id', 
            [defaultTitle, defaultContent, ip, folderId]
        );
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
        const result = await db.query('UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND ip_address = $4 RETURNING id, title, content, updated_at, folder_id', [title, content, id, ip]);
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

export async function moveNoteToFolder(noteId: number, folderId: number | null) {
    const ip = getIP();
    try {
        await db.query('UPDATE notes SET folder_id = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND ip_address = $3', [folderId, noteId, ip]);
        revalidatePath('/notes');
        return { success: true };
    } catch (error) {
        console.error("Failed to move note:", error);
        throw new Error("Could not move note.");
    }
}
