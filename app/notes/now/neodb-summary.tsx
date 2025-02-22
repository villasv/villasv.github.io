import { NeoDBItem } from "@/lib/neodb";
import { enumerate, concatWithSpaces } from "@/components/react-language";

const watched: NeoDBItem[] = [
  {
    title: "Drops of God",
    rating: 2,
    link: "https://neodb.social/tv/6VZQXtGpHKPRLjsnLagZEb",
    post: "https://neodb.social/@villasv@neodb.social/posts/398039015913770840/",
  },
];
const watching: NeoDBItem[] = [
  {
    title: "Severance",
    rating: 5,
    link: "https://neodb.social/tv/season/6d3XZOiiiuuiHERDMSrBJh",
  },
  {
    title: "True North",
    rating: 4,
    link: "https://neodb.social/tv/season/2TBK6FTzcI4s8QAMG1Dvyq",
  },
  {
    title: "Disclaimer",
    rating: 3,
    link: "https://neodb.social/tv/season/6d3XZOiiiuuiHERDMSrBJh",
  },
];
const toWatch: NeoDBItem[] = [];

const read: NeoDBItem[] = [];
const reading: NeoDBItem[] = [];
const toRead: NeoDBItem[] = [];

export default function NeoDBSummary() {
  return (
    <>
      {concatWithSpaces(
        [
          CollectionSummary("Recently read", read),
          CollectionSummary("Currently reading", reading),
          CollectionSummary("Next up I have", toRead),
          CollectionSummary("Recently watched", watched),
          CollectionSummary("Now watching", watching),
          CollectionSummary("Up next we have", toWatch),
        ].filter((el) => !!el),
      )}
    </>
  );
}

function CollectionSummary(
  intro: string,
  items: NeoDBItem[],
): React.JSX.Element | undefined {
  if (!items.length) return;
  const itemSummaries = enumerate(items.map((s) => ItemSummary(s)));
  return (
    <>
      {intro} {itemSummaries}.
    </>
  );
}

function ItemSummary({ title, link, rating, post }: NeoDBItem) {
  if (!rating || !post) return <a href={link}>{title}</a>;
  return (
    <>
      <a href={link}>{title}</a> (<a href={post}>{rating * 2}/10</a>)
    </>
  );
}
