import Database from 'better-sqlite3';
import { DB_PATH } from '../config';

interface User {
  id: number;
  email: string;
  password_hash: string;
}

export async function createUser(email: string, passwordHash: string): Promise<User> {
  const db = new Database(DB_PATH);
  
  const result = db.prepare(`
    INSERT INTO users (email, password_hash) VALUES (?, ?)
  `).run(email, passwordHash);

  const user = db.prepare(`
    SELECT id, email, password_hash FROM users WHERE id = ?
  `).get(result.lastInsertRowid);

  db.close();
  return user;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = new Database(DB_PATH);
  
  const user = db.prepare(`
    SELECT id, email, password_hash FROM users WHERE email = ?
  `).get(email);

  db.close();
  return user || null;
}