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
  copyright: `Victor Villas © ${new Date().getFullYear()}`,
});

function getTitle(item) {
  const id = item.id || item.guid;
  const desc = item.description || item.summary || item.content || "";

  // Use generic title for Mastodon posts
  if (id.includes("mastodon.social")) {
    return "Comment";
  }

  // Use generic title for Pixelfed posts
  if (id.includes("pxlfd.ca")) {
    return "Media";
  }

  // Replace NeoDB titles with descriptive ones
  if (id.includes("neodb.social")) {
    const match = desc.match(/(wants to|started|finished)\s+(\w+)/i);
    if (!match) return "Comment";
    return match
      .slice(1)
      .join(" ")
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  return item.title?.trim() || "Post";
}

function getDescription(item) {
  const id = item.id || item.guid;
  const desc = item.description || item.summary || item.content || "";

  // Replace NeoDB repetitive description header
  if (id.includes("neodb.social")) {
    const title = getTitle(item);
    const rating =
      (desc.match(/🌕/g) || []).length * 2 + (desc.match(/🌗/g) || []).length;
    console.log({ desc, rating });
    return desc
      .replace(new RegExp(`<p>${title}? `, "i"), "<p>")
      .replace(new RegExp("</a> ((🌕)|(🌗)|(🌑))+"), `, ${rating} out of 10</a>`);
  }

  return desc;
}

function extractItemData(item) {
  return {
    title: getTitle(item),
    link: item.link?.href || item.link || item.id,
    date: new Date(item.updated || item.published || item.pubDate),
    description: getDescription(item),
  };
}

async function fetchFeedItems(url) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch ${url}: (${response.statusText})`);

  const rawXml = await response.text();
  const parsedData = parser.parse(rawXml);
  const items =
    parsedData?.rss?.channel?.item || // RSS format
    parsedData?.feed?.entry || // Atom format
    [];

  // if feed is single entry, items might come as object instead of array
  if (!Array.isArray(items)) return [items].map(extractItemData);
  else return items.map(extractItemData);
}

async function generateMergedRSS() {
  const allFeedItems = await Promise.all(feedUrls.map(fetchFeedItems));

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
