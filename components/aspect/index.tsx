import { listPages } from "@/components/factory";
import styles from "./aspect.module.css";

export interface AspectProps {
  /**
   * The base folder name used to list all sub pages in the aspect root page.
   * Will inspect all files matching app/(aspects)/{base}/.../page.*
   */
  base: string;
}

export async function AspectIndex({ base }: AspectProps) {
  const subPages = await listPages("app/(aspects)", base, 1);
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
