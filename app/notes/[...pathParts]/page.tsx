import { getAllNotes, getNoteBySlug } from "../factory";

export interface NoteProps {
  params: {
    pathParts: string[];
  };
}

export async function generateStaticParams(): Promise<NoteProps["params"][]> {
  return (await getAllNotes()).map((note) => ({
    pathParts: [...note.folder.split("/"), note.slug],
  }));
}

export async function generateMetadata({ params: { pathParts } }: NoteProps) {
  const slug = pathParts[pathParts.length - 1];
  const { title } = await getNoteBySlug(slug);
  return {
    title,
  };
}

export default async function Note({ params: { pathParts } }: NoteProps) {
  const slug = pathParts[pathParts.length - 1];
  const { content } = await getNoteBySlug(slug);
  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
