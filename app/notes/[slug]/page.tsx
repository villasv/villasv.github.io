import { getAllNotes, getNoteBySlug } from "../factory";

export interface NoteProps {
  params: {
    slug: string;
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

// This function can statically allow nextjs to find all the posts that you
// have made, and statically generate them
export async function generateStaticParams() {
  const notes = await getAllNotes();

  return notes.map((note) => ({
    slug: note.slug,
  }));
}

// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir, and this can be async just like the server
// component
export async function generateMetadata({ params }: NoteProps) {
  const { title } = await getNoteBySlug(params.slug);
  return {
    title,
  };
}
