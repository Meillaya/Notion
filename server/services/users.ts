import Database from 'better-sqlite3';
import { DB_PATH } from '../config';

interface User {
  id: number;
  email: string;
}

export async function createUser(email: string): Promise<User> {
  const db = new Database(DB_PATH);
  
  const result = db.prepare(`
    INSERT INTO users (email) VALUES (?)
  `).run(email);

  const user = {
    id: result.lastInsertRowid as number,
    email
  };

  db.close();
  return user;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = new Database(DB_PATH);
  
  const user = db.prepare(`
    SELECT * FROM users WHERE email = ?
  `).get(email);

  db.close();
  return user || null;
}