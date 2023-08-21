import { promises as fs } from "fs";
import path from "path";

const NOTES_PATH = "notes";
let NOTES_CACHE: Note[] | undefined;

export interface Note {
  slug: string;
  title: string | null;
  content: string;
  relativeUrl: string;
  relativePath: string;
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
        ? getAllNotes(relativeSubpath)
        : [await loadNote(relativeSubpath)];
    })
  );
  return (NOTES_CACHE = files.flat());
}

export async function isPathToNote(pathParts: string[]): Promise<boolean> {
  if (!NOTES_CACHE) await getAllNotes();
  const slug = pathParts[pathParts.length - 1];
  return (NOTES_CACHE?.findIndex((n) => n.slug === slug) ?? -1) >= 0;
}

export async function getNoteBySlug(slug: string): Promise<Note> {
  if (!NOTES_CACHE) await getAllNotes();
  const note = NOTES_CACHE?.find((n) => n.slug === slug);
  if (!note) throw new Error(`Note with slug ${slug} does not exist`);
  return note;
}

async function loadNote(relativePath: string): Promise<Note> {
  const name = path.parse(relativePath).base.replace(/\..*/, "");
  const folder = path.parse(path.parse(relativePath).dir).base;
  const content = await fs.readFile(relativePath, { encoding: "utf-8" });

  const slug = maybeGetNoteSlug(content) || name;
  const url = path.join(terse(folder).replace("-pages", ""), slug);
  return {
    slug,
    title: maybeGetNoteTitle(content),
    content,
    relativeUrl: url,
    relativePath: path.join(...relativePath.split("/").slice(1)),
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
  return terse(title);
}

function terse(text: string): string {
  return text
    .replace(/[\W_]/g, "-")
    .replace(/\s/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/g, "")
    .replace(/-+$/g, "")
    .toLowerCase();
}
