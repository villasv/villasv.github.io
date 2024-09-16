import { listPages } from "@/projects/null-cms/pages";

export interface IndexProps {
  /**
   * The base folder name used to list all sub pages in the aspect root page.
   */
  base?: string;
}

function sanitizeBasedir(base: string): string {
  // split by .next/server to support compile-time __dirname usage
  const nextServerParts = base.split(".next/server/");
  const sourcesBasedir = nextServerParts[nextServerParts.length - 1];
  return sourcesBasedir;
}

// dirname is evaluated as a parameter at invocation time by the caller module
export async function Index({ base = (() => __dirname)() }: IndexProps) {
  const sanitizedBase = sanitizeBasedir(base);
  const subPages = await listPages(sanitizedBase, ".", 1);
  return (
    <div>
      <ol>
        {subPages.map((subPage, index) => (
          <li key={index}>
            <a href={subPage.relativePath}>{subPage.title}</a>
          </li>
        ))}
      </ol>
    </div>
  );
}
