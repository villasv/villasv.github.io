import { promises as fs } from "fs";
import path from "path";

export interface PageFile {
  basePath: string;
  relativePath: string;
  fileName: string;
}

export interface Page {
  relativePath: string;
  title: string;
}

// TODO: read from next config based on extensions
const NEXT_PAGE_FILES = ["page.tsx", "page.mdx"];

export async function listPages(
  basePath: string,
  relativePath: string,
  skipLevel: number
): Promise<Page[]> {
  const children = await fs.readdir(path.join(basePath, relativePath));
  const pages = await Promise.all(
    children.map(async (fileName) => {
      const childPath = path.join(basePath, relativePath, fileName);
      return (await fs.stat(childPath)).isDirectory()
        ? listPages(basePath, path.join(relativePath, fileName), skipLevel - 1)
        : NEXT_PAGE_FILES.includes(fileName) && skipLevel <= 0
          ? [await loadPage({ basePath, relativePath, fileName })]
          : [];
    })
  );
  return pages.flat();
}

async function getPageTitle(
  filePath: string,
  content: string
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
        mdxRelativePath + ".mdx"
      );
      return getPageTitleFromMarkdown(mdxPath);
    }
  }
}

async function getPageTitleFromMarkdown(
  filePath: string
): Promise<string | undefined> {
  const markdown = await fs.readFile(filePath, { encoding: "utf-8" });
  const titles = markdown.match(/(?<=^#\s+)[^\n]*/m);
  if (titles) return titles[0].trim();
}

async function loadPage({
  basePath,
  relativePath,
  fileName,
}: PageFile): Promise<Page> {
  const filePath = path.join(basePath, relativePath, fileName);
  const content = await fs.readFile(filePath, { encoding: "utf-8" });
  const title = (await getPageTitle(filePath, content)) ?? "";
  if (!title) console.warn(`No title found for ${relativePath}`);
  return { relativePath, title };
}
