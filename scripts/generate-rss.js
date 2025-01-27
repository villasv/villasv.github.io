const RSS = require("rss");
const fs = require("fs");
const path = require("path");

const feedUrls = [
  "http://mastodon.social/@villasbc.rss",
  // Add more RSS feed URLs here
];

async function fetchFeed(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch feed: ${url} - ${response.statusText}`);
  }
  return response.text(); // Raw XML
}

async function generateMergedRSS() {
  const combinedItems = [];

  for (const url of feedUrls) {
    try {
      const rawFeed = await fetchFeed(url);
      combinedItems.push(rawFeed); // Add raw XML for now (we'll parse it later)
    } catch (err) {
      console.error(`Error fetching feed from ${url}:`, err);
    }
  }

  const feed = new RSS({
    title: "Victor Villa's News",
    description: "The combined feed of my online stuff.",
    feed_url: "https://victor.villas/feed.xml",
    site_url: "https://victor.villas",
    copyright: "Victor Villas © 2025",
  });

  // Add placeholder items (replace with parsed data later)
  combinedItems.forEach((item, index) => {
    feed.item({
      title: `Placeholder Title ${index + 1}`,
      url: `https://example.com/item${index + 1}`,
      date: new Date(),
      description: `Placeholder description for item ${index + 1}`,
    });
  });

  return feed.xml({ indent: true }); // Generate RSS XML
}

async function writeRSSFile() {
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

writeRSSFile();
