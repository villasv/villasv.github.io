import { promises as fs } from "fs";
import path from "path";

const NOTES_PATH = "notes";
let NOTES_CACHE: Note[] | undefined;

export interface Note {
  slug: string;
  title: string | null;
  /**
   * The page subpath is the portion of the url after the notes base prefix,
   * including the slug. A complete URL for a note can be built from its
   * parts with: `${domain}/notes/${pageSubpath}`
   */
  pageSubpath: string;
  /**
   * The file subpath is the portion of the file path relative to the NOTES_PATH
   * prefix, which is the section that can be used for dynamic imports without
   * having webpack inspect files outside the scope of the notes directory.
   */
  fileSubpath: string;
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
  const content = await fs.readFile(relativePath, { encoding: "utf-8" });
  return {
    slug: getNoteSlug(relativePath, content),
    title: getNoteTitle(content),
    pageSubpath: getPageSubpath(relativePath, content),
    fileSubpath: getFileSubpath(relativePath),
  };
}

export function getNoteSlug(relativePath: string, markdown: string): string {
  const title = getNoteTitle(markdown);
  return title ? terse(title) : path.parse(relativePath).name;
}

export function getNoteTitle(markdown: string): string | null {
  const titles = markdown.match(/(?<=^#\s+)[^\n]*/m);
  if (!titles) return null;
  return titles[0].trim();
}

export function getPageSubpath(relativePath: string, content: string): string {
  const folder = path.parse(path.parse(relativePath).dir).base;
  const slug = getNoteSlug(relativePath, content);
  return path.join(terse(folder).replace("-pages", ""), slug);
}

export function getFileSubpath(relativePath: string): string {
  return path.join(...relativePath.split("/").slice(1));
}

function terse(text: string): string {
  return text
    .replace(/&/g, "and")
    .replace(/[\W_]/g, "-")
    .replace(/\s/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/g, "")
    .replace(/-+$/g, "")
    .toLowerCase();
}
