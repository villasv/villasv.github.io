import { promises as fs } from "fs";
import path from "path";

const NOTES_PATH = "notes";
let NOTES_CACHE: Note[] | undefined;

export interface Note {
  slug: string;
  title: string | null;
  content: string;
}

export async function getAllNotes(): Promise<Note[]> {
  if (NOTES_CACHE) return NOTES_CACHE;
  const notesFiles = await fs.readdir(NOTES_PATH);
  NOTES_CACHE = await Promise.all(
    notesFiles.map((noteFile) => loadNote(noteFile))
  );
  return NOTES_CACHE;
}

export async function getNoteBySlug(slug: string): Promise<Note> {
  if (!NOTES_CACHE) await getAllNotes();
  const note = NOTES_CACHE?.find((n) => n.slug === slug);
  if (!note) throw new Error(`Note with slug ${slug} does not exist`);
  return note;
}

async function loadNote(fileName: string): Promise<Note> {
  const relativePath = path.join(NOTES_PATH, fileName);
  const fileContent = await fs.readFile(relativePath, { encoding: "utf-8" });
  return {
    slug: maybeGetNoteSlug(fileContent) || fileName.replace(/\..*/, ""),
    title: maybeGetNoteTitle(fileContent),
    content: fileContent,
  };
}

function maybeGetNoteTitle(markdown: string): string | null {
  const titles = markdown.match(/(?<=#)[\w\s]*/);
  if (!titles) return null;
  return titles[0].trim();
}

function maybeGetNoteSlug(markdown: string): string | null {
  const title = maybeGetNoteTitle(markdown);
  if (!title) return null;
  return title.replace(/\s/g, "-").toLowerCase();
}
