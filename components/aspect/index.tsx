import path from "path";
import { listPages } from "@/components/factory";
import styles from "./aspect.module.css";

export interface AspectProps {
  /**
   * The base relative path to search child subdirectories defining page files.
   * Will introspect app/${base}/..., defaults to __dirname of component.
   */
  base?: string;
}

export async function AspectIndex({ base }: AspectProps) {
  const subPages = await listPages("app", base ?? path.basename(__dirname), 1);
  return (
    <div className={styles.aspect}>
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
