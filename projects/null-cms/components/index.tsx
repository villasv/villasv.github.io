import {
  listPages,
  relativeToProject,
} from "@/projects/null-cms/introspection";

export interface IndexProps {
  /**
   * The root folder in the file system that will serve as basis for walking
   * directories searching for publish-able pages. Typically __dirname will be
   * used to serve all pages with descendant AppDir routes in the application.
   */
  baseFilePath: string;
}

export async function Index({ baseFilePath }: IndexProps) {
  const baseRelativeToProject = relativeToProject(baseFilePath);
  console.log({ baseFilePath, baseRelativeToProject });
  const subPages = await listPages(baseRelativeToProject);
  return (
    <div>
      <ol>
        {subPages.map((subPage, index) => (
          <li key={index}>
            <a href={subPage.resourceRoute}>{subPage.title}</a>
          </li>
        ))}
      </ol>
    </div>
  );
}
