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

async function fetchFeed(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${url} - ${response.statusText}`);
    }

    const rawXml = await response.text();
    const parsedData = parser.parse(rawXml);

    if (parsedData.rss) {
      // Parse RSS feed
      const items = parsedData.rss.channel.item || [];
      return items.map((item) => ({
        title: item.title,
        link: item.link,
        date: new Date(item.pubDate),
        description: item.description || "",
      }));
    } else if (parsedData.feed) {
      // Parse Atom feed
      const items = parsedData.feed.entry || [];
      return items.map((item) => ({
        title: item.title,
        link: item.link.href,
        date: new Date(item.updated || item.published),
        description: item.content || item.summary || "",
      }));
    } else {
      throw new Error("Unknown feed format");
    }
  } catch (error) {
    console.error(`Error fetching/parsing feed from ${url}:`, error);
    return [];
  }
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
