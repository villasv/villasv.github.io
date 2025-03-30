const fs = require("fs");
const path = require("path");
const RSS = require("rss");
const { XMLParser } = require("fast-xml-parser");
const getTranslationClient = require("@azure-rest/ai-translation-text").default;

const endpoint = "https://api.cognitive.microsofttranslator.com";
const apiKey = process.env.TEXT_TRANSLATOR_API_KEY;
const translateCedential = { key: apiKey, region: "westus" };
const translationClient = getTranslationClient(endpoint, translateCedential);

const CACHE_PATH = path.join(__dirname, "translation-cache.json");

const parser = new XMLParser();
const feed = new RSS({
  title: "Fonte de Victor Villas, em pt_BR",
  description: [
    "A fonte que combina atualizações da minha vida digital.",
    "Traduzido automaticamente para Português.",
  ].join(" "),
  feed_url: "https://victor.villas/feed_ptBR.xml",
  site_url: "https://victor.villas",
  copyright: `Victor Villas © ${new Date().getFullYear()}`,
});

let cache = {};
if (fs.existsSync(CACHE_PATH)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
  } catch (err) {
    console.error("Error reading cache, starting fresh:", err);
    cache = {};
  }
}

async function translateFeedItem(item) {
  const { id, text } = item;
  if (cache[id]) {
    console.log(`Cache hit for feed item ${id}`);
    return cache[id];
  } else {
    console.log(`Cache miss for feed item ${id}`);
  }

  const response = await translationClient.path("/translate").post({
    body: [{ text: text }],
    queryParameters: { from: "en", to: "pt-br" },
  });
  console.log(response);
  throw response.body.error

  // cache[id] = response;
  // fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  return response;
}

async function translateFeed() {
  const filePath = path.join(process.cwd(), "public", "feed.xml");
  const parsedData = parser.parse(fs.readFileSync(filePath, "utf8"));
  const feedItem = parsedData?.rss?.channel?.item || [];
  const items = Array.isArray(feedItem) ? feedItem : [feedItem];

  items.forEach(async (item) => {
    console.log(item);
    const translated = await translateFeedItem(feedItem);
    console.log("Translated text:", translated);
  });
}

translateFeed();
