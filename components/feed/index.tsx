import fs from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";
import styles from "./styles.module.css";

const parser = new XMLParser();

interface FeedItem {
  pubDate: string;
}

function getFeedItems() {
  const filePath = path.join(process.cwd(), "public", "feed.xml");
  const parsedData = parser.parse(fs.readFileSync(filePath, "utf8"));
  const items = parsedData?.rss?.channel?.item || [];
  return Array.isArray(items) ? items : [items]; // Ensure array format
}

function dateFormat(item: FeedItem) {
  return new Date(item.pubDate).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function Feed() {
  const items = getFeedItems();

  return (
    <div>
      <h1>Latest Updates</h1>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <a href={item.link} className={styles.title}>
              {item.title || "Untitled Post"}
            </a>
            <p className={styles.datetime}>{dateFormat(item)}</p>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: item.description }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
