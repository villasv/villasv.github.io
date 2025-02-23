const fs = require("fs");
const path = require("path");

const username = "villasv";
const baseUrl = "https://neodb.social";

const SHELVES = ["wishlist", "progress", "complete", "dropped"];
const CATEGORIES = [
  "book",
  "movie",
  "tv",
  "music",
  "game",
  "podcast",
  "performance",
  // "fanfic",
  // "exhibition",
  // "collection",
];

async function fetchShelf(shelf, category, page = 1) {
  console.log(`Fetching ${shelf}/${category} page ${page}...`);
  const url = `${baseUrl}/api/user/${username}/shelf/${shelf}?category=${category}&page=${page}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEODB_PAT}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed fetch ${shelf}/${category}: ${res.statusText}`);
  }
  const responseBody = await res.json();
  if (responseBody["pages"] > page) {
    return [
      ...responseBody["data"],
      ...(await fetchShelf(shelf, category, page + 1)),
    ];
  } else {
    return responseBody["data"];
  }
}

async function fetchData() {
  const data = {};
  for (const category of CATEGORIES) {
    data[category] = {};
    for (const shelf of SHELVES) {
      data[category][shelf] = await fetchShelf(shelf, category);
      // sleep for 1 second to avoid throttling
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return data;
}

async function generateJSON() {
  try {
    const data = await fetchData();
    const outputPath = path.join(process.cwd(), "public", "neodb.json");
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");
    console.log(`JSON generated at ${outputPath}`);
  } catch (error) {
    console.error("Error generating NeoDB JSON:", error);
    process.exit(1);
  }
}

generateJSON();
