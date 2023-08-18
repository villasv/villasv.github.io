import { promises as fs } from "fs";
import path from "path";

const NOTES_PATH = "notes";
let NOTES_CACHE: Note[] | undefined;

export interface Note {
  slug: string;
  title: string | null;
  content: string;
}

export async function getAllNotes(
  notesPath: string = NOTES_PATH
): Promise<Note[]> {
  if (NOTES_CACHE) return NOTES_CACHE;
  const subpaths = await fs.readdir(notesPath);
  const files = await Promise.all(
    subpaths.map(async (fileName) => {
      const relativeSubpath = path.join(notesPath, fileName);
      return (await fs.stat(relativeSubpath)).isDirectory()
        ? getAllNotes(relativeSubpath) // TODO: recursive call
        : [await loadNote(relativeSubpath)];
    })
  );
  return (NOTES_CACHE = files.flat());
}

export async function getNoteBySlug(slug: string): Promise<Note> {
  if (!NOTES_CACHE) await getAllNotes();
  const note = NOTES_CACHE?.find((n) => n.slug === slug);
  if (!note) throw new Error(`Note with slug ${slug} does not exist`);
  return note;
}

async function loadNote(relativePath: string): Promise<Note> {
  const fileContent = await fs.readFile(relativePath, { encoding: "utf-8" });
  return {
    slug: maybeGetNoteSlug(fileContent) || relativePath.replace(/\..*/, ""),
    title: maybeGetNoteTitle(fileContent),
    content: fileContent,
  };
}

function maybeGetNoteTitle(markdown: string): string | null {
  const titles = markdown.match(/(?<=#)[^\n]*/);
  if (!titles) return null;
  return titles[0].trim();
}

function maybeGetNoteSlug(markdown: string): string | null {
  const title = maybeGetNoteTitle(markdown);
  if (!title) return null;
  return title
    .replace(/[\W_]/g, "-")
    .replace(/\s/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}
