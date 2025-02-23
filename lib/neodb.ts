import neodbData from "@/public/neodb.json";

export type Shelf = "wishlist" | "progress" | "complete" | "dropped";
export type Category =
  | "book"
  | "movie"
  | "tv"
  | "music"
  | "game"
  | "podcast"
  | "performance";

export interface NeoDBRecord {
  shelf_type: string;
  post_id: string;
  created_time: string;
  rating_grade: number | null;
  comment_text: string | null;
  item: {
    id: string;
    title: string;
    localized_title: {
      lang: string;
      text: string;
    }[];
  };
}

export function getCollection(
  categories: Category | Category[],
  shelves: Shelf | Shelf[],
): NeoDBRecord[] {
  if (!Array.isArray(categories)) categories = [categories];
  if (!Array.isArray(shelves)) shelves = [shelves];
  const data: NeoDBRecord[] = [];
  for (const c of categories) {
    for (const s of shelves) {
      const items = neodbData[c]?.[s] || [];
      data.push(...items);
    }
  }
  // cutoff is 3 months ago
  const cutoff = new Date();
  cutoff.setMonth(new Date().getMonth() - 3);
  const c = cutoff.toISOString();
  return data
    .sort((a, b) => b.created_time.localeCompare(a.created_time))
    .slice(0, 3)
    .filter((item) => item.created_time.localeCompare(c) > 0);
}
