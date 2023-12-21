import { listPages } from "@/components/factory";
import styles from "./aspect.module.css";

export interface AspectProps {
  /**
   * will introspect app/${base}/.../page.tsx
   * ${domain}/${base}/...
   */
  base: string;
}

export async function AspectIndex({ base }: AspectProps) {
  const subPages = await listPages("app", base, 1);
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
