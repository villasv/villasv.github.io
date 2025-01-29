const RSS = require("rss");
const fs = require("fs");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");

const parser = new XMLParser();
const feedUrls = [
  "http://mastodon.social/@villasbc.rss",
  "https://pxlfd.ca/users/victor.atom",
  "https://neodb.social/@villasv/rss",
];

const feed = new RSS({
  title: "Victor Villas' Feed",
  description: "The combined feed of my online stuff.",
  feed_url: "https://victor.villas/feed.xml",
  site_url: "https://victor.villas",
  copyright: "Victor Villas © 2025",
});

function getTitle(item) {
  const title = item.title?.trim();
  // Use generic "Post" title for Mastodon posts
  if (!title) return "Post";
  // Replace NeoDB ugly titles with a generic one
  if (/^.+@neodb\.social #\d+$/.test(title)) return "Comment";

  return title;
}

function extractItemData(item) {
  return {
    title: getTitle(item),
    link: item.link?.href || item.link,
    date: new Date(item.updated || item.published || item.pubDate),
    description:
      item.content?.["#text"] ||
      item.content ||
      item.summary ||
      item.description ||
      "",
  };
}

async function fetchFeed(url) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch ${url}: (${response.statusText})`);

  const rawXml = await response.text();
  const parsedData = parser.parse(rawXml);
  const items =
    parsedData?.rss?.channel?.item || // RSS format
    parsedData?.feed?.entry || // Atom format
    [];

  return items.map(extractItemData);
}

async function generateMergedRSS() {
  const allFeedItems = await Promise.all(feedUrls.map(fetchFeed));

  allFeedItems
    .flat()
    .sort((a, b) => b.date - a.date)
    .forEach((item) => {
      feed.item({
        title: item.title,
        url: item.link,
        date: item.date,
        description: item.description,
      });
    });

  return feed.xml({ indent: true });
}

async function buildRSSFile() {
  try {
    const rss = await generateMergedRSS();
    const outputPath = path.join(process.cwd(), "public", "feed.xml");
    fs.writeFileSync(outputPath, rss, "utf8");
    console.log("RSS feed generated at:", outputPath);
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    process.exit(1);
  }
}

buildRSSFile();
