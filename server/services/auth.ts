import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import Database from 'better-sqlite3';
import { DB_PATH, JWT_SECRET } from '../config';
import { sendPasswordResetEmail } from './email';
import { createUser, findUserByEmail } from './users';

interface User {
  id: number;
  email: string;
  password_hash: string;
}

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

export async function generateToken(user: User): Promise<string> {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
}

export async function registerUser(email: string, password: string): Promise<User> {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await hashPassword(password);
  return createUser(email, hashedPassword);
}

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
  const user = await findUserByEmail(email);
  if (!user || !user.password_hash) {
    throw new Error('Invalid email or password');
  }

  const isValid = await verifyPassword(user.password_hash, password);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const token = await generateToken(user);
  return { user, token };
}

export async function generatePasswordResetToken(userId: number): Promise<string> {
  const db = new Database(DB_PATH);
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  db.prepare(`
    INSERT INTO password_reset_tokens (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `).run(userId, token, expiresAt.toISOString());

  db.close();
  return token;
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const db = new Database(DB_PATH);
  
  const resetToken = db.prepare(`
    SELECT * FROM password_reset_tokens
    WHERE token = ? AND used = FALSE AND expires_at > datetime('now')
  `).get(token);

  if (!resetToken) {
    throw new Error('Invalid or expired reset token');
  }

  const hashedPassword = await hashPassword(newPassword);

  db.prepare(`
    UPDATE users SET password_hash = ? WHERE id = ?
  `).run(hashedPassword, resetToken.user_id);

  db.prepare(`
    UPDATE password_reset_tokens SET used = TRUE WHERE token = ?
  `).run(token);

  db.close();
}

export async function initiatePasswordReset(email: string): Promise<void> {
  const user = await findUserByEmail(email);
  if (!user) {
    // Don't reveal whether the email exists
    return;
  }

  const token = await generatePasswordResetToken(user.id);
  await sendPasswordResetEmail(email, token);
}