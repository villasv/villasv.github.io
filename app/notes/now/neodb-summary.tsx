import { getCollection, NeoDBRecord } from "@/lib/neodb";
import { enumerate, concatWithSpaces } from "@/components/react-language";

export default function NeoDBSummary() {
  return (
    <>
      {concatWithSpaces(
        [
          Collection("Recently read", getCollection("book", "complete")),
          Collection("Currently reading", getCollection("book", "progress")),
          Collection("Next up I have", getCollection("book", "wishlist")),
          Collection("Recently watched", getCollection("movie", "complete")),
          Collection("Now watching", getCollection("movie", "progress")),
          Collection("Up next we have", getCollection("movie", "wishlist")),
        ].filter((el) => !!el),
      )}
    </>
  );
}

function Collection(
  intro: string,
  items: NeoDBRecord[],
): React.JSX.Element | undefined {
  if (!items.length) return;
  const itemSummaries = enumerate(items.map((s) => Item(s)));
  return (
    <>
      {intro} {itemSummaries}.
    </>
  );
}

function Item({ item, rating_grade, comment_text, post_id }: NeoDBRecord) {
  const title =
    item.localized_title.find((t) => t.lang === "en")?.text || item.title;
  const postUrl = `https://neodb.social/@villasv@neodb.social/posts/${post_id}`;
  if (!rating_grade || !comment_text) return <a href={item.id}>{title}</a>;
  return (
    <>
      <a href={item.id}>{title}</a> (<a href={postUrl}>{rating_grade}/10</a>)
    </>
  );
}
