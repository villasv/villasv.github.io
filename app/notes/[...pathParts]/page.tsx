import { getAllNotes, getNoteBySlug, isPathToNote } from "../factory";
import TableOfContents from "../page";

export interface PageProps {
  params: {
    pathParts: string[];
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  const notes = await getAllNotes();
  const notesProps = notes.flatMap((note) => [
    ...note.relativeUrl.split("/").map((part, index, array) => ({
      pathParts: [...array.slice(0, index), part],
    })),
  ]);
  return notesProps;
}

export async function generateMetadata({ params: { pathParts } }: PageProps) {
  const isNote = await isPathToNote(pathParts);
  if (!isNote) return { title: "Notes" };

  const slug = pathParts[pathParts.length - 1];
  const { title } = await getNoteBySlug(slug);
  return { title };
}

export default async function TocOrNote({ params: { pathParts } }: PageProps) {
  const isNote = await isPathToNote(pathParts);
  if (!isNote) return <TableOfContents />;

  const slug = pathParts[pathParts.length - 1];
  const { relativePath } = await getNoteBySlug(slug);
  const { default: Note } = await import(`notes/${relativePath}`);
  return (
    <article>
      <Note />
    </article>
  );
}
