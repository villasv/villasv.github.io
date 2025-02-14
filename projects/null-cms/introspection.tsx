import { promises as fs } from "fs";
import path from "path";

const NEXT_APP_DIR = "app";
const NEXT_PAGE_FILES = ["page.tsx", "page.mdx"];

export function relativeToProject(absoluteBasePath: string): string {
  // at NexJS build-time __dirname becomes an absolute path to server
  const nextServerParts = absoluteBasePath.split(".next/server/");
  return nextServerParts[nextServerParts.length - 1];
}

export function relativeToAppDir(relativeBasePath: string): string {
  return path.relative(NEXT_APP_DIR, relativeBasePath);
}

export interface Page {
  title: string;
  sourceFilePath: string;
  resourceRoute: string;
}

/**
 * @param relativePath the base directory to recursively search for page sources
 * @param levelSkips hierarchy levels to disconsider, to skip the root itself
 */
export async function listPages(
  relativePath: string,
  levelSkips = 1,
): Promise<Page[]> {
  console.log({ relativePath });
  const children = await fs.readdir(relativePath);
  const pages = await Promise.all(
    children.map(async (childName) => {
      const childPath = path.join(relativePath, childName);
      return (await fs.stat(childPath)).isDirectory()
        ? listPages(childPath, levelSkips - 1)
        : NEXT_PAGE_FILES.includes(childName) && levelSkips <= 0
          ? [await loadPage(childPath)]
          : [];
    }),
  );
  console.log(pages);
  return pages.flat();
}

async function loadPage(sourceFilePath: string): Promise<Page> {
  const content = await fs.readFile(sourceFilePath, { encoding: "utf-8" });
  const title = (await getPageTitle(sourceFilePath, content)) ?? "";
  const resourceRoute = path.dirname(relativeToAppDir(sourceFilePath));
  if (!title) console.warn(`No title found for ${sourceFilePath}`);
  return { title, sourceFilePath, resourceRoute };
}

async function getPageTitle(
  filePath: string,
  content: string,
): Promise<string | undefined> {
  if (filePath.endsWith("mdx")) {
    return getPageTitleFromMarkdown(filePath);
  } else {
    // File is JS/TS, probably React
    // If there's an h1 title, pick that above all else
    const h1Match = content.match(/<h1>\s*(.*)\s*<\/h1>/);
    if (h1Match) return h1Match[1];

    // If it imports an MDX, let's assume it will define the title
    const mdxMatch = content.match(/from ".\/(.*).mdx"/);
    if (mdxMatch) {
      const mdxRelativePath = mdxMatch[1];
      const mdxPath = path.join(
        path.dirname(filePath),
        mdxRelativePath + ".mdx",
      );
      return getPageTitleFromMarkdown(mdxPath);
    }
  }
}

async function getPageTitleFromMarkdown(
  filePath: string,
): Promise<string | undefined> {
  const markdown = await fs.readFile(filePath, { encoding: "utf-8" });
  const titles = markdown.match(/(?<=^#\s+)[^\n]*/m);
  if (titles) return titles[0].trim();
}
