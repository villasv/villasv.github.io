import RSS from "rss";

export default function generateRssFeed() {
  const baseUrl = "localhost:3000";
  const feed = new RSS({
    title: "Victor Villas' Content Feed",
    site_url: baseUrl,
    feed_url: `${baseUrl}/feed`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Victor Villas`,
  });
}
