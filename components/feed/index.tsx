import fs from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser();

function getFeedItems() {
  const filePath = path.join(process.cwd(), "public", "feed.xml");
  const parsedData = parser.parse(fs.readFileSync(filePath, "utf8"));
  const items = parsedData?.rss?.channel?.item || [];
  return Array.isArray(items) ? items : [items]; // Ensure array format
}

export function Feed() {
  const items = getFeedItems();

  return (
    <main>
      <h1>Latest Updates</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.link}>{item.title || "Untitled Post"}</a>
            <p>{new Date(item.pubDate).toLocaleString()}</p>
            <div dangerouslySetInnerHTML={{ __html: item.description }} />
          </li>
        ))}
      </ul>
    </main>
  );
}
