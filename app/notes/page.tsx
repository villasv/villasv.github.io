import path from "path";
import {
  Page,
  listPages,
  relativeToAppDir,
  relativeToProject,
} from "./introspection";
import styles from "./styles.module.css";

function groupPagesBySection(
  pages: Page[],
  sectionsBasePath: string,
): Record<string, Page[]> {
  const sectionsBaseRoute = relativeToAppDir(sectionsBasePath);
  const pagesBySection = {} as Record<string, Page[]>;
  pages.forEach((page) => {
    const subRoute = path.relative(sectionsBaseRoute, page.resourceRoute);
    const section = subRoute.split("/").reverse()[1];
    if (!pagesBySection[section]) pagesBySection[section] = [];
    pagesBySection[section].push(page);
  });
  return pagesBySection;
}

export default async function Index() {
  const relativeBase = relativeToProject(__dirname);
  const subPages = await listPages(relativeBase);
  const pagesBySection = groupPagesBySection(subPages, relativeBase);
  return (
    <div className={styles.index}>
      {Object.entries(pagesBySection).map(([section, pages], sectionIndex) => (
        <div key={sectionIndex} className={styles.section}>
          <h2>{section}</h2>
          <ol>
            {pages.map((subPage, subPageIndex) => (
              <li key={subPageIndex}>
                <a href={subPage.resourceRoute}>{subPage.title}</a>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
