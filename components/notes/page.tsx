import { getAllNotes } from "./factory";

export default async function Page() {
  const notes = await getAllNotes();
  return (
    <div>
      <ol>
        {notes.map((note, index) => (
          <li key={index}>
            <a href={`/notes/${note.pageSubpath}`}>{note.title}</a>
          </li>
        ))}
      </ol>
    </div>
  );
}
