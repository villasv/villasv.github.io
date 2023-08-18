import { getAllNotes, getNoteBySlug, isPathToNote } from "../factory";
import Page from "../page";

export interface PageProps {
  params: {
    pathParts: string[];
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  const notes = await getAllNotes();
  const notesProps = notes.flatMap((note) => [
    ...note.folder.split("/").map((part, index, array) => ({
      pathParts: [...array.slice(0, index), part],
    })),
    {
      pathParts: [...note.folder.split("/"), note.slug],
    },
  ]);
  console.log(notesProps);
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
  if (!isNote) return <Page />;

  const slug = pathParts[pathParts.length - 1];
  const { content } = await getNoteBySlug(slug);
  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
