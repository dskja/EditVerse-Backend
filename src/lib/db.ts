import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "editverse.db");
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    bio TEXT,
    avatarUrl TEXT,
    followers INTEGER DEFAULT 0,
    following INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS edits (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    videoUrl TEXT NOT NULL,
    thumbnailUrl TEXT,
    editorId TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (editorId) REFERENCES users (id)
  );
`);

// Insert a default user if none exists
const stmt = db.prepare("SELECT COUNT(*) AS count FROM users");
const row = stmt.get() as { count: number };

if (row.count === 0) {
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, username, bio, avatarUrl)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertUser.run(
    "u1",
    "NeonVFX",
    "neon_vfx",
    "Cyberpunk enthusiast and motion designer.",
    ""
  );
}

export default db;