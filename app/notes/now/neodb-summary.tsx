import { getCollection, NeoDBRecord } from "@/lib/neodb";
import { enumerate, concatWithSpaces } from "@/components/react-language";

export default function NeoDBSummary() {
  return (
    <>
      {concatWithSpaces(
        [
          Collection("Recently read", getCollection("book", "complete", 2)),
          Collection("Currently reading", getCollection("book", "progress")),
          Collection("Next I'll have", getCollection("book", "wishlist", 1)),
          Collection(
            "Recently watched",
            getCollection(["movie", "tv"], "complete", 2),
          ),
          Collection(
            "Now watching",
            getCollection(["movie", "tv"], "progress"),
          ),
          Collection(
            "Up next we have",
            getCollection(["movie", "tv"], "wishlist", 1),
          ),
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
      <a key={item.id} href={item.id}>
        {title}
      </a>{" "}
      (
      <a key={postUrl} href={postUrl}>
        {rating_grade}/10
      </a>
      )
    </>
  );
}
