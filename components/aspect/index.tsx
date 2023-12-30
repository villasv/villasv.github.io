import path from "path";
import { listPages } from "@/components/factory";
import styles from "./aspect.module.css";

export interface AspectProps {}

export async function AspectIndex({}: AspectProps) {
  const cwd = path.basename(__dirname);
  const subPages = await listPages("app/(aspects)", cwd, 1);
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
