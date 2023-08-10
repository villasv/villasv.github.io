import { getAllNotes, getNoteBySlug } from "../factory";

export interface NoteProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<NoteProps["params"][]> {
  return (await getAllNotes()).map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: NoteProps) {
  const { title } = await getNoteBySlug(params.slug);
  return {
    title,
  };
}

export default async function Note({ params: { slug } }: NoteProps) {
  const { content } = await getNoteBySlug(slug);
  return (
    <article>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
