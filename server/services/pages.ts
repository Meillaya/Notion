import Database from 'better-sqlite3';
import { DB_PATH } from '../config';

interface Page {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export async function createPage(userId: number, title: string = 'Untitled'): Promise<Page> {
    const db = new Database(DB_PATH);

    const result = db.prepare(`
    INSERT INTO pages (user_id, title)
    VALUES (?, ?)
  `).run(userId, title);

    const page = db.prepare(`
    SELECT * FROM pages WHERE id = ?
  `).get(result.lastInsertRowid);

    db.close();
    return page;
}

export async function updatePage(pageId: number, userId: number, updates: Partial<Page>): Promise<Page> {
    const db = new Database(DB_PATH);

    const setColumns = Object.keys(updates)
        .map(key => `${key} = ?`)
        .concat(['updated_at = CURRENT_TIMESTAMP'])
        .join(', ');

    const values = Object.values(updates);

    db.prepare(`
    UPDATE pages
    SET ${setColumns}
    WHERE id = ? AND user_id = ?
  `).run(...values, pageId, userId);

    const page = db.prepare(`
    SELECT * FROM pages WHERE id = ? AND user_id = ?
  `).get(pageId, userId);

    db.close();
    return page;
}

export async function getUserPages(userId: number): Promise<Page[]> {
    const db = new Database(DB_PATH);

    const pages = db.prepare(`
    SELECT * FROM pages
    WHERE user_id = ?
    ORDER BY updated_at DESC
  `).all(userId);

    db.close();
    return pages;
}

export async function getPage(pageId: number, userId: number): Promise<Page | null> {
    const db = new Database(DB_PATH);

    const page = db.prepare(`
    SELECT * FROM pages
    WHERE id = ? AND user_id = ?
  `).get(pageId, userId);

    db.close();
    return page || null;
}