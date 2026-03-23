"use server";

import db from "./db";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

// Type definitions
export type User = {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  following: number;
};

export type Edit = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  editorId: string;
  likes: number;
  views: number;
  createdAt: string;
  editorName?: string;
};

export async function getEdits(): Promise<Edit[]> {
  const stmt = db.prepare(`
    SELECT edits.*, users.name as editorName
    FROM edits
    JOIN users ON edits.editorId = users.id
    ORDER BY edits.createdAt DESC
  `);

  return stmt.all() as Edit[];
}

export async function getUser(userId: string): Promise<User | null> {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const user = stmt.get(userId) as User | undefined;
  return user || null;
}

export async function getUserEdits(userId: string): Promise<Edit[]> {
  const stmt = db.prepare(`
    SELECT edits.*, users.name as editorName
    FROM edits
    JOIN users ON edits.editorId = users.id
    WHERE edits.editorId = ?
    ORDER BY edits.createdAt DESC
  `);

  return stmt.all(userId) as Edit[];
}

export async function uploadEdit(formData: FormData) {
  const file = formData.get("video") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!file || !title) {
    throw new Error("Missing required fields");
  }

  // Simulate logged in user
  const editorId = "u1";

  // Create unique filename
  const extension = file.name.split('.').pop() || 'mp4';
  const fileName = `${uuidv4()}.${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, fileName);

  // Ensure the upload directory exists
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error("Error creating upload directory:", error);
  }

  // Convert File to Buffer and write
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await fs.writeFile(filePath, buffer);

  const videoUrl = `/uploads/${fileName}`;
  // Use a placeholder thumbnail for now since extracting from video on server is complex
  const thumbnailUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop";

  const editId = uuidv4();

  const insertStmt = db.prepare(`
    INSERT INTO edits (id, title, description, videoUrl, thumbnailUrl, editorId)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertStmt.run(editId, title, description, videoUrl, thumbnailUrl, editorId);

  revalidatePath("/");
  revalidatePath("/profile");

  return { success: true, editId };
}