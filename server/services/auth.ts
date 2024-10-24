import jwt from 'jsonwebtoken';
import Database from 'better-sqlite3';
import { DB_PATH, JWT_SECRET } from '../config';

export async function generateAuthCode(userId: number): Promise<string> {
  const db = new Database(DB_PATH);
  const code = Math.random().toString().slice(2, 8);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  db.prepare(`
    INSERT INTO auth_codes (user_id, code, expires_at)
    VALUES (?, ?, ?)
  `).run(userId, code, expiresAt.toISOString());

  db.close();
  return code;
}

export async function verifyAuthCode(userId: number, code: string): Promise<string | null> {
  const db = new Database(DB_PATH);
  
  const authCode = db.prepare(`
    SELECT * FROM auth_codes
    WHERE user_id = ? AND code = ? AND used = FALSE AND expires_at > datetime('now')
    ORDER BY created_at DESC LIMIT 1
  `).get(userId, code);

  if (!authCode) {
    db.close();
    return null;
  }

  // Mark code as used
  db.prepare(`
    UPDATE auth_codes SET used = TRUE WHERE id = ?
  `).run(authCode.id);

  db.close();

  // Generate JWT
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}