import Database from 'better-sqlite3';
import { DB_PATH } from '../config';
import fs from 'fs';
import path from 'path';

export function setupDatabase() {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Remove existing database to ensure clean schema
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
  }

  const db = new Database(DB_PATH);

  // Users table with password hash
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      theme TEXT DEFAULT 'light',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Password reset tokens table
  db.exec(`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT UNIQUE NOT NULL,
      used BOOLEAN DEFAULT FALSE,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Pages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      parent_id INTEGER,
      title TEXT NOT NULL DEFAULT 'Untitled',
      content TEXT,
      icon TEXT,
      cover_image TEXT,
      position INTEGER NOT NULL DEFAULT 0,
      is_favorite BOOLEAN DEFAULT FALSE,
      last_accessed DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (parent_id) REFERENCES pages (id)
    )
  `);

  // Page sharing table
  db.exec(`
    CREATE TABLE IF NOT EXISTS page_shares (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_id INTEGER NOT NULL,
      share_token TEXT UNIQUE NOT NULL,
      can_edit BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (page_id) REFERENCES pages (id)
    )
  `);

  db.close();
}